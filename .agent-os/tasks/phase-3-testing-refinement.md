# Phase 3: Testing & Refinement Tasks

> **Context**: @.agent-os/product/mission-lite.md | @.agent-os/product/tech-stack.md
> **Duration**: Weeks 5-6 (Jan 14 - Jan 28, 2026)
> **Goal**: Validate accuracy and optimize performance
> **Depends On**: Phase 2 completion

---

## Developer Assignment

| Task Group | Developer A | Developer B |
|------------|-------------|-------------|
| Unit Tests | ✅ Primary | ✅ Primary |
| Integration Tests | Support | ✅ Primary |
| Performance Optimization | ✅ Primary | Support |

---

## Task 1: Unit Tests - Question Flow

**Assignee**: Developer B
**Priority**: Critical
**Estimated Effort**: M (1 week)

### Description
Comprehensive unit tests for question flow engine.

### Acceptance Criteria
- [ ] Test all branching paths for Blood Pressure
- [ ] Test all branching paths for Diabetes
- [ ] Test all branching paths for Cardiovascular
- [ ] Test edge cases (skip, back, invalid input)
- [ ] Test session state persistence
- [ ] 80%+ code coverage

### File Locations
- Create: `/acs-voice-test/tests/unit/test_question_flow.py`
- Create: `/acs-voice-test/tests/__init__.py`

### Test Examples
```python
def test_blood_pressure_yes_path():
    """Test Blood Pressure scenario when user answers Yes."""
    engine = QuestionFlowEngine("questionnaire.json")
    session = engine.create_session("test-caller")

    # First question
    q1 = engine.get_current_question(session.id)
    assert q1.id == "Q_BP_1"

    # Answer Yes
    q2 = engine.process_response(session.id, "Yes")
    assert q2.id == "Q_BP_2"  # Follow-up question
```

---

## Task 2: Unit Tests - Response Validation

**Assignee**: Developer A
**Priority**: High
**Estimated Effort**: S (2-3 days)

### Description
Test all response validation scenarios.

### Acceptance Criteria
- [ ] Test date format validation
- [ ] Test choice validation
- [ ] Test numeric range validation
- [ ] Test error message generation
- [ ] Test edge cases

### File Locations
- Create: `/acs-voice-test/tests/unit/test_validators.py`

---

## Task 3: Unit Tests - Summary Generation

**Assignee**: Developer A
**Priority**: High
**Estimated Effort**: S (2-3 days)

### Description
Test summary generation output.

### Acceptance Criteria
- [ ] Test complete interview summary
- [ ] Test partial interview summary
- [ ] Test output format validation
- [ ] Test flag generation
- [ ] Test export functionality

### File Locations
- Create: `/acs-voice-test/tests/unit/test_summary.py`

---

## Task 4: Integration Tests - End-to-End Flow

**Assignee**: Developer B
**Priority**: Critical
**Estimated Effort**: L (2 weeks)

### Description
Full end-to-end tests simulating real conversations.

### Acceptance Criteria
- [ ] Test complete Blood Pressure interview
- [ ] Test complete Diabetes interview
- [ ] Test complete Cardiovascular interview
- [ ] Test interruption and resume
- [ ] Test ambiguity handling flow
- [ ] Test error recovery

### File Locations
- Create: `/acs-voice-test/tests/integration/test_conversation_flow.py`

### Test Scenarios
```python
class TestBloodPressureIntegration:
    """Full interview simulation for Blood Pressure scenario."""

    async def test_complete_interview_yes_path(self):
        """Simulate complete interview with Yes to BP diagnosis."""
        responses = [
            ("Have you been diagnosed...", "Yes, about 5 years ago"),
            ("What medication...", "I take lisinopril daily"),
            ("Is it controlled...", "Yes, my doctor says it's under control"),
        ]
        summary = await simulate_interview(responses)
        assert summary["status"] == "complete"

    async def test_complete_interview_no_path(self):
        """Simulate complete interview with No to BP diagnosis."""
        responses = [
            ("Have you been diagnosed...", "No, never had any issues"),
        ]
        summary = await simulate_interview(responses)
        assert len(summary["responses"]) == 1
```

---

## Task 5: Synthetic Data Tests

**Assignee**: Developer A
**Priority**: High
**Estimated Effort**: M (1 week)

### Description
Test with representative synthetic scenarios.

### Acceptance Criteria
- [ ] Create 10 synthetic test personas
- [ ] Test each persona through all 3 scenarios
- [ ] Record accuracy metrics
- [ ] Document failure cases
- [ ] Validate summary output

### File Locations
- Create: `/acs-voice-test/tests/data/synthetic_personas.json`
- Create: `/acs-voice-test/tests/integration/test_synthetic_scenarios.py`

### Synthetic Persona Example
```json
{
  "persona_id": "P001",
  "name": "Test User - Hypertension",
  "scenario": "blood_pressure",
  "responses": {
    "Q_BP_1": "Yes",
    "Q_BP_2": "lisinopril, 10mg daily",
    "Q_BP_3": "yes, well controlled"
  },
  "expected_outcome": "complete",
  "expected_flags": []
}
```

---

## Task 6: Latency Optimization

**Assignee**: Developer A
**Priority**: High
**Estimated Effort**: S (2-3 days)

### Description
Measure and reduce response latency.

### Acceptance Criteria
- [ ] Baseline latency measured
- [ ] Target: <500ms turn response time
- [ ] Identify bottlenecks
- [ ] Implement optimizations
- [ ] Re-measure and document improvements

### Metrics to Track
- Time from user speech end to AI response start
- WebSocket message round-trip time
- RAG query latency
- LLM response generation time

---

## Task 7: Prompt Refinement

**Assignee**: Developer B
**Priority**: High
**Estimated Effort**: M (1 week)

### Description
Iterate on prompts based on test results.

### Acceptance Criteria
- [ ] Analyze test failures
- [ ] Identify prompt improvement areas
- [ ] Update prompts for each scenario
- [ ] Re-run tests to validate improvements
- [ ] Document prompt evolution

---

## Task 8: Edge Case Handling

**Assignee**: Developer B
**Priority**: Medium
**Estimated Effort**: S (2-3 days)

### Description
Handle edge cases discovered during testing.

### Acceptance Criteria
- [ ] Handle empty/null responses
- [ ] Handle extremely long responses
- [ ] Handle background noise/unclear audio
- [ ] Handle repeated clarification failures
- [ ] Handle unexpected responses

---

## Task 9: Focus Group Workshops

**Assignee**: Both Developers
**Priority**: High
**Estimated Effort**: S (per workshop)

### Description
Conduct stakeholder workshops as specified in SOW.

### Workshop 1: Business Stakeholders
- Date: Week 5
- Attendees: Lauren, Dustin Dew, business team
- Purpose: Gather feedback on conversation flow
- Deliverable: Feedback summary document

### Workshop 2: Technical Stakeholders
- Date: Week 6
- Attendees: Heath Jackson, tech team
- Purpose: Review architecture and scalability
- Deliverable: Technical feedback document

---

## Sync Points

- **Daily**: Test results review
- **Mid-Phase**: Workshop preparation
- **End of Phase**: Final test report

## Definition of Done

- [ ] 80%+ unit test coverage
- [ ] All integration tests passing
- [ ] Synthetic scenarios validated
- [ ] Latency targets met
- [ ] Prompts refined based on feedback
- [ ] Edge cases handled
- [ ] Workshops completed
- [ ] Test report documented
