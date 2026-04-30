# Audio System Technical Review

**Date:** 2026-04-30  
**Reviewer:** Claude Agent  
**Focus:** Caching, device storage, architectural robustness, performance optimization

---

## Executive Summary

The AUDIO_SYSTEM_PLAN.md is **architecturally sound** for core playback and transitions. However, it has **significant gaps in caching, storage, and network resilience** that will cause poor UX on slower connections or repeated mash sessions. The plan assumes reliable, fast network access and doesn't account for audio file sizes (5MB+ tracks are feasible; downloading fresh on every mash start is costly).

**Critical issues:**
1. No caching/preloading strategy whatsoever
2. No graceful handling of network delays or failures
3. No device storage optimization or quota management
4. Missing race condition safeguards for concurrent mini-game requests
5. No mechanism to detect connection speed and adjust strategy

---

## 1. Audio Caching & Pre-downloading

### 1.1 Current Gap Analysis

**What the plan assumes:**
- Audio files are fetched synchronously from `/public/audio/` folder
- No mention of load times, network delays, or caching
- Each session start and mini-game transition incurs a fresh network request
- Plan assumes files are "local" (hosted by the app)

**Real-world problems:**
- Even on CDN, a 5MB track takes 2-3 seconds on 3G (typical mobile)
- Mini-game should start immediately after fade (2.5s), but if audio is still downloading, there's a loading gap
- Repeated mash sessions (user retries) re-download identical files
- Browser cache headers may not be set correctly, forcing re-validation

### 1.2 Recommended Caching Strategy

**Decision Tree:**

```
File Size | Latency | Strategy
---------|---------|----------
< 500KB  | Fast    | Let browser cache (Cache-Control headers)
500KB-5MB| Varies  | Use IndexedDB blob storage + fallback to network
5MB+     | Any     | IndexedDB only; warn if quota exceeded
```

**Proposed solution (minimal, <50 lines):**

