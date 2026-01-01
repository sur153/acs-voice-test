# Update Project from Meeting Notes/Recording

You are processing meeting information to update project documentation for the TeleLife Conversational AI POC.

## Input

The user will provide either:
1. **Meeting transcript** - Pasted text from a meeting recording
2. **Meeting notes** - Written summary of discussion
3. **File path** - Reference to a file containing meeting content (audio transcript, document)

**Meeting Content:**
$ARGUMENTS

---

## Processing Steps

### Step 1: Extract Key Information

Parse the meeting content and extract:

**Attendees & Roles:**
- Who was in the meeting?
- Any new stakeholders introduced?

**Decisions Made:**
- What was agreed upon?
- Who made the decision?
- What alternatives were considered?

**Action Items:**
- What tasks were assigned?
- Who is responsible?
- What are the deadlines?

**Timeline Updates:**
- Any date changes?
- Milestone updates?
- Sprint adjustments?

**Scope Changes:**
- New requirements?
- Removed features?
- Modified functionality?

**Technical Discussions:**
- Architecture decisions?
- Tool/technology choices?
- Integration points?

**Risks & Issues:**
- New blockers identified?
- Issues resolved?
- Concerns raised?

**Next Steps:**
- What happens next?
- Follow-up meetings?

### Step 2: Create Meeting Notes File

Create a new file at `.agent-os/context/meeting-notes/YYYY-MM-DD-[topic].md`:

```markdown
# Meeting Notes: [Topic]

## Meeting Information

**Date**: [extracted or today's date]
**Attendees**:
- [Name] ([Role])

**Meeting Type**: [Standup | Planning | Demo | Workshop | Review | Client Call]

---

## Summary

[2-3 sentence summary of the meeting]

---

## Discussion Notes

### [Topic 1]
- Key point
- Key point

### [Topic 2]
- Key point

---

## Decisions Made

| Decision | Owner | Impact |
|----------|-------|--------|
| [Decision] | [Person] | [What it affects] |

---

## Action Items

- [ ] [Action] - @[Owner] - Due: [Date]

---

## Updates to Project

Based on this meeting, the following files were updated:
- [file] - [change]

---

## Follow-up Required

- [Next meeting/action needed]
```

### Step 3: Update Project Files

Based on extracted information, update relevant files:

**If scope changed:**
- Read and update `.agent-os/product/mission.md`
- Read and update `.agent-os/product/mission-lite.md`
- Read and update `.agent-os/product/roadmap.md`

**If decisions were made:**
- Read and update `.agent-os/product/decisions.md`
- Add entry with full decision template

**If tasks changed:**
- Read and update `.agent-os/tasks/active-sprint.md`
- Read and update relevant phase task file

**If timeline changed:**
- Read and update `.agent-os/product/roadmap.md`
- Read and update `.agent-os/tasks/active-sprint.md`

**If technical decisions:**
- Read and update `.agent-os/product/tech-stack.md`
- Read and update `.agent-os/product/decisions.md`

### Step 4: Update Active Sprint

Always add an entry to `active-sprint.md` under Daily Standups:

```markdown
### YYYY-MM-DD
**Source:** Meeting with [attendees]
**Key Updates:**
- [Update 1]
- [Update 2]

**New Action Items:**
- [ ] [Action] - @[Owner]
```

### Step 5: Provide Summary

Output a clear summary:

```
## Meeting Processed Successfully

### Meeting: [Topic] - [Date]

### Files Created:
- `.agent-os/context/meeting-notes/YYYY-MM-DD-topic.md`

### Files Updated:
- [file] - [what changed]

### Key Takeaways:
1. [Takeaway 1]
2. [Takeaway 2]

### Action Items Captured:
- [ ] [Action 1] - @Owner
- [ ] [Action 2] - @Owner

### Next Meeting/Follow-up:
- [What's next]
```

---

## Handling Audio Transcripts

If the input appears to be a raw audio transcript:
1. Clean up filler words and false starts
2. Identify speakers if possible
3. Focus on substantive content
4. Note any unclear sections with [UNCLEAR]

## Handling Partial Information

If the meeting content is incomplete:
1. Note what information is missing
2. Ask clarifying questions before updating critical files
3. Mark uncertain items with [TO CONFIRM]
