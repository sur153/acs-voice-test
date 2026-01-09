# Session Manager Skill

Manage development sessions with context preservation for seamless handoffs.

## Commands

### /session-start
**Trigger:** User says `/session-start` or "start session" or "resume work"

**Purpose:** Load minimal context at the beginning of a new session.

**Actions:**
1. Read `.agent-os/product/mission-lite.md` (if exists)
2. Read `.agent-os/context/current-session.md` (if exists)
3. If current-session.md has an active feature:
   - Read the active spec's `spec-lite.md`
   - Read the active spec's `tasks.md`
4. Run `git log --oneline -5` to show recent commits
5. Summarize current state to user

**Output Format:**
```
## Session Resumed

**Project:** [from mission-lite.md or project name]
**Active Feature:** [feature name] or "None"
**Last Session:** [date from current-session.md]

### Progress
- Completed: [X] tasks
- In Progress: [task name and status]
- Remaining: [Y] tasks

### Next Steps
1. [from current-session.md]
2. [from current-session.md]

Ready to continue?
```

---

### /session-save
**Trigger:** User says `/session-save` or "save session" or "end session"

**Purpose:** Save current state before context clears or session ends.

**Actions:**
1. Gather current state:
   - Active feature (from current-session.md or recent work)
   - Tasks completed this session
   - Current in-progress task with details
   - Key decisions made
   - Files modified (from git status)
   - Any blockers or questions
2. Write to `.agent-os/context/current-session.md`
3. Stage and commit all changes with message: "Session save: [brief summary]"
4. Report summary to user

**Output Format:**
```
## Session Saved

**Committed:** [commit hash]
**Branch:** [current branch]

### Completed This Session
- [task 1]
- [task 2]

### In Progress
- [task with details on where stopped]

### Resume Next Session
1. [next step 1]
2. [next step 2]

Run `/session-start` in your next session to restore context.
```

---

### /session-status
**Trigger:** User says `/session-status` or "session status" or "where are we"

**Purpose:** Quick check of current progress without full context load.

**Actions:**
1. Read `.agent-os/context/current-session.md`
2. If active feature, read its `tasks.md`
3. Show condensed status

**Output Format:**
```
## Current Status

**Feature:** [name] | **Branch:** [git branch]
**Progress:** [X/Y] tasks complete

### Tasks
- [x] Completed task
- [~] In progress task (details)
- [ ] Pending task

**Last Updated:** [timestamp]
```

---

## Context Files Referenced

| File | Purpose | Size Target |
|------|---------|-------------|
| `mission-lite.md` | Product summary | <200 words |
| `current-session.md` | Session state | <500 words |
| `spec-lite.md` | Feature summary | <300 words |
| `tasks.md` | Task checklist | Variable |

## Best Practices

1. **Call /session-save before:**
   - Ending a long session
   - Context feeling full
   - Switching to different work
   - Taking a break

2. **Call /session-start when:**
   - Beginning new session
   - After context was cleared
   - Returning to project after time away

3. **Call /session-status when:**
   - Need quick orientation
   - Before making decisions
   - Checking progress mid-session
