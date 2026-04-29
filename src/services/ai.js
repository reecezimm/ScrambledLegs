/**
 * AI service with shared RTDB-backed response cache.
 *
 * When `runPrompt` is called with a `cacheKey` + `ttlMs`, the result is
 * persisted to RTDB at `aiCache/{sanitizedKey}` so every visitor sees the
 * same answer until the TTL elapses. The first user past expiry regenerates.
 *
 * Schema for `aiCache/{sanitizedKey}`:
 *   { value: string, prompt?: string, generatedAt: number (server ts),
 *     ttlMs: number, lock?: boolean, lockedAt?: number }
 *
 * TTL is checked at READ time only — there is no auto-eviction.
 *
 * Example:
 *   const text = await runPrompt('summarize today vibe',
 *     { cacheKey: 'home_vibe', ttlMs: 1800000 });
 */

import { app, database } from './firebase';
import { ref, get, set, remove, serverTimestamp } from 'firebase/database';

const DEFAULT_MODEL = 'gemini-2.5-flash';
const LOCK_TTL_MS = 30000;
const POLL_INTERVAL_MS = 1000;
const POLL_MAX_MS = 5000;

let _modelCache = new Map();
let _aiInstance = null;

async function _getModel(modelName) {
  const { getAI, getGenerativeModel, GoogleAIBackend } = await import('firebase/ai');
  if (!_aiInstance) {
    _aiInstance = getAI(app, { backend: new GoogleAIBackend() });
  }
  if (!_modelCache.has(modelName)) {
    _modelCache.set(modelName, getGenerativeModel(_aiInstance, { model: modelName }));
  }
  return _modelCache.get(modelName);
}

function _composePrompt(prompt, data) {
  if (data === undefined || data === null) return prompt;
  const payload = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  return `${prompt}\n\n${payload}`;
}

function _buildRequest(prompt, options = {}) {
  const { data, system, maxTokens, temperature } = options;
  const userText = _composePrompt(prompt, data);
  const req = {
    contents: [{ role: 'user', parts: [{ text: userText }] }],
  };
  if (system) {
    req.systemInstruction = { role: 'system', parts: [{ text: system }] };
  }
  const generationConfig = {};
  if (typeof maxTokens === 'number') generationConfig.maxOutputTokens = maxTokens;
  if (typeof temperature === 'number') generationConfig.temperature = temperature;
  if (Object.keys(generationConfig).length) req.generationConfig = generationConfig;
  return req;
}

function _sanitizeCacheKey(key) {
  if (typeof key !== 'string' || !key) {
    throw new Error('cacheKey must be a non-empty string');
  }
  // RTDB path segments cannot contain . # $ [ ] /
  return key.replace(/[.#$[\]/]/g, '_').slice(0, 200);
}

function _cacheRef(sanitizedKey) {
  return ref(database, `aiCache/${sanitizedKey}`);
}

function _isFresh(entry, ttlMs) {
  if (!entry || typeof entry.generatedAt !== 'number') return false;
  return Date.now() - entry.generatedAt < ttlMs;
}

function _isLocked(entry) {
  if (!entry || !entry.lock) return false;
  if (typeof entry.lockedAt !== 'number') return false;
  return Date.now() - entry.lockedAt < LOCK_TTL_MS;
}

async function _readCache(sanitizedKey) {
  const snap = await get(_cacheRef(sanitizedKey));
  return snap.exists() ? snap.val() : null;
}

async function _generate(prompt, options) {
  const model = await _getModel(options.model || DEFAULT_MODEL);
  const request = _buildRequest(prompt, options);
  const result = await model.generateContent(request);
  return result.response.text();
}

async function _runCached(prompt, options) {
  const { cacheKey, ttlMs, forceRefresh } = options;
  if (typeof ttlMs !== 'number' || ttlMs <= 0) {
    throw new Error('ttlMs (positive number) is required when cacheKey is set');
  }
  const sanitized = _sanitizeCacheKey(cacheKey);
  const cRef = _cacheRef(sanitized);

  // 1. Read existing
  let entry = await _readCache(sanitized);
  if (!forceRefresh && _isFresh(entry, ttlMs) && typeof entry.value === 'string') {
    return entry.value;
  }

  // 2. If another tab is currently generating, wait briefly for the result.
  if (!forceRefresh && _isLocked(entry)) {
    const start = Date.now();
    while (Date.now() - start < POLL_MAX_MS) {
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
      const polled = await _readCache(sanitized);
      if (polled && _isFresh(polled, ttlMs) && typeof polled.value === 'string' && !polled.lock) {
        return polled.value;
      }
      if (!_isLocked(polled)) {
        // Lock expired without a write — fall through and generate ourselves.
        entry = polled;
        break;
      }
    }
  }

  // 3. Set lock and generate.
  try {
    await set(cRef, {
      ...(entry || {}),
      lock: true,
      lockedAt: Date.now(),
    });
  } catch (_) {
    // Lock write failed (e.g. unauthenticated) — proceed without locking.
  }

  const value = await _generate(prompt, options);

  // 4. Persist result.
  await set(cRef, {
    value,
    prompt: typeof prompt === 'string' ? prompt.slice(0, 2000) : '',
    generatedAt: serverTimestamp(),
    ttlMs,
  });

  return value;
}

export async function runPrompt(prompt, options = {}) {
  if (options.cacheKey) {
    return _runCached(prompt, options);
  }
  return _generate(prompt, options);
}

export async function streamPrompt(prompt, onChunk, options = {}) {
  const model = await _getModel(options.model || DEFAULT_MODEL);
  const request = _buildRequest(prompt, options);
  const result = await model.generateContentStream(request);
  let full = '';
  for await (const chunk of result.stream) {
    const piece = chunk.text();
    full += piece;
    if (typeof onChunk === 'function') onChunk(piece);
  }
  return full;
}

export async function getCachedPrompt(cacheKey) {
  if (!cacheKey) return null;
  const sanitized = _sanitizeCacheKey(cacheKey);
  const entry = await _readCache(sanitized);
  if (entry && typeof entry.value === 'string') return entry.value;
  return null;
}

export async function clearCache(cacheKey) {
  if (cacheKey) {
    const sanitized = _sanitizeCacheKey(cacheKey);
    await remove(_cacheRef(sanitized));
    return;
  }
  await remove(ref(database, 'aiCache'));
}

// Exposed in production too — the AI calls are auth-bound via Firebase App
// config (apiKey is public anyway), and console access lets admins debug.
if (typeof window !== 'undefined') {
  window.__sl_ai = { runPrompt, streamPrompt, getCachedPrompt, clearCache };
}

export { app };