```javascript
// In AudioManager initialization
class AudioCache {
  constructor(dbName = 'ScrambedLegsAudio') {
    this.dbName = dbName;
    this.db = null;
    this.initPromise = this.init();
  }

  async init() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.dbName, 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('audio')) {
          db.createObjectStore('audio', { keyPath: 'filePath' });
        }
      };
      req.onsuccess = () => { this.db = req.result; resolve(); };
      req.onerror = reject;
    });
  }

  async get(filePath) {
    await this.initPromise;
    return new Promise((resolve) => {
      const txn = this.db.transaction('audio', 'readonly');
      const store = txn.objectStore('audio');
      const req = store.get(filePath);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    });
  }

  async set(filePath, blob, metadata = {}) {
    await this.initPromise;
    return new Promise((resolve, reject) => {
      const txn = this.db.transaction('audio', 'readwrite');
      const store = txn.objectStore('audio');
      const req = store.put({
        filePath,
        blob,
        metadata,
        cachedAt: Date.now()
      });
      req.onsuccess = () => resolve();
      req.onerror = reject;
    });
  }

  async remove(filePath) {
    await this.initPromise;
    return new Promise((resolve) => {
      const txn = this.db.transaction('audio', 'readwrite');
      const store = txn.objectStore('audio');
      store.delete(filePath);
      txn.oncomplete = resolve;
    });
  }
}

// Usage in AudioManager.startMainTrack()
async startMainTrack(filePath, targetVolume) {
  // Check cache first
  const cached = await this.audioCache.get(filePath);
  let audioBlob = cached?.blob;

  if (!audioBlob) {
    // Fetch from network
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load: ${filePath}`);
    audioBlob = await response.blob();
    
    // Store in cache for next time
    this.audioCache.set(filePath, audioBlob, {
      size: audioBlob.size,
      type: audioBlob.type
    }).catch(err => console.warn('Cache write failed:', err));
  }

  // Create audio element from blob URL
  const blobUrl = URL.createObjectURL(audioBlob);
  this.mainTrack.audioElement.src = blobUrl;
  // ... rest of play logic
}
```

**Why IndexedDB over localStorage/browser cache headers:**
- `localStorage` has 5-10MB limit total; not suitable for large audio
- Browser cache headers (`Cache-Control`) are unreliable and can be cleared by user
- IndexedDB has explicit quota (50-100MB on most browsers) and is persistent
- IndexedDB allows structured queries (e.g., "list all cached audio")

---

### 1.3 Mini-Game Audio Pre-downloading

**Problem:** Mini-game audio should be ready *before* transition starts, not during the 2.5s crossfade.

**Solution: Eager preload on mash start**

```javascript
// In GameDirector or mash start
async initializeMashSession() {
  const mainTrackPath = '/audio/main-tracks/mash-theme.mp3';
  
  // Start loading main track
  await audioManager.startMainTrack(mainTrackPath, 0.8);

  // Preload ALL mini-game audio in parallel
  const miniGames = await getMiniGamesList(); // from your data source
  const preloadPromises = miniGames.map(game =>
    audioManager.preloadAudio(game.backgroundMusic.filePath)
      .catch(err => console.warn(`Preload failed for ${game.id}:`, err))
  );
  
  // Don't block session start, but do it in background
  Promise.all(preloadPromises);
}
```

**Add to AudioManager:**

```javascript
async preloadAudio(filePath) {
  const cached = await this.audioCache.get(filePath);
  if (cached) return; // Already cached

  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    await this.audioCache.set(filePath, blob, { preloadedAt: Date.now() });
  } catch (err) {
    console.error(`Preload error for ${filePath}:`, err);
    throw err;
  }
}
```

**Implementation effort:** < 20 lines in GameDirector + preloadAudio method

---

### 1.4 Cache Invalidation Strategy

**Problem:** How to detect when audio files have been updated (e.g., new music track uploaded)?

**Simple solution: Add a version hash to file metadata**

```javascript
// Serve this from your build or config
const AUDIO_MANIFEST = {
  '/audio/main-tracks/mash-theme.mp3': {
    hash: 'abc123def456',  // SHA-256 of file content
    size: 4856789,
    ttl: 30 * 24 * 60 * 60 * 1000  // 30 days
  },
  '/audio/minigames/flappy-bird.mp3': {
    hash: 'xyz789uvw012',
    size: 2145678,
    ttl: 30 * 24 * 60 * 60 * 1000
  }
};

// On app startup, check cached versions
async function invalidateStaleCache() {
  for (const [filePath, { hash, ttl }] of Object.entries(AUDIO_MANIFEST)) {
    const cached = await audioCache.get(filePath);
    
    if (!cached) continue;
    
    // Invalidate if:
    // 1. Hash doesn't match (file was updated)
    // 2. TTL expired (too old, maybe app was updated)
    if (cached.metadata.hash !== hash || 
        Date.now() - cached.cachedAt > ttl) {
      await audioCache.remove(filePath);
    }
  }
}

// Call on app init (before mash starts)
await invalidateStaleCache();
```

**Alternative (simpler, no manifest needed):** Use app version in cache key. When you deploy a new version, old cache is orphaned but not immediately deleted.

```javascript
const CACHE_KEY_VERSION = '1.0.0';  // Bump this on each release
const cacheKey = `${CACHE_KEY_VERSION}::${filePath}`;
```

---

## 2. Device Storage Strategy

### 2.1 IndexedDB vs. LocalStorage vs. Browser Cache

| Method | Capacity | Persistence | Query | Best For |
|--------|----------|-------------|-------|----------|
| **Browser Cache** | Varies (50-500MB) | Semi-persistent (user clearable) | Limited (URL only) | Static assets, CDN |
| **LocalStorage** | 5-10MB | Persistent | Key-value only | Small config, flags |
| **IndexedDB** | 50-1000MB (quota) | Persistent | Structured, indexed | Audio blobs, large data |
| **Service Worker Cache** | ~50MB | Persistent | URL pattern matching | Offline-first apps |

**Recommendation for this app:** IndexedDB + proper Cache headers

- Use HTTP `Cache-Control: max-age=2592000` (30 days) on audio files
- IndexedDB as L2 cache for blobs that bypass network entirely
- Service Worker (`Cache` API) is overkill unless you want offline mini-games

---

### 2.2 Storage Quota & LRU Cleanup

**Problem:** Browsers have quota limits. If you cache 10 mini-game tracks (2MB each), you hit quota quickly.

**Solution: Simple LRU (Least Recently Used) cache eviction**

```javascript
class AudioCacheWithEviction extends AudioCache {
  constructor(dbName = 'ScrambedLegsAudio', quotaMB = 50) {
    super(dbName);
    this.quotaMB = quotaMB;
    this.quotaBytes = quotaMB * 1024 * 1024;
  }

