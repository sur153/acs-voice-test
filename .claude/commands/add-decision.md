# Add Project Decision

Record a new technical or product decision for the TeleLife Conversational AI POC.

## Input

Describe the decision that was made:
- What was decided
- Why it was decided
- Who was involved
- What alternatives were considered

**Decision Information:**
$ARGUMENTS

---

## Processing Steps

### Step 1: Parse Decision Details

Extract from input:
- **Decision Title**: Short descriptive title
- **Category**: technical | product | business | process
- **Stakeholders**: Who was involved in the decision
- **The Decision**: What was decided
- **Context**: Why this decision was needed
- **Alternatives**: What other options were considered
- **Consequences**: Positive and negative impacts

### Step 2: Determine Next Decision ID

Read `.agent-os/product/decisions.md` and find the last DEC-XXX number.
Increment to get next ID.

### Step 3: Add Decision Entry

Add new entry to `.agent-os/product/decisions.md`:

```markdown
---

## YYYY-MM-DD: [Decision Title]

**ID:** DEC-[XXX]
**Status:** Accepted
**Category:** [technical/product/business/process]
**Stakeholders:** [List of people involved]

### Decision

[Clear statement of what was decided]

### Context

[Why this decision was needed - the problem or opportunity]

### Alternatives Considered

1. **[Alternative 1]**
   - Pros: [benefits]
   - Cons: [drawbacks]

2. **[Alternative 2]**
   - Pros: [benefits]
   - Cons: [drawbacks]

### Rationale

[Why this option was chosen over alternatives]

### Consequences

**Positive:**
- [Expected benefit 1]
- [Expected benefit 2]

**Negative:**
- [Known tradeoff 1]
- [Known tradeoff 2]
```

### Step 4: Update Related Files

Depending on decision category, update:

**Technical decisions:**
- `.agent-os/product/tech-stack.md` - Add/modify technology entries
- `.agent-os/context/project-context.md` - Update technical patterns

**Product decisions:**
- `.agent-os/product/mission.md` - If scope affected
- `.agent-os/product/roadmap.md` - If timeline/features affected

**Process decisions:**
- `.agent-os/tasks/active-sprint.md` - If workflow changes
- Task files - If task approach changes

### Step 5: Cross-Reference

Add reference to decision in affected files:
```markdown
> See Decision DEC-XXX in decisions.md
```

### Step 6: Output Confirmation

```
## Decision Recorded

**ID:** DEC-[XXX]
**Title:** [Decision Title]
**Category:** [Category]
**Date:** YYYY-MM-DD

### Summary:
[Brief summary of decision]

### Files Updated:
- `decisions.md` - New decision entry added
- [other files] - [what was updated]

### Impact:
- [How this affects the project]

### Related Decisions:
- [Any related past decisions]
```

---

## Decision Categories Guide

**Technical:**
- Architecture choices
- Technology selection
- Integration approaches
- Performance tradeoffs

**Product:**
- Feature scope
- User experience
- Prioritization
- Requirements changes

**Business:**
- Budget allocation
- Timeline commitments
- Resource allocation
- Stakeholder agreements

**Process:**
- Workflow changes
- Communication patterns
- Review processes
- Documentation standards

---

## Quick Decision Format

For simple decisions, you can use:
```
Decision: [what]
Reason: [why]
Category: [technical/product/business/process]
```
