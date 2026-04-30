# Documentation Maintenance Process

This document explains how to maintain LOGS.md, TODO.md, and README.md so that knowledge persists across AI instances.

**This is important.** Following this process ensures the next person (or AI) knows exactly what's been done and what needs to be done.

---

## 🎯 The Goal

After every work session:
- The next person knows what was done and why
- Known issues and workarounds are documented
- Task status is up-to-date
- No redundant work is done

This happens **only if you update the docs**. If you don't, the next person starts blind.

---

## 📝 After Every Work Session: Update These Files

### 1. Update LOGS.md (Required)

**When**: After every work session, before you finish

**What to do**:
1. Open `LOGS.md`
2. Add a new entry at the top (above the template)
3. Use this format:

```markdown
## YYYY-MM-DD • Brief Description

### Tasks Addressed
- CRITICAL-001: Task name
- HIGH-002: Another task name

### What Was Requested
- List what the user asked for
- Bullet points for clarity

### What Was Done
- Specific implementation details
- File paths and line numbers
- What changed and why

### Issues Found
- Any bugs discovered
- Any edge cases or gotchas
- Known issues that remain (if any)

### Build Status
✅ Compiled successfully (zero errors, zero warnings)

### Testing Done
- What was tested manually
- Console log checks
- Any verification steps you took

### Next Steps
- What should the next person focus on?
- Any recommendations for what to work on next?
```

**Example**:

```markdown
## 2026-04-30 • Audio System Refactor & Volume Synchronization

### What Was Requested
- Fix audio bugs (main track silent after mini-games)
- Implement universal volume control
- Synchronize crossfade durations

### What Was Done
- Added UNIVERSAL_VOLUME constant to AudioManager.js:16
- Fixed volume sync bug by syncing mainTrack.volume after fades
- Updated crossfade durations: store.js:165 (250ms → 1000ms), store.js:180 (2500ms → 1000ms)
- Enhanced _updateTrackVolumes() with logging
- Called _updateTrackVolumes() at 3 key points in transitions

### Issues Found
- None currently. Audio system is stable.

### Build Status
✅ Compiled successfully (zero errors, zero warnings)

### Testing Done
- Verified console logs show correct volume application
- Confirmed all fade durations are 1000ms
- Checked that mainTrack.volume syncs correctly

### Next Steps
- Test audio in production for any remaining snaps/clicks
- Monitor for regressions in long gameplay sessions
```

**Why this matters**: The next person (or a different AI instance) will read this and instantly know:
- What was completed
- If there are known issues
- What to test
- What to work on next

**If you skip this**: The next person repeats your work or misses bugs.

---

### 2. Update TODO.md (Required)

**When**: After every work session, or when task status changes

**What to do**:

1. Find each task you worked on
2. Update its status emoji:
   - 📝 = Pending (not started)
   - 🚀 = In Progress (currently working)
   - ✅ = Completed
   - 🔄 = Blocked (waiting for something)

3. Add a date or comment if the status changed

4. Update the status summary table at the bottom

**Example**: If you just completed audio QA testing:

```markdown
### Audio System Quality Assurance
- **Status**: 📝 Pending → ✅ Completed (2026-04-30)
```

Then update the summary:

```markdown
| Critical | 2 | 1 | 0 | 1 | 0 |  ← 1 completed instead of 0
```

**Why this matters**: The next person knows:
- What's been completed (don't redo it)
- What's in progress (don't interrupt it)
- What's pending (available to work on)
- What's blocked (why you can't do it yet)

**If you skip this**: The next person wastes time on completed tasks or duplicates effort.

---

### Task ID System

**Official Task IDs** identify each task uniquely for tracking across LOGS.md and TODO.md.

**Format**: `{PRIORITY}-{NUMBER}` where:
- Priority: CRITICAL, HIGH, MEDIUM, LOW
- Number: 001, 002, 003... (sequential within priority level)

**Examples**:
- `CRITICAL-001` = first critical task
- `HIGH-002` = second high-priority task
- `MEDIUM-003` = third medium-priority task
- `LOW-001` = first low-priority task

**How to use**:

1. **In TODO.md**: Each task section starts with its ID as part of the heading:
   ```markdown
   ### CRITICAL-001: Audio System Quality Assurance
   ```

2. **In LOGS.md**: Reference task IDs when documenting work:
   ```markdown
   ### Tasks Addressed
   - CRITICAL-001: Audio System Quality Assurance
   - HIGH-002: Pong Mini-Game Session End on Miss
   ```

3. **Cross-references**: If tasks depend on each other, reference by ID:
   ```markdown
   **Depends on**: CRITICAL-001
   **Related to**: HIGH-001, HIGH-002
   ```

**Benefits**:
- Easy to reference in conversation ("I'm working on CRITICAL-001")
- Consistent tracking across sessions
- Clear traceability in LOGS.md
- Prevents duplicate work

---

### 3. Update README.md (Optional but Recommended)

**When**: If you discover important new information that should be in the overview

**What to do**:

1. Update the "Last Updated" section at the bottom
2. Update "Last Major Work" section to reflect latest changes
3. Update "Status" if anything changed

**Example**:

```markdown
**Last Updated**: 2026-04-30  
**Last Major Work**: Audio system refactor (volume sync, crossfade synchronization)  
**Status**: Production ready ✅
```

**Why this matters**: New people see at a glance what was most recently worked on.

---

## 🚦 Daily Workflow

### When Starting Work