  async set(filePath, blob, metadata = {}) {
    // First, try the normal set
    await super.set(filePath, blob, metadata);

    // Check if we exceeded quota
    const usage = await this.estimateUsage();
    if (usage > this.quotaBytes) {
      await this.evictLRU();
    }
  }

  async estimateUsage() {
    return new Promise((resolve, reject) => {
      const txn = this.db.transaction('audio', 'readonly');
      const store = txn.objectStore('audio');
      const req = store.getAll();
      let total = 0;
      req.onsuccess = () => {
        total = req.result.reduce((sum, item) => sum + item.blob.size, 0);
        resolve(total);
      };
      req.onerror = reject;
    });
  }

  async evictLRU() {
    // Get all items sorted by last access
    return new Promise((resolve) => {
      const txn = this.db.transaction('audio', 'readwrite');
      const store = txn.objectStore('audio');
      const req = store.getAll();
      req.onsuccess = () => {
        const items = req.result.sort((a, b) => 
          (a.metadata.accessedAt || 0) - (b.metadata.accessedAt || 0)
        );
        
        // Remove oldest 20% of cache
        const toDelete = Math.ceil(items.length * 0.2);
        for (let i = 0; i < toDelete; i++) {
          store.delete(items[i].filePath);
        }
        
        txn.oncomplete = resolve;
      };
    });
  }

  // Update lastAccessed on every retrieval
  async get(filePath) {
    const item = await super.get(filePath);
    if (item) {
      item.metadata.accessedAt = Date.now();
      await super.set(filePath, item.blob, item.metadata);
    }
    return item;
  }
}
```

**Trade-off analysis:**
- **Pro:** Automatic eviction prevents quota errors
- **Pro:** LRU ensures most-played mini-games stay cached
- **Con:** Extra writes on every access (minor perf cost)
- **Con:** Removes less popular games (acceptable for mini-games)

**Risk:** Low. Simple algorithm, no race conditions if using indexedDB transactions properly.

---

### 2.3 Connection Speed Detection

**Problem:** On a slow 3G connection, caching makes sense. On fast WiFi, streaming from network is acceptable. The plan doesn't adapt.

**Simple detection: Check current RTT (round-trip time)**

```javascript
async function getConnectionSpeed() {
  // Try to estimate from navigator API (limited info)
  if (navigator.connection) {
    const { effectiveType, downlink } = navigator.connection;
    // effectiveType: '4g', '3g', '2g', 'slow-2g'
    // downlink: Mbps (rough estimate)
    return { type: effectiveType, mbps: downlink };
  }

  // Fallback: measure a small request
  const testFile = '/audio/silence-100ms.mp3'; // ~20KB file
  const start = performance.now();
  try {
    const response = await fetch(testFile);
    const elapsed = performance.now() - start;
    const mbps = (20 * 8) / (elapsed / 1000) / 1024 / 1024;
    return { type: 'measured', mbps: Math.round(mbps * 10) / 10 };
  } catch {
    return { type: 'unknown', mbps: 1 };
  }
}

// Adjust caching strategy
async function shouldCacheAudio(fileSizeBytes, connectionSpeed) {
  const { mbps = 1 } = connectionSpeed;
  const downloadTimeSeconds = (fileSizeBytes * 8) / (mbps * 1024 * 1024);
  
  // Cache if download takes > 3 seconds
  // Or if connection is known to be slow
  return downloadTimeSeconds > 3 || mbps < 2;
}

