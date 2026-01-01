# Project Status Report

Generate a comprehensive status report for the TeleLife Conversational AI POC.

## Input (Optional)

Specify report type or focus area:
- "full" - Complete status report
- "sprint" - Current sprint focus
- "risks" - Risk assessment
- "timeline" - Schedule status

**Report Type:**
$ARGUMENTS

---

## Report Generation

### Step 1: Gather Current State

Read all relevant project files:
- `.agent-os/product/roadmap.md`
- `.agent-os/tasks/active-sprint.md`
- `.agent-os/tasks/phase-1-questionnaire-engine.md`
- `.agent-os/tasks/phase-2-intelligence-layer.md`
- `.agent-os/tasks/phase-3-testing-refinement.md`
- `.agent-os/tasks/phase-4-demo-documentation.md`
- `.agent-os/product/decisions.md`
- `.agent-os/context/meeting-notes/` (recent notes)

### Step 2: Calculate Metrics

**Phase Progress:**
- Count completed vs total tasks per phase
- Calculate percentage complete

**Sprint Progress:**
- Tasks completed this sprint
- Tasks in progress
- Tasks blocked

**Timeline Status:**
- Days elapsed vs total
- Key milestones status

### Step 3: Generate Report

```markdown
# TeleLife POC - Project Status Report

**Generated:** YYYY-MM-DD
**Report Type:** [Full/Sprint/Risks/Timeline]

---

## Executive Summary

[2-3 sentences on overall project health]

**Overall Status:** 🟢 On Track | 🟡 At Risk | 🔴 Off Track

---

## Phase Progress

| Phase | Status | Progress | Target Date |
|-------|--------|----------|-------------|
| Phase 1: Questionnaire Engine | [status] | X/Y tasks (Z%) | Dec 31 |
| Phase 2: Intelligence Layer | [status] | X/Y tasks (Z%) | Jan 14 |
| Phase 3: Testing & Refinement | [status] | X/Y tasks (Z%) | Jan 28 |
| Phase 4: Demo & Documentation | [status] | X/Y tasks (Z%) | Feb 11 |

---

## Current Sprint Status

**Sprint:** [Name]
**Duration:** [Start] - [End]
**Days Remaining:** X

### Task Breakdown

| Status | Count | Tasks |
|--------|-------|-------|
| Complete | X | [list] |
| In Progress | X | [list] |
| Blocked | X | [list] |
| Not Started | X | [list] |

### Sprint Burndown
- Started with: X tasks
- Completed: Y tasks
- Remaining: Z tasks
- On track: Yes/No

---

## Key Accomplishments (Last 7 Days)

1. [Accomplishment 1]
2. [Accomplishment 2]
3. [Accomplishment 3]

---

## Upcoming Milestones

| Milestone | Date | Status | Notes |
|-----------|------|--------|-------|
| [Milestone 1] | [Date] | [status] | [notes] |
| [Milestone 2] | [Date] | [status] | [notes] |

---

## Risks & Issues

### Active Blockers

| Issue | Impact | Owner | Mitigation |
|-------|--------|-------|------------|
| [Issue] | [High/Med/Low] | [Owner] | [Action] |

### Risks Being Monitored

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| [Risk] | [H/M/L] | [H/M/L] | [Plan] |

---

## Recent Decisions

| Date | Decision | Impact |
|------|----------|--------|
| [Date] | [Decision] | [Impact] |

---

## Resource Status

### Team Allocation

| Role | Person | Availability | Current Focus |
|------|--------|--------------|---------------|
| Developer A | [Name] | [%] | [Task] |
| Developer B | [Name] | [%] | [Task] |

### Dependencies

| Dependency | Status | Owner | Due |
|------------|--------|-------|-----|
| [Dependency] | [status] | [owner] | [date] |

---

## Next Steps

### This Week
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]

### Decisions Needed
- [Decision needed]

### Stakeholder Actions Required
- [Action needed from stakeholder]

---

## Notes for Stakeholders

[Any specific notes or requests for stakeholder attention]
```

### Step 4: Output Report

Display the complete report formatted for easy reading.

---

## Report Types

**Full Report:**
- All sections included
- Comprehensive status

**Sprint Report:**
- Focus on current sprint
- Task-level detail
- Daily progress

**Risk Report:**
- Blockers and risks focus
- Mitigation status
- Escalation needs

**Timeline Report:**
- Milestone focus
- Date tracking
- Schedule variance

---

## Quick Status Check

For a quick status, just ask:
```
/project-status sprint
```

This will show only current sprint information.
