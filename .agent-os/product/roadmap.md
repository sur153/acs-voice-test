# Product Roadmap

## Phase 0: Foundation (Completed)

**Goal:** Establish basic voice agent infrastructure
**Status:** Completed

### Features

- [x] Azure Voice Live API integration - Basic WebSocket streaming `S`
- [x] ACS phone call handling - Answer incoming calls `S`
- [x] Web client for testing - Browser-based mic/speaker `S`
- [x] Basic session configuration - VAD, noise suppression `XS`
- [x] Project structure setup - Quart app, Docker config `S`

### Dependencies
- Azure subscription with ACS and OpenAI resources

---

## Phase 1: Questionnaire Engine (Week 1-2)

**Goal:** Implement structured questionnaire flow with branching logic
**Success Criteria:** Agent navigates 20 questions across 3 medical scenarios

### Features

- [ ] Expand QuestionList.json - Add Blood Pressure scenario questions `M`
- [ ] Expand QuestionList.json - Add Diabetes scenario questions `M`
- [ ] Expand QuestionList.json - Add Cardiovascular scenario questions `M`
- [ ] Question flow engine - Navigate questions based on responses `L`
- [ ] Branching logic handler - Conditional question routing `L`
- [ ] Session state manager - Track interview progress `M`
- [ ] Response validation - Basic input validation `S`

### Dependencies
- TeleLife Guide document analysis
- SME validation of decision trees (Lauren walkthrough Jan 5th)

---

## Phase 2: Intelligence Layer (Week 3-4)

**Goal:** Add AI capabilities for natural conversation and response handling
**Success Criteria:** Agent handles ambiguous responses and generates summaries

### Features

- [ ] RAG service setup - Index questionnaire in Azure Search `L`
- [ ] Prompt engineering - Optimize system prompts for each scenario `M`
- [ ] Ambiguity handling - Probe for unclear medical terminology `M`
- [ ] Response capture - Structured data extraction from transcripts `M`
- [ ] Summary generation - Produce interview records `M`
- [ ] Error recovery - Handle interruptions and reconnections `S`

### Dependencies
- Phase 1 questionnaire engine completion
- Azure Search index provisioned

---

## Phase 3: Testing & Refinement (Week 5-6)

**Goal:** Validate accuracy and optimize performance
**Success Criteria:** All test scenarios pass with acceptable latency

### Features

- [ ] Unit tests - Question flow and branching logic `M`
- [ ] Integration tests - End-to-end conversation flows `L`
- [ ] Synthetic data tests - Validate with representative scenarios `M`
- [ ] Latency optimization - Reduce response time `S`
- [ ] Prompt refinement - Iterate based on test results `M`
- [ ] Error handling - Edge cases and failure modes `S`

### Dependencies
- Phase 2 intelligence layer completion
- Synthetic test data generation

---

## Phase 4: Demo & Documentation (Week 7-8)

**Goal:** Prepare executive demonstration and scale recommendations
**Success Criteria:** Successful stakeholder demo, executive summary delivered

### Features

- [ ] Demo environment setup - Stable production-like config `M`
- [ ] Demo script preparation - Rehearsed scenarios `S`
- [ ] Executive summary document - Up to 25 pages `L`
- [ ] Lessons learned documentation - Technical insights `S`
- [ ] Scale recommendations - Requirements for full deployment `M`
- [ ] Architecture documentation - Diagrams and specs `M`

### Dependencies
- Phase 3 testing completion
- Stakeholder availability for demo

---

## Future Scope (Post-POC)

- Integration with Protective production systems
- Full TeleLife questionnaire (5,000 questions)
- Multi-language support
- Custom branded voices
- Agent-assist dashboard
- Real customer data handling
- Production-grade observability