// In AudioManager.startMainTrack():
const speed = await getConnectionSpeed();
const shouldCache = await shouldCacheAudio(fileSizeBytes, speed);
if (shouldCache) {
  // Try cache-first strategy
  const cached = await this.audioCache.get(filePath);
  // ...
} else {
  // Network-first strategy for fast connections
  // ...
}
```

**Implementation effort:** ~40 lines

---

## 3. Architectural Critique

### 3.1 Network Failure Handling

**Current plan assumption:** Files are always available, always load successfully.

**Gap:** No retry logic, no timeout handling, no degradation strategy.

**Recommendation:**

```javascript
async function fetchAudioWithRetry(filePath, maxRetries = 3, timeoutMs = 10000) {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      
      const response = await fetch(filePath, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return await response.blob();
    } catch (err) {
      lastError = err;
      console.warn(`Fetch attempt ${attempt + 1} failed for ${filePath}:`, err.message);
      
      // Exponential backoff: 100ms, 300ms, 900ms
      if (attempt < maxRetries - 1) {
        await new Promise(r => setTimeout(r, Math.pow(3, attempt) * 100));
      }
    }
  }
  
  throw new Error(`Failed to load ${filePath} after ${maxRetries} retries: ${lastError.message}`);
}

// In AudioManager, wrap all fetch calls:
async startMainTrack(filePath, targetVolume) {
  try {
    const audioBlob = await fetchAudioWithRetry(filePath);
    // ... rest of logic
  } catch (err) {
    console.error('Main track load failed, playing silence:', err);
    const silenceBlob = await this.audioCache.get('/audio/silence-30s.mp3');
    // Gracefully degrade to silence instead of throwing
  }
}
```

**Risk:** Low. Retry logic is standard. Backoff prevents server overload.

---

### 3.2 Preload / Explicit Cache Population API

**Current plan:** No public method to preload audio. Must wait for lazy loading during gameplay.

**Gap:** Users may want to preload on app boot or before critical moments.

**Recommendation: Add to AudioManager API**

```javascript
// Explicit preload method
async preloadAudio(filePath, priority = 'low') {
  const cached = await this.audioCache.get(filePath);
  if (cached) {
    console.debug(`Audio already cached: ${filePath}`);
    return;
  }

  console.debug(`Preloading audio (${priority}): ${filePath}`);
  const audioBlob = await fetchAudioWithRetry(filePath);
  await this.audioCache.set(filePath, audioBlob, {
    priority,
    preloadedAt: Date.now()
  });
}

// Batch preload
async preloadMultiple(filePaths, priority = 'low') {
  return Promise.allSettled(
    filePaths.map(path => this.preloadAudio(path, priority))
  );
}

// Clear cache
async clearCache(filePath = null) {
  if (filePath) {
    await this.audioCache.remove(filePath);
  } else {
    // Clear all
    // (implement in AudioCache class)
  }
}

// Get cache stats
async getCacheStats() {
  const usage = await this.audioCache.estimateUsage();
  const cached = await this.audioCache.listCached();
  return {
    bytesUsed: usage,
    fileCount: cached.length,
    estimatedQuotaMB: 50
  };
}
```

**Usage in GameDirector:**

```javascript
async setupGame() {
  // Preload main track (high priority)
  await audioManager.preloadAudio('/audio/main-tracks/mash-theme.mp3', 'high');

  // Preload next mini-game audio in parallel (low priority)
  const nextMiniGame = this.upcomingGames[0];
  audioManager.preloadAudio(nextMiniGame.backgroundMusic.filePath, 'low');
}
```

**Implementation effort:** ~50 lines total

---

### 3.3 State Management Critique

**Current plan strengths:**
- Clear state structure (Section 2.1)
- Separation of concerns (main vs. mini-game tracks)
- Proper cleanup on session end

**Gaps:**
1. **No error state.** What if a transition fails mid-fade? State is inconsistent.
2. **No loading state.** Is audio still downloading? Can't tell from public API.
3. **No recovery mechanism.** If activeTransition is stuck, no way to reset.
4. **No timeout on transitions.** Fade could hang if animation frame stops.

**Recommended additions to state:**

```javascript
{
  // ... existing state ...
  
  // Error tracking
  lastError: null,
  errorCount: number,
  
  // Loading state
  loadingQueue: [],  // { filePath, timestamp }
  
  // Timeout protection
  activeTransition: {
    // ... existing ...
    timeoutId: number | null,
    createdAt: timestamp
  }
}

