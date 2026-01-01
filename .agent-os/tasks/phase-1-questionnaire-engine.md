# Phase 1: Questionnaire Engine Tasks

> **Context**: @.agent-os/product/mission-lite.md | @.agent-os/product/tech-stack.md
> **Duration**: Weeks 1-2 (Dec 17 - Dec 31, 2025)
> **Goal**: Implement structured questionnaire flow with branching logic

---

## Developer Assignment

| Task Group | Developer A | Developer B |
|------------|-------------|-------------|
| Questionnaire JSON | ✅ Primary | Support |
| Question Flow Engine | Support | ✅ Primary |
| Session State | ✅ Primary | Support |

---

## Task 1: Blood Pressure Scenario JSON

**Assignee**: Developer A
**Priority**: High
**Estimated Effort**: M (1 week)

### Description
Create structured JSON for Blood Pressure scenario questions from TeleLife Guide.

### Acceptance Criteria
- [ ] All Blood Pressure questions extracted from TeleLife Guide
- [ ] Proper branching logic defined (next question based on answer)
- [ ] Question types defined (text, choice, date, etc.)
- [ ] Metadata includes section/subsection categorization
- [ ] JSON validates against schema

### Reference Files
- `/docs/original/TeleLife_Guide.md` - Source questionnaire
- `/acs-voice-test/QuestionList.json` - Current format example

### Technical Notes
```json
{
  "Q_BP_1": {
    "text": "Have you ever been diagnosed with high blood pressure?",
    "type": "choice",
    "choices": ["Yes", "No"],
    "meta": {"section": "medical", "subsection": "cardiovascular"},
    "next": {
      "Yes": "Q_BP_2",
      "No": "Q_NEXT_SECTION"
    }
  }
}
```

### Dependencies
- TeleLife Guide document access
- SME validation (Dustin Dew)

---

## Task 2: Diabetes Scenario JSON

**Assignee**: Developer A
**Priority**: High
**Estimated Effort**: M (1 week)

### Description
Create structured JSON for Diabetes/Respiratory scenario with moderately complex branching.

### Acceptance Criteria
- [ ] All Diabetes-related questions extracted
- [ ] Follow-up questions properly linked
- [ ] Multiple branch paths tested
- [ ] Consistent with Blood Pressure format

### Reference Files
- `/docs/original/TeleLife_Guide.md`
- Task 1 output for format consistency

---

## Task 3: Cardiovascular Scenario JSON

**Assignee**: Developer A
**Priority**: High
**Estimated Effort**: M (1 week)

### Description
Create structured JSON for Cardiovascular scenario focusing on terminology challenges.

### Acceptance Criteria
- [ ] All Cardiovascular questions extracted
- [ ] Include common ambiguous terms (medications, procedures)
- [ ] Add synonyms/alternatives for medical terms
- [ ] Document expected clarification prompts

### Technical Notes
Include a `clarification_hints` field for ambiguous terms:
```json
{
  "Q_CV_5": {
    "text": "What medications are you taking for your heart condition?",
    "type": "text",
    "meta": {"section": "medical", "subsection": "cardiovascular"},
    "clarification_hints": [
      "Common medications include: aspirin, beta blockers, statins",
      "If unsure of name, describe: color, shape, frequency"
    ],
    "next": "Q_CV_6"
  }
}
```

---

## Task 4: Question Flow Engine

**Assignee**: Developer B
**Priority**: Critical
**Estimated Effort**: L (2 weeks)

### Description
Implement engine to navigate questions based on user responses and branching logic.

### Acceptance Criteria
- [ ] Load questionnaire JSON on startup
- [ ] Serve current question based on session state
- [ ] Process response and determine next question
- [ ] Handle conditional branching (if/else paths)
- [ ] Support question skipping based on earlier answers
- [ ] Unit tests for all branch scenarios

### File Locations
- Create: `/acs-voice-test/app/engine/question_flow.py`
- Create: `/acs-voice-test/app/engine/__init__.py`
- Modify: `/acs-voice-test/app/handler/acs_media_handler.py`

### Interface Design
```python
class QuestionFlowEngine:
    def __init__(self, questionnaire_path: str):
        """Load questionnaire from JSON file."""

    def get_current_question(self, session_id: str) -> Question:
        """Get the current question for a session."""

    def process_response(self, session_id: str, response: str) -> Question:
        """Process response and return next question."""

    def get_session_summary(self, session_id: str) -> dict:
        """Get all captured responses for a session."""
```

### Dependencies
- Task 1-3 (Questionnaire JSON files)

---

## Task 5: Session State Manager

**Assignee**: Developer A
**Priority**: High
**Estimated Effort**: M (1 week)

### Description
Implement session state management to track interview progress.

### Acceptance Criteria
- [ ] Create/retrieve session by ID
- [ ] Store current question position
- [ ] Store all captured responses
- [ ] Handle session timeout/cleanup
- [ ] Support session resume after interruption
- [ ] In-memory storage for POC (Cosmos DB ready interface)

### File Locations
- Create: `/acs-voice-test/app/state/session_manager.py`
- Create: `/acs-voice-test/app/state/__init__.py`

### Interface Design
```python
class SessionManager:
    def create_session(self, caller_id: str) -> str:
        """Create new session, return session_id."""

    def get_session(self, session_id: str) -> Session:
        """Retrieve session state."""

    def update_session(self, session_id: str,
                       current_question: str,
                       response: dict) -> None:
        """Update session with new response."""

    def close_session(self, session_id: str) -> dict:
        """Close session and return final summary."""
```

---

## Task 6: Response Validation

**Assignee**: Developer B
**Priority**: Medium
**Estimated Effort**: S (2-3 days)

### Description
Implement basic validation for different response types.

### Acceptance Criteria
- [ ] Validate date format (mm/dd/yyyy)
- [ ] Validate choice responses (match allowed values)
- [ ] Validate numeric ranges (height, weight, etc.)
- [ ] Return helpful error messages for invalid input

### File Locations
- Create: `/acs-voice-test/app/engine/validators.py`

---

## Task 7: Integration with Voice Handler

**Assignee**: Developer B
**Priority**: Critical
**Estimated Effort**: M (1 week)

### Description
Connect question flow engine with existing voice handler.

### Acceptance Criteria
- [ ] Voice handler uses question flow for conversation
- [ ] Responses captured from transcription
- [ ] Next question prompted after response
- [ ] Session state updated after each turn
- [ ] End of flow triggers summary generation

### Modify Files
- `/acs-voice-test/app/handler/acs_media_handler.py`
- `/acs-voice-test/server.py`

---

## Sync Points

- **Daily**: Quick async standup via Slack/Teams
- **End of Week 1**: Questionnaire JSON review with SME
- **End of Week 2**: Demo question flow to team

## Definition of Done

- [ ] All 3 scenario JSONs complete and validated
- [ ] Question flow engine navigates all scenarios correctly
- [ ] Session state persists across conversation turns
- [ ] Basic response validation working
- [ ] Integration tests passing
- [ ] Code reviewed and merged to main
