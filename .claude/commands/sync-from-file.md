# Sync Project from File

Read a file containing project updates and synchronize all relevant project documentation.

## Input

Provide a file path containing new information:
- Meeting transcript file
- Email export
- Requirements document
- Specification update
- Any document with project changes

**File Path:**
$ARGUMENTS

---

## Processing Steps

### Step 1: Read the Source File

Read the file at the provided path. Support multiple formats:
- `.md` - Markdown files
- `.txt` - Plain text files
- `.docx` - Word documents (use pandoc to convert)
- `.pdf` - PDF files (extract text)
- `.json` - JSON data files

If file doesn't exist, report error and stop.

### Step 2: Analyze Content Type

Determine what type of content this is:

**Meeting Notes/Transcript:**
- Contains attendee names
- Discussion format
- Action items mentioned
- → Use meeting processing workflow

**Requirements/Specification:**
- Feature descriptions
- Acceptance criteria
- Technical requirements
- → Use requirements processing workflow

**Email/Communication:**
- To/From headers
- Date stamps
- Decision confirmations
- → Use communication processing workflow

**Technical Document:**
- Architecture details
- API specifications
- Code examples
- → Use technical processing workflow

**Status Update:**
- Progress reports
- Task completions
- Blockers
- → Use status processing workflow

### Step 3: Extract Information

Based on content type, extract relevant information:

**From Meetings:**
- Decisions made
- Action items
- Timeline changes
- Scope changes
- Attendee list

**From Requirements:**
- New features
- Modified features
- Acceptance criteria
- Technical constraints

**From Communications:**
- Approvals
- Confirmations
- Questions/Answers
- Date commitments

**From Technical Docs:**
- Architecture decisions
- Technology choices
- Integration requirements
- API contracts

**From Status Updates:**
- Completed work
- Current blockers
- Risk updates
- Resource changes

### Step 4: Determine Impacted Files

Map extracted information to project files:

```
Information Type          → Files to Update
─────────────────────────────────────────────
Scope/Feature changes    → mission.md, mission-lite.md, roadmap.md
Timeline changes         → roadmap.md, active-sprint.md, phase tasks
Technical decisions      → decisions.md, tech-stack.md
Task status updates      → active-sprint.md, phase tasks
New requirements         → Create new spec in .agent-os/specs/
Stakeholder updates      → project-context.md
Meeting outcomes         → meeting-notes/YYYY-MM-DD-topic.md
```

### Step 5: Read Current Files

For each file that will be updated:
1. Read current content
2. Identify sections to modify
3. Plan minimal changes

### Step 6: Apply Updates

Make targeted updates to each file:

**Preserve:**
- Existing structure
- Historical information
- Other sections not affected

**Add:**
- New entries with today's date
- References to source file
- Cross-references between files

**Modify:**
- Status changes
- Updated information
- Corrected details

### Step 7: Create Audit Trail

Create a sync log entry in `.agent-os/context/sync-log.md`:

```markdown
## YYYY-MM-DD HH:MM - Sync from [filename]

**Source:** [full file path]
**Content Type:** [detected type]

### Changes Applied:
- [file1]: [changes]
- [file2]: [changes]

### Information Extracted:
- [key point 1]
- [key point 2]

### Files Updated:
1. [file path]
2. [file path]

### Manual Review Needed:
- [anything requiring human verification]
```

### Step 8: Output Summary

```
## File Sync Complete

### Source File
- **Path:** [file path]
- **Type:** [detected content type]
- **Size:** [file size]

### Information Extracted

**Decisions:** [count]
**Action Items:** [count]
**Scope Changes:** [count]
**Timeline Updates:** [count]

### Files Updated

| File | Changes Made |
|------|--------------|
| [file] | [summary of changes] |

### New Files Created

- [file path] - [description]

### Requires Manual Review

- [ ] [item needing human verification]

### Sync Log

Entry added to `.agent-os/context/sync-log.md`

### Next Steps

1. [Recommended action]
2. [Recommended action]
```

---

## Handling Large Files

For files over 500 lines:
1. Process in sections
2. Summarize each section
3. Extract key points
4. Note sections skipped with reason

## Handling Ambiguous Content

If information is unclear:
1. Note the ambiguity
2. Add [TO CONFIRM] markers
3. List questions for clarification
4. Don't make assumptions in critical files

## File Type Handling

**Word Documents (.docx):**
```bash
pandoc "file.docx" -o temp.md
# Then process markdown
```

**PDF Files:**
- Extract text content
- Note any images/diagrams skipped
- Flag tables for manual review

**JSON Files:**
- Parse structured data
- Map fields to project concepts
- Validate data structure