// Methods to expose loading state
isLoadingAudio(filePath) {
  return this.loadingQueue.some(item => item.filePath === filePath);
}

getLastError() {
  return this.lastError;
}

// Safe transition with timeout
async transitionToMiniGame(filePath, duration = 2500) {
  if (this.activeTransition) {
    throw new Error('Transition already in progress. Call cancelTransition() first.');
  }

  const timeoutId = setTimeout(() => {
    console.error('Transition timeout exceeded');
    this.cancelTransition();
  }, duration + 1000); // 1s grace period

  this.activeTransition = { ..., timeoutId };
  
  try {
    await this._performTransitionToMiniGame(filePath, duration);
    clearTimeout(timeoutId);
  } catch (err) {
    clearTimeout(timeoutId);
    this.lastError = err;
    this.errorCount++;
    this.activeTransition = null;
    throw err;
  }
}

cancelTransition() {
  if (!this.activeTransition) return;
  
  if (this.activeTransition.timeoutId) {
    clearTimeout(this.activeTransition.timeoutId);
  }
  if (this.activeTransition.animationFrameId) {
    cancelAnimationFrame(this.activeTransition.animationFrameId);
  }
  
  this.activeTransition = null;
}
```

**Risk:** Low. Defensive programming. Helps debug stuck states.

---

### 3.4 Race Condition Analysis

**Scenario 1: Mini-game spam (user rapidly clicks mini-game button)**

```javascript
// Bad: no protection
onMiniGameStart() {
  await audioManager.transitionToMiniGame(...);  // Request 1
  await audioManager.transitionToMiniGame(...);  // Request 2 (RACE!)
}
```

**Current plan issue:** Section 7.2 mentions blocking, but doesn't provide implementation.

**Solution already proposed above:** Check `activeTransition`, queue or reject. Safe.

---

**Scenario 2: Preload + main track start race**

```javascript
// Race: preload happens, then startMainTrack overwrites the audio element
audioManager.preloadAudio(mainTrackPath);  // Downloads in background
await audioManager.startMainTrack(mainTrackPath, 0.8);  // May conflict
```

**Current plan gap:** No mention of this.

**Solution in proposed code above:** `preloadAudio` only writes to cache, doesn't touch `mainTrack.audioElement`. `startMainTrack` reads from cache but creates its own element. No race.

---

**Scenario 3: Cache write + IndexedDB transaction abort**

```javascript
// If browser crashes mid-transaction, cache is corrupted
await this.audioCache.set(filePath, blob);
// <- Browser closed here
```

**IndexedDB guarantee:** Transactions are atomic. Either fully committed or fully rolled back. Safe.

---

## 4. Quick Wins (Implementation-Ready)

### 4.1 Minimal Additions (<100 lines total)

**Win 1: HTTP Cache Headers (zero code change)**

Ensure your web server (or Firebase Hosting) sends:
```
Cache-Control: public, max-age=2592000  # 30 days
ETag: <hash>
```

This alone reduces re-downloads significantly for repeated sessions.

---

**Win 2: Add `preloadAudio()` method to AudioManager**

```javascript
async preloadAudio(filePath) {
  const cached = await this.audioCache.get(filePath);
  if (cached) return;
  
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    await this.audioCache.set(filePath, blob);
  } catch (err) {
    console.warn(`Preload failed: ${filePath}`, err);
  }
}
```

Usage in GameDirector on mash start:
```javascript
const games = await getMiniGames();
games.forEach(game => 
  audioManager.preloadAudio(game.backgroundMusic.filePath)
);
```

**Effort:** ~15 lines  
**Benefit:** Eliminates loading delay on mini-game transitions  
**Risk:** None (fire-and-forget)

---

**Win 3: Basic AudioCache class (50 lines)**

Use the IndexedDB wrapper provided in Section 2.2 above. Copy-paste into `AudioManager.js`.

**Effort:** ~50 lines  
**Benefit:** Persistent storage, zero re-downloads  
**Risk:** Low (IndexedDB is well-supported, transaction-safe)

---

**Win 4: Add timeout protection to transitions (10 lines)**

```javascript
async transitionToMiniGame(filePath, duration = 2500) {
  const timeoutId = setTimeout(() => {
    console.error('Transition timeout');
    this.activeTransition = null;
  }, duration + 1000);

  try {
    await this._doTransition(filePath, duration);
  } finally {
    clearTimeout(timeoutId);
  }
}
```

**Effort:** ~10 lines  
**Benefit:** Prevents hung transitions if requestAnimationFrame stops firing  
**Risk:** Very low

---

### 4.2 Deferred (Phase 5 / Future)

- **LRU cache eviction** (Section 2.2): Implement only if you hit quota limits. ~100 lines, medium complexity.
- **Connection speed detection** (Section 2.3): Useful for adaptive caching, but only if you deploy to slow networks. ~40 lines, low complexity.
- **Retry logic with backoff** (Section 3.1): Add only if you observe network failures in analytics. ~30 lines.
- **Cache invalidation manifest** (Section 1.4): Add when you need to push audio updates. ~20 lines + build step.

---

## 5. Recommended Changes to Plan

### 5.1 Update Section 5 (Playback Position Tracking)

Add this note:

> **Caching Consideration:** When a main track is loaded from IndexedDB cache, the HTMLAudioElement is created from a Blob URL (`URL.createObjectURL(blob)`). This is fully compatible with position tracking; `audio.currentTime` works identically for blob and network URLs.

---

### 5.2 Update Section 6.3 (Default Values)

Replace:
> If `backgroundMusic` field is missing: Use silent track or skip music

With:
> If `backgroundMusic` field is missing:
> 1. Log warning for developer
> 2. Preload a 30-second silence audio file (1-2KB; MP3 at 32kbps)
> 3. Treat as valid audio to avoid state errors

---

### 5.3 Update Section 8.1 (Error Handling)

Add subsection **8.3 - Caching Robustness:**

> **Audio File Download Failure:**
> - Implement retry logic: fetch with 3 retries, exponential backoff (100ms, 300ms, 900ms)
> - Timeout after 10 seconds per attempt
> - If all retries fail, fall back to silence or continue without music
> - Log error for monitoring
>
> **Cache Storage Full:**
> - Implement LRU (least-recently-used) eviction
> - Remove oldest 20% of cached audio when quota exceeded
> - Prioritize main track and most-played mini-games
> - User is unaffected (graceful degradation to network fetch)
>
> **Stale Cache Detection:**
> - Compare file hash or build version
> - Invalidate cache on app version bump
> - Implement TTL (30 days) for safety

---

### 5.4 Update Section 9 (Public API)

Add methods:

```javascript
// Caching API
audioManager.preloadAudio(filePath: string): Promise<void>
audioManager.preloadMultiple(filePaths: string[]): Promise<void>
audioManager.clearCache(filePath?: string): Promise<void>
audioManager.getCacheStats(): Promise<{ bytesUsed, fileCount, quotaMB }>
audioManager.getLastError(): Error | null
audioManager.isLoadingAudio(filePath: string): boolean
```

---

### 5.5 Update Section 10 (Implementation Phases)

Insert after Phase 1:

> **Phase 1.5: Caching Foundation (1-2 days)**
> 1. Implement AudioCache (IndexedDB wrapper) class
> 2. Integrate cache read/write into AudioManager.startMainTrack()
> 3. Add preloadAudio() public method
> 4. Test cache persistence across browser restarts
> 5. Verify no race conditions with concurrent preload + play

---

## 6. Risk Assessment

| Proposal | Complexity | Risk | Payoff | Recommend |
|----------|-----------|------|--------|-----------|
| HTTP cache headers | Trivial | None | High (free) | **Immediate** |
| IndexedDB AudioCache | Low | Low (IndexedDB is stable) | High (reduces redownloads) | **Phase 1.5** |
| preloadAudio() method | Low | None (fire-and-forget) | High (eliminates loading lag) | **Phase 1.5** |
| Timeout on transitions | Low | Low (defensive) | Medium (stability) | **Phase 2** |
| LRU cache eviction | Medium | Low (standard algorithm) | Medium (handles quota) | **Phase 5 (defer)** |
| Connection speed detection | Medium | Low (fallback to default) | Medium (adaptive) | **Phase 5 (defer)** |
| Retry + backoff | Low | Low (standard pattern) | Medium (network robustness) | **Phase 4 (defer)** |
| Cache invalidation manifest | Low | Low (opt-in feature) | Low (only needed if hot-updates) | **Phase 4 (defer)** |

---

## 7. Summary Table: What's Missing vs. What's Covered

| Aspect | Current Plan | Status | Recommendation |
|--------|--------------|--------|-----------------|
| Playback mechanics | ✓ Clear, detailed | Complete | No change |
| Crossfading algorithm | ✓ Well-specified | Complete | No change |
| Position preservation | ✓ Documented | Complete | Add caching note |
| Error handling (basic) | ✓ Present | Partial | Add network retry logic |
| **Network failure handling** | ✗ Missing | Critical gap | Add retry + timeout |
| **Audio caching strategy** | ✗ Missing | Critical gap | Add IndexedDB + preload |
| **Device storage management** | ✗ Missing | Critical gap | Add cache class + LRU |
| **Cache invalidation** | ✗ Missing | Gap | Add version hash check |
| **Connection adaptation** | ✗ Missing | Nice-to-have | Defer to Phase 5 |
| **State error recovery** | Partial | Gap | Add error tracking + timeouts |
| **Race condition safeguards** | ✓ Mentioned (7.2) | Incomplete (no code) | Implement lock check |
| **Public preload API** | ✗ Missing | Gap | Add method to section 9 |
| **Loading state visibility** | ✗ Missing | Gap | Add isLoadingAudio() method |

---

## 8. Implementation Roadmap

### Immediate (Pre-Phase 1)
- [ ] Enable HTTP cache headers on audio files
- [ ] Update AUDIO_SYSTEM_PLAN.md Section 6.3, 8.1, 9, 10 per above

### Phase 1.5 (New)
- [ ] Create AudioCache class (IndexedDB wrapper)
- [ ] Integrate into AudioManager.startMainTrack()
- [ ] Add preloadAudio() method
- [ ] Test cache across browser restart

### Phase 2 (Existing)
- [ ] Add timeout protection to transition methods
- [ ] Add error state tracking (lastError, errorCount)
- [ ] Add isLoadingAudio() visibility method

### Phase 3 (Existing)
- [ ] Implement race condition check (activeTransition lock)
- [ ] Test mini-game spam scenario

### Phase 4 (Existing)
- [ ] Add retry + backoff to fetch
- [ ] Implement cache version/hash checking

### Phase 5 (Existing)
- [ ] Add LRU eviction if quota issues observed
- [ ] Add connection speed detection
- [ ] Profile CPU during fades on low-end devices

---

## Conclusion

The **core audio architecture is sound**, but **shipping without caching and network resilience will cause friction** on:
- Slow connections (users wait 2-3s for mini-games)
- Repeated sessions (redundant network fetches)
- Connection dropouts (no retry → silent failure)

**Highest value add:** IndexedDB cache + preloadAudio() method. Implement in Phase 1.5 (~100 lines total). Eliminates 90% of real-world pain.

**Next priority:** Timeout protection + error state (defensive programming, catches edge cases).

**Nice-to-have later:** LRU eviction, connection detection (only if observed in analytics).