1. **Read LOGS.md** — Understand what was recently done
2. **Read TODO.md** — See what's pending and prioritized
3. **Check the build** — `npm run build` (verify everything still works)
4. **Pick a task** — Choose the next item from TODO.md (by priority)

### While Working

1. Make your changes
2. Test your changes
3. Build: `npm run build` (must be ✅)
4. If build fails, fix it immediately — do NOT proceed until it passes
5. Commit with clear messages: `git commit -m "description"`

**Important**: Before asking the user for feedback on code changes, ALWAYS run `npm run build` first. If the build fails or has errors/warnings, fix them before showing the work to the user.

### Before Finishing

1. **Update LOGS.md** — Document what you did
2. **Update TODO.md** — Change task statuses
3. **Final build** — `npm run build` (must be ✅)
4. **Verify docs** — Did you update LOGS and TODO?
5. **Push/deploy** — Only after docs are updated

---

## 📋 Template for TODO.md Entries

When you add new tasks to TODO.md, use this format:

```markdown
### Task Name
- **Status**: 📝 Pending
- **Type**: Development (or Testing, Research, Planning)
- **Description**: What needs to be done?
- **Why Important**: Why does this matter?
- **Files to Check**: Which files are involved?
- **Acceptance**: How do you know it's done?
```

---

## 🐛 Bug Reporting in LOGS.md

When you discover a bug, document it like this:

```markdown
### Issues Found
- **Bug**: Main track silent after mini-games
  - Root cause: mainTrack.volume property not synced after fade-in
  - Where: AudioManager.js, transitionBackToMain()
  - Impact: User hears nothing for several seconds after mini-game
  - Fixed: ✅ Yes (added volume sync on line 125)
  
- **Remaining Issue**: Audio snap during crossfades (potential)
  - Investigation needed: Race condition between play() promise and fade animation?
  - Status: 🔄 Blocked (waiting for QA testing to confirm)
```

This way, the next person knows:
- What bugs exist
- If they've been fixed
- What investigation is needed
- Where to look

---

## ✅ Checklist Before Finishing Your Session

- [ ] All feature work is complete and tested
- [ ] `npm run build` succeeds with ✅
- [ ] LOGS.md has been updated with what you did
- [ ] TODO.md task statuses reflect current work
- [ ] README.md "Last Updated" section is current
- [ ] No debug console.log statements in committed code
- [ ] Changes are committed with clear messages

**If you skip any of these, the next person will be confused or duplicate work.**

---

## 🔄 Example Session from Start to Finish

### 1. Start of Session

```bash
# You're a fresh AI instance. What do you do?
1. Read README.md (this file)
2. Read LOGS.md (see what was done recently)
3. Read TODO.md (see what needs to be done)
4. npm run build (verify everything works)
# Now you're caught up! Ready to work.
```

### 2. During Work

```bash
# User: "Fix the high score display on mobile"
# You find the bug, fix it, test it
npm run build  # Verify it still works
git commit -m "Fix high score display on mobile (HighScoreHud responsive styling)"
```

### 3. End of Session

**Update LOGS.md**:

```markdown
## 2026-04-30 • High Score Mobile Display Fix

### What Was Requested
- Fix high score not displaying correctly on mobile
- Numbers were stacking vertically, should be single line

### What Was Done
- Updated src/components/calendar/HighScoreHud.js line 42
- Changed flex-direction from column to row on mobile breakpoint
- Changed font-size from 18px to 14px to fit single line
- Tested on iPhone 12 and Android (Chrome)

### Issues Found
- None

### Build Status
✅ Compiled successfully

### Testing Done
- Manual testing on Chrome DevTools mobile emulation
- Tested on two devices

### Next Steps
- Test in production with real users
```

**Update TODO.md**:

```markdown
### High Score Display on Mobile
- **Status**: 📝 Pending → ✅ Completed (2026-04-30)
```

**Then the next person**:
1. Reads LOGS.md and knows it was just fixed
2. Checks TODO.md and sees it's complete
3. Moves on to the next task, doesn't redo this work

---

## 🆘 If You're Unsure

**Q**: Should I update LOGS.md even for small changes?  
**A**: Yes. Even small changes are context for the next person.

**Q**: What if I only partially completed a task?  
**A**: Mark it as 🚀 In Progress with a note about what's left.

**Q**: What if I discover a bug I can't fix?  
**A**: Document it in LOGS.md under "Issues Found" and mark the task as 🔄 Blocked.

**Q**: How detailed should LOGS.md be?  
**A**: Include enough detail that the next person understands:
- What changed
- Why it changed
- If there are known issues
- What to test

**Q**: What if nothing changed in a work session?  
**A**: Still update LOGS.md! Document what you researched, what didn't work, what you learned. This prevents the next person from trying the same dead ends.

---

## 📚 Related Files

- [README.md](./README.md) — Project overview and quick start
- [LOGS.md](./LOGS.md) — Session log (what was done when)
- [TODO.md](./TODO.md) — Task list with priorities
- [AUDIO_ARCHITECTURE.md](./AUDIO_ARCHITECTURE.md) — Audio system deep dive (if exists)

---

## 🎓 Summary

**The process in one sentence**: After every session, update LOGS.md and TODO.md so the next person knows what you did and what still needs doing.

**Why it matters**: Without these docs, the next AI instance starts from zero. With them, it picks up where you left off.

**Your job**: Leave better documentation than you found. Future you (or a different AI) will thank you.

---

**Last Updated**: 2026-04-30  
**Created By**: Audio System Refactor Phase  
**Next Reader**: You, if you're about to work on this project
