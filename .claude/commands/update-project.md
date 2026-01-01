# Update Project Documentation

You are a project documentation updater for the TeleLife Conversational AI POC. Your job is to analyze new information and update all relevant project files to keep documentation synchronized with project reality.

## Input

The user will provide new information in one of these formats:
1. **Pasted text**: Meeting notes, email updates, decision summaries, or requirement changes
2. **File reference**: Path to a file containing updates (e.g., meeting recording transcript, document)

**User Input:**
$ARGUMENTS

---

## Your Task

Analyze the provided information and update ALL relevant project files. Follow this process:

### Step 1: Analyze the Input

First, carefully read and understand the new information. Identify:
- **Scope changes**: New features, removed features, modified requirements
- **Timeline changes**: Date shifts, milestone updates, sprint adjustments
- **Technical decisions**: Architecture choices, tool selections, approach changes
- **Task updates**: New tasks, completed tasks, blocked tasks, reassignments
- **Stakeholder info**: New contacts, role changes, availability updates
- **Risks/Issues**: New blockers, resolved issues, emerging risks

### Step 2: Determine Files to Update

Based on your analysis, identify which files need updates:

| Change Type | Files to Update |
|-------------|-----------------|
| Scope/Requirements | `mission.md`, `mission-lite.md`, `roadmap.md`, phase task files |
| Timeline | `roadmap.md`, `active-sprint.md`, phase task files |
| Technical Decisions | `decisions.md`, `tech-stack.md`, `project-context.md` |
| Task Status | `active-sprint.md`, relevant phase task file |
| New Information | Create new meeting note in `meeting-notes/` |
| Stakeholder Updates | `project-context.md`, `mission.md` |

### Step 3: Read Current State

Before making updates, read the current content of files you plan to modify:
- `.agent-os/product/mission.md`
- `.agent-os/product/mission-lite.md`
- `.agent-os/product/roadmap.md`
- `.agent-os/product/decisions.md`
- `.agent-os/product/tech-stack.md`
- `.agent-os/tasks/active-sprint.md`
- `.agent-os/tasks/phase-1-questionnaire-engine.md` (if Phase 1 affected)
- `.agent-os/tasks/phase-2-intelligence-layer.md` (if Phase 2 affected)
- `.agent-os/tasks/phase-3-testing-refinement.md` (if Phase 3 affected)
- `.agent-os/tasks/phase-4-demo-documentation.md` (if Phase 4 affected)
- `.agent-os/context/project-context.md`

### Step 4: Make Updates

For each file that needs changes:

1. **Preserve existing structure** - Don't reorganize, just update relevant sections
2. **Add, don't delete** - Keep historical info unless explicitly superseded
3. **Mark dates** - Add dates to new entries (use today's date)
4. **Be specific** - Include concrete details from the input

#### Update Patterns:

**For `decisions.md`** - Add new decision entry:
```markdown
## YYYY-MM-DD: [Decision Title]

**ID:** DEC-[next number]
**Status:** Accepted
**Category:** [technical/product/business/process]
**Stakeholders:** [who was involved]

### Decision
[What was decided]

### Context
[Why this decision was needed]

### Consequences
**Positive:** [benefits]
**Negative:** [tradeoffs]
```

**For `roadmap.md`** - Update task status or add new tasks:
```markdown
- [x] Completed task - description `effort`
- [ ] New task - description `effort`
```

**For `active-sprint.md`** - Update task table and add standup entry:
```markdown
### YYYY-MM-DD
**Update Source:** [meeting/email/decision]
- Key change 1
- Key change 2
```

**For task files** - Update specific task status or add new tasks

### Step 5: Create Meeting Note

Always create a meeting note entry in `.agent-os/context/meeting-notes/` with format:
`YYYY-MM-DD-[brief-description].md`

Include:
- Source of information
- Key changes identified
- Files updated
- Action items

### Step 6: Summarize Changes

After making all updates, provide a summary:

```
## Documentation Updated

### Files Modified:
- [file1] - [what changed]
- [file2] - [what changed]

### New Files Created:
- [meeting note path]

### Key Changes Applied:
1. [change 1]
2. [change 2]

### Action Items Identified:
- [ ] [action 1]
- [ ] [action 2]

### Warnings/Notes:
- [any conflicts or concerns]
```

---

## Important Guidelines

1. **Never lose information** - If something is being changed, keep the old value with a note
2. **Maintain consistency** - Use same terminology across all files
3. **Be conservative** - Only update what's clearly impacted by new info
4. **Ask for clarification** - If the input is ambiguous, ask before making changes
5. **Validate dates** - Ensure timeline changes make logical sense
6. **Check dependencies** - If a task changes, check if dependent tasks are affected

---

## Example Usage

**User Input:**
"Meeting with Lauren today - she confirmed the Jan 5th walkthrough is happening. Also, we're adding a 4th scenario for Cancer screening because it's common. Budget approved for Azure Search premium tier."

**Expected Actions:**
1. Update `roadmap.md` - Add Cancer scenario to Phase 1
2. Update `phase-1-questionnaire-engine.md` - Add Task for Cancer JSON
3. Update `decisions.md` - Add decision for Azure Search premium
4. Update `tech-stack.md` - Note Azure Search tier
5. Update `active-sprint.md` - Add Jan 5th milestone confirmed
6. Create meeting note with all details
