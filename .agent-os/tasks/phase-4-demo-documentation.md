# Phase 4: Demo & Documentation Tasks

> **Context**: @.agent-os/product/mission-lite.md | @.agent-os/product/tech-stack.md
> **Duration**: Weeks 7-8 (Jan 28 - Feb 11, 2026)
> **Goal**: Prepare executive demonstration and scale recommendations
> **Depends On**: Phase 3 completion

---

## Developer Assignment

| Task Group | Developer A | Developer B |
|------------|-------------|-------------|
| Demo Environment | ✅ Primary | Support |
| Documentation | Support | ✅ Primary |
| Demo Execution | Both | Both |

---

## Task 1: Demo Environment Setup

**Assignee**: Developer A
**Priority**: Critical
**Estimated Effort**: M (1 week)

### Description
Create stable demo environment for stakeholder presentations.

### Acceptance Criteria
- [ ] Dedicated Azure resources for demo
- [ ] Stable phone number for calling
- [ ] Web client fallback ready
- [ ] Environment isolated from development
- [ ] Backup and recovery plan

### Environment Checklist
- [ ] Azure Communication Services phone number
- [ ] Voice Live API endpoint (production-ready)
- [ ] Azure Search index populated
- [ ] All secrets in Key Vault
- [ ] Monitoring and logging enabled

---

## Task 2: Demo Script Preparation

**Assignee**: Developer B
**Priority**: High
**Estimated Effort**: S (2-3 days)

### Description
Create rehearsed demo scripts for each scenario.

### Acceptance Criteria
- [ ] Blood Pressure scenario script (3-5 minutes)
- [ ] Diabetes scenario script (3-5 minutes)
- [ ] Cardiovascular scenario script (3-5 minutes)
- [ ] Ambiguity handling demonstration
- [ ] Error recovery demonstration
- [ ] Rehearsed with team

### Demo Script Template
```markdown
## Blood Pressure Demo Script

**Duration**: 4 minutes

### Setup
- Open web client on projector
- Have phone ready as backup

### Script
1. "Let me show you how the AI handles a common scenario - blood pressure screening."
2. Click Start
3. AI: "Hello, thank you for calling. I'll be asking you some health questions..."
4. User: "Sure, go ahead."
5. AI: "Have you ever been diagnosed with high blood pressure?"
6. User: "Yes, about 3 years ago."
7. AI: "I understand. What medication are you currently taking?"
8. User: "I take some small blue pill... I think it starts with an L?"
9. [Demo ambiguity handling]
10. AI: "Could you tell me more? Common blood pressure medications include lisinopril, losartan..."
11. User: "Oh yes, lisinopril!"
...
```

---

## Task 3: Executive Summary Document

**Assignee**: Developer B
**Priority**: Critical
**Estimated Effort**: L (2 weeks)

### Description
Create 25-page executive summary document per SOW requirements.

### Document Outline
1. Executive Summary (2 pages)
2. POC Overview (3 pages)
3. Technical Architecture (4 pages)
4. Results & Metrics (4 pages)
5. Lessons Learned (3 pages)
6. Scalability Assessment (3 pages)
7. Recommended Next Steps (3 pages)
8. Appendices (3 pages)

### Acceptance Criteria
- [ ] All sections complete
- [ ] Results data accurate
- [ ] Clear visualizations/diagrams
- [ ] Recommendations actionable
- [ ] Reviewed by Capgemini leadership
- [ ] Formatted professionally

### File Location
- Create: `/docs/executive-summary/TeleLife_POC_Executive_Summary.docx`

---

## Task 4: Technical Architecture Documentation

**Assignee**: Developer A
**Priority**: High
**Estimated Effort**: M (1 week)

### Description
Document technical architecture for future reference.

### Acceptance Criteria
- [ ] System architecture diagram
- [ ] Component interaction diagram
- [ ] Data flow diagram
- [ ] API documentation
- [ ] Configuration guide
- [ ] Deployment guide

### File Locations
- Create: `/docs/architecture/system-architecture.md`
- Create: `/docs/architecture/component-diagram.png`
- Create: `/docs/architecture/data-flow.md`

---

## Task 5: Lessons Learned Documentation

**Assignee**: Developer B
**Priority**: High
**Estimated Effort**: S (2-3 days)

### Description
Document technical and process learnings from POC.

### Topics to Cover
- What worked well
- What didn't work well
- Technical challenges encountered
- Prompt engineering insights
- Performance observations
- Integration considerations

### File Location
- Create: `/docs/lessons-learned.md`

---

## Task 6: Scale Recommendations

**Assignee**: Developer A
**Priority**: High
**Estimated Effort**: M (1 week)

### Description
Document requirements for full-scale deployment.

### Topics to Cover
- Infrastructure requirements
- Cost estimates for scale
- Integration requirements (Protective systems)
- Data handling considerations
- Compliance requirements
- Timeline estimates
- Team requirements

### File Location
- Create: `/docs/scale-recommendations.md`

---

## Task 7: Demo Rehearsal

**Assignee**: Both Developers
**Priority**: High
**Estimated Effort**: S (per rehearsal)

### Description
Rehearse demo multiple times before stakeholder presentation.

### Rehearsal Schedule
- Week 7 Day 1: Internal team rehearsal
- Week 7 Day 3: Capgemini leadership review
- Week 8 Day 1: Final dress rehearsal
- Week 8 Day 2-3: Stakeholder demos

### Acceptance Criteria
- [ ] All scenarios demonstrated without issues
- [ ] Backup plans for failures tested
- [ ] Q&A responses prepared
- [ ] Timing within allocation

---

## Task 8: Final Demo Execution

**Assignee**: Both Developers
**Priority**: Critical
**Estimated Effort**: S (per demo)

### Description
Execute demos for Protective stakeholders.

### Demo Sessions
1. **First PoC Iteration Shareout** (End of Sprint 3)
   - Attendees: Core working team
   - Duration: 30-45 minutes
   - Focus: Technical demonstration

2. **Final Demo & Executive Summary Shareout** (End of Sprint 4)
   - Attendees: Extended stakeholder group
   - Duration: 60-90 minutes
   - Focus: Results, recommendations, next steps

### Deliverables Per Demo
- [ ] Demo recording
- [ ] Presentation slides
- [ ] Feedback capture form
- [ ] Follow-up action items

---

## Task 9: Handoff Documentation

**Assignee**: Developer A
**Priority**: Medium
**Estimated Effort**: S (2-3 days)

### Description
Prepare documentation for potential handoff to Protective team.

### Acceptance Criteria
- [ ] README with setup instructions
- [ ] Environment configuration guide
- [ ] Troubleshooting guide
- [ ] Known issues document
- [ ] Contact information for support

---

## Task 10: Completion Notification

**Assignee**: Project Lead
**Priority**: Low
**Estimated Effort**: XS (1 day)

### Description
Notify stakeholders of POC completion and next steps.

### Deliverables
- [ ] Completion email sent
- [ ] All documentation delivered
- [ ] Code repository access provided
- [ ] Demo recordings shared
- [ ] Next steps meeting scheduled

---

## Sync Points

- **Daily**: Demo prep check-ins
- **Week 7 End**: Rehearsal review
- **Week 8 Mid**: Post-demo retrospective
- **Week 8 End**: Final handoff meeting

## Definition of Done

- [ ] Demo environment stable
- [ ] All demos executed successfully
- [ ] Executive summary delivered
- [ ] All documentation complete
- [ ] Stakeholder feedback captured
- [ ] Recommendations presented
- [ ] Next steps agreed
- [ ] Project closure complete
