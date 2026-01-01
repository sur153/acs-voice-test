# Update Task Status

Quickly update task status across project documentation for the TeleLife Conversational AI POC.

## Input

Provide task status update in any format:
- "Task P1-T1 is complete"
- "Finished Blood Pressure JSON"
- "Blocked on SME review"
- "Starting question flow engine"

**Status Update:**
$ARGUMENTS

---

## Processing Steps

### Step 1: Identify the Task

Parse the input to identify:
- **Task ID** (e.g., P1-T1, P2-T3)
- **Task Name** (e.g., "Blood Pressure Scenario JSON")
- **New Status**: Not Started | In Progress | Blocked | Complete
- **Notes**: Any additional context

### Step 2: Locate Task in Files

Search for the task in:
1. `.agent-os/tasks/active-sprint.md` - Current sprint tracker
2. `.agent-os/tasks/phase-1-questionnaire-engine.md`
3. `.agent-os/tasks/phase-2-intelligence-layer.md`
4. `.agent-os/tasks/phase-3-testing-refinement.md`
5. `.agent-os/tasks/phase-4-demo-documentation.md`
6. `.agent-os/product/roadmap.md`

### Step 3: Update Files

**In `active-sprint.md`:**
Update the task table:
```markdown
| P1-T1 | Blood Pressure Scenario JSON | Complete | Finished YYYY-MM-DD |
```

Update Sprint Status counts.

**In phase task file:**
Update acceptance criteria checkboxes:
```markdown
### Acceptance Criteria
- [x] Completed item
- [ ] Pending item
```

**In `roadmap.md`:**
Update feature checkbox:
```markdown
- [x] Completed feature - description `effort`
```

### Step 4: Handle Blockers

If status is "Blocked":
1. Add to Blockers section in `active-sprint.md`
2. Note the blocker reason
3. Identify who can unblock

```markdown
## Blockers

| Task | Blocker | Owner | Since |
|------|---------|-------|-------|
| P1-T1 | Waiting for SME review | Dustin Dew | YYYY-MM-DD |
```

### Step 5: Handle Completion

If status is "Complete":
1. Check if this unblocks other tasks
2. Update dependent task notes
3. Check if sprint/phase completion criteria met

### Step 6: Output Summary

```
## Task Status Updated

**Task:** [ID] - [Name]
**Previous Status:** [old status]
**New Status:** [new status]

### Files Updated:
- `active-sprint.md` - Task table updated
- `phase-X-*.md` - Acceptance criteria updated
- `roadmap.md` - Feature status updated

### Impact:
- [Any dependent tasks affected]
- [Sprint/phase progress update]

### Next Tasks to Consider:
- [Suggested next task based on dependencies]
```

---

## Quick Status Codes

You can use shorthand:
- `done` or `complete` → Mark as Complete
- `wip` or `started` → Mark as In Progress
- `blocked` → Mark as Blocked with reason
- `todo` or `reset` → Mark as Not Started

## Batch Updates

You can update multiple tasks:
```
P1-T1: done
P1-T2: wip
P1-T3: blocked - waiting for Azure access
```
