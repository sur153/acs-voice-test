# Phase 2: Intelligence Layer Tasks

> **Context**: @.agent-os/product/mission-lite.md | @.agent-os/product/tech-stack.md
> **Duration**: Weeks 3-4 (Dec 31 - Jan 14, 2026)
> **Goal**: Add AI capabilities for natural conversation and response handling
> **Depends On**: Phase 1 completion

---

## Developer Assignment

| Task Group | Developer A | Developer B |
|------------|-------------|-------------|
| RAG Service | ✅ Primary | Support |
| Prompt Engineering | Support | ✅ Primary |
| Summary Generation | ✅ Primary | Support |

---

## Task 1: RAG Service Setup

**Assignee**: Developer A
**Priority**: High
**Estimated Effort**: L (2 weeks)

### Description
Set up Azure Search index with TeleLife questionnaire content for grounding AI responses.

### Acceptance Criteria
- [ ] Azure Search index created
- [ ] Questionnaire content indexed with proper chunking
- [ ] Medical terminology synonyms included
- [ ] Retrieval queries working
- [ ] Re-ranking configured for relevance

### File Locations
- Create: `/acs-voice-test/app/rag/search_service.py`
- Create: `/acs-voice-test/app/rag/indexer.py`
- Create: `/acs-voice-test/app/rag/__init__.py`

### Technical Notes
```python
class RAGService:
    def __init__(self, endpoint: str, index_name: str, api_key: str):
        """Initialize Azure Search client."""

    def search(self, query: str, top_k: int = 3) -> List[Document]:
        """Search for relevant context."""

    def get_question_context(self, question_id: str) -> str:
        """Get context for a specific question."""
```

### Azure Resources Needed
- Azure Cognitive Search service
- Index with questionnaire documents
- API key in environment variables

---

## Task 2: Prompt Engineering - Blood Pressure

**Assignee**: Developer B
**Priority**: High
**Estimated Effort**: M (1 week)

### Description
Create and optimize system prompts for Blood Pressure scenario.

### Acceptance Criteria
- [ ] System prompt captures interviewer persona
- [ ] Prompt guides natural question flow
- [ ] Clarification prompts for ambiguous responses
- [ ] Transition phrases between questions
- [ ] A/B test variations for effectiveness

### File Locations
- Create: `/acs-voice-test/prompts/blood_pressure.yaml`
- Create: `/acs-voice-test/prompts/__init__.py`

### Prompt Template Structure
```yaml
scenario: blood_pressure
system_prompt: |
  You are a professional TeleLife interviewer for Protective Life Insurance.
  You are conducting a phone interview to gather health information.

  Guidelines:
  - Be conversational but professional
  - Ask one question at a time
  - Wait for complete responses
  - Clarify ambiguous answers politely
  - Never provide medical advice

  Current question: {current_question}
  Previous responses: {context}

clarification_prompts:
  - "Could you tell me more about that?"
  - "Just to confirm, you said {response}. Is that correct?"
  - "I want to make sure I understand correctly..."

transition_phrases:
  - "Thank you for that information."
  - "I appreciate you sharing that."
  - "Let me ask you about..."
```

---

## Task 3: Prompt Engineering - Diabetes

**Assignee**: Developer B
**Priority**: High
**Estimated Effort**: M (1 week)

### Description
Create system prompts for Diabetes scenario with deeper follow-up logic.

### Acceptance Criteria
- [ ] Handles complex branching conversations
- [ ] Appropriate follow-up questions
- [ ] Medical terminology handled gracefully
- [ ] Consistent with Blood Pressure persona

---

## Task 4: Prompt Engineering - Cardiovascular

**Assignee**: Developer B
**Priority**: High
**Estimated Effort**: M (1 week)

### Description
Create system prompts for Cardiovascular scenario focusing on terminology challenges.

### Acceptance Criteria
- [ ] Handles medication name confusion
- [ ] Probes for clarity on procedures
- [ ] Offers synonym suggestions naturally
- [ ] Documents unclear responses appropriately

### Technical Notes
Include medication hints:
```yaml
medication_clarifications:
  statins: ["lipitor", "atorvastatin", "crestor", "cholesterol medicine"]
  beta_blockers: ["metoprolol", "atenolol", "heart rhythm medicine"]
  blood_thinners: ["warfarin", "coumadin", "eliquis", "blood thinner"]
```

---

## Task 5: Ambiguity Handler

**Assignee**: Developer B
**Priority**: High
**Estimated Effort**: M (1 week)

### Description
Implement logic to detect and handle ambiguous responses.

### Acceptance Criteria
- [ ] Detect low-confidence transcriptions
- [ ] Identify vague medical terminology
- [ ] Generate appropriate clarification prompts
- [ ] Track clarification attempts (max 2-3)
- [ ] Gracefully accept "I don't know" responses

### File Locations
- Create: `/acs-voice-test/app/engine/ambiguity_handler.py`

### Interface Design
```python
class AmbiguityHandler:
    def analyze_response(self, response: str, question: Question) -> Analysis:
        """Analyze response for ambiguity."""

    def generate_clarification(self, analysis: Analysis) -> str:
        """Generate appropriate clarification prompt."""

    def should_escalate(self, session: Session) -> bool:
        """Determine if human intervention needed."""
```

---

## Task 6: Response Capture Service

**Assignee**: Developer A
**Priority**: High
**Estimated Effort**: M (1 week)

### Description
Extract structured data from conversation transcripts.

### Acceptance Criteria
- [ ] Parse transcription for answer content
- [ ] Map responses to question fields
- [ ] Handle multi-part responses
- [ ] Store responses in session state
- [ ] Export to structured format

### File Locations
- Create: `/acs-voice-test/app/capture/response_extractor.py`
- Create: `/acs-voice-test/app/capture/__init__.py`

---

## Task 7: Summary Generation

**Assignee**: Developer A
**Priority**: High
**Estimated Effort**: M (1 week)

### Description
Generate completed interview records from session data.

### Acceptance Criteria
- [ ] Produce structured summary document
- [ ] Include all captured responses
- [ ] Note any clarifications needed
- [ ] Flag incomplete sections
- [ ] Export format matches downstream requirements

### File Locations
- Create: `/acs-voice-test/app/capture/summary_generator.py`

### Output Format
```json
{
  "interview_id": "uuid",
  "completed_at": "2025-12-30T10:30:00Z",
  "caller_id": "+1234567890",
  "duration_seconds": 420,
  "scenario": "blood_pressure",
  "responses": [
    {
      "question_id": "Q_BP_1",
      "question_text": "Have you been diagnosed with high blood pressure?",
      "response": "Yes",
      "confidence": 0.95,
      "clarifications": 0
    }
  ],
  "flags": [],
  "status": "complete"
}
```

---

## Task 8: Error Recovery

**Assignee**: Developer A
**Priority**: Medium
**Estimated Effort**: S (2-3 days)

### Description
Handle interruptions, disconnections, and errors gracefully.

### Acceptance Criteria
- [ ] Detect connection drops
- [ ] Save session state on interruption
- [ ] Resume from last question on reconnect
- [ ] Log all errors for debugging
- [ ] Graceful degradation when services unavailable

---

## Sync Points

- **Daily**: Quick async standup
- **Mid-Phase**: Demo RAG search to team
- **End of Phase**: Full scenario walkthrough

## Definition of Done

- [ ] RAG service returning relevant context
- [ ] Prompts optimized for all 3 scenarios
- [ ] Ambiguity handling working naturally
- [ ] Summary generation producing valid output
- [ ] Error recovery tested
- [ ] Integration tests passing
- [ ] Code reviewed and merged
