# Protective Life Voice Agent - Project Context & Progress

**Last Updated:** January 8, 2026 (Phase 1 Complete)
**Status:** Phase 1 Implementation Complete - Awaiting Deployment & Testing
**Client:** Protective Life Insurance
**Backup Location:** `acs-agent/backup_20260108_074611/`

---

## Project Overview

### Purpose
Voice-based insurance qualification assistant that conducts phone interviews to assess customer eligibility for insurance policies. The agent asks health, employment, lifestyle, and medical questions following a structured questionnaire.

### Technology Stack
- **Platform:** Azure AI Foundry (AI Studio)
- **Agent Type:** Prompt Agent with MCP (Model Context Protocol) tools
- **Model:** Azure AI Model (deployment name from environment)
- **Voice Interface:** Azure Communication Services (ACS) for real-time voice
- **Data Storage:** Cosmos DB via MCP tool
- **Question Database:** QuestionListComprehensive.json (vector store + file search)

### Agent Identity
- **Name:** Sarah
- **Role:** Insurance Qualification Assistant for Protective Life
- **Tone:** Professional yet warm, empathetic, patient, trustworthy

---

## Repository Structure

```
ProtectiveTeleLife/
├── acs-agent/                          # Main agent implementation
│   ├── agent.py                        # Agent creation script (Azure AI Projects)
│   ├── agent_v1.py                     # Alternative agent version
│   ├── QuestionListComprehensive.json  # Complete question database (614 questions)
│   ├── REVISED_AGENT_INSTRUCTIONS.md   # Comprehensive behavioral instructions (815 lines)
│   └── AGENT_INSTRUCTIONS_CONDENSED.txt # Condensed reference (for quick lookup)
│
├── acs-voice-test/                     # Voice interface testing
│   └── app/handler/acs_media_handler.py # Media handling logic
│
└── .agent-os/
    └── context/
        ├── Persona.md                  # Client-provided scripts and branding
        ├── questions.md                # Question design notes
        └── Agent_Instructions_Review_and_Improvements.md # Initial analysis (12 improvements)
```

---

## Critical Files & Their Purposes

### 1. `acs-agent/QuestionListComprehensive.json` ⭐
**Purpose:** Complete question database with 614+ questions
**Structure:**
```json
{
  "meta": {
    "version": "2.0",
    "sections": ["personal", "employment", "health_history", "family_history", "medical"]
  },
  "scripts": {
    "greeting": "Thank you for choosing Protective Life...",
    "greeting_continuation": "During this phone call...",
    "risk_assessment_intro": "Next we will be going through...",
    "medical_intro": "Now we will go through..."
  },
  "Q1": { ... },
  "Q2": { ... }
}
```

**Question Node Structure:**
```json
{
  "id": "Q32_RECENT",
  "field_name": "Present Tobacco Use",
  "text": "Present Tobacco Use",                    // Form field label
  "conversational": "Do you presently use...",    // What agent should say
  "type": "yesno",                                // text, choice, yesno, date, number, email
  "choices": [...],                               // For choice/multi types
  "meta": {
    "section": "health_history",
    "section_start": false,
    "transition": null,
    "sensitive": false,
    "acknowledgment": null,
    "context_reference": "You mentioned...",      // Additional context to speak
    "requires_spelling": false,
    "parent": "Q31",                              // FOR DOCUMENTATION ONLY
    "depth": 1,                                   // FOR DOCUMENTATION ONLY
    "script_before": "greeting"                   // Script key to speak first
  },
  "next": "Q33_RECENT_NO"                        // Linear (string) navigation
  // OR
  "next": {                                       // Branching (object) navigation
    "Yes": "Q33_RECENT_YES",
    "No": "Q33_RECENT_NO"
  }
}
```

### 2. `acs-agent/agent.py` ⭐
**Purpose:** Creates and deploys the agent to Azure AI Foundry
**Key Sections:**
- Lines 74-222: Agent instructions (embedded in code)
- Lines 48-52: MCP tool configuration (Cosmos DB)
- Lines 54-66: Vector store setup (for file search)

**Deployment Method:**
```bash
cd "acs-agent"
python agent.py
```
Creates new agent version: `my-voic-agent-poc-conversational`

### 3. `acs-agent/REVISED_AGENT_INSTRUCTIONS.md` ⭐
**Purpose:** Comprehensive behavioral guide (815 lines)
**Key Sections:**
- Lines 28-38: Agent Identity & Core Principles
- Lines 61-104: CRITICAL Question Execution Flow (13-step sequence)
- Lines 112-143: Client Scripts (TIER 1 - Sacred)
- Lines 145-190: Speech Normalization Rules
- Lines 192-267: Answer Confirmation (6+ variations)
- Lines 269-308: Empathetic Acknowledgment
- Lines 310-355: Validation Rules
- Lines 357-410: Error Messages (User-Friendly)
- Lines 433-504: BRANCHING LOGIC (most critical section)
- Lines 506-544: Context-Aware Questioning
- Lines 546-600: Intelligent Spelling
- Lines 602-642: Silence Handling
- Lines 644-709: Final Summary & Closing

### 4. `.agent-os/context/Persona.md` (Client-Provided)
**Purpose:** Client-approved scripts and branding
**Critical Content:**
- Protective Life branding requirements
- Official greeting scripts
- Field definitions for underwriting

### 5. `.agent-os/context/questions.md`
**Purpose:** Question design notes and categorization

---

## Agent Behavior Architecture

### Question Execution Flow (13 Steps)

**The agent MUST follow this exact sequence for EVERY question:**

```
1. LOAD question node from JSON via tool call
2. CHECK node.meta.script_before → If exists, speak client script verbatim
3. CHECK node.meta.context_reference → If exists, speak before question
4. ASK question using node.conversational (NOT node.text)
5. RECEIVE user's spoken answer
6. NORMALIZE answer (clean up speech, apply formatting)
7. CONFIRM answer with user (rotate through 6+ confirmation phrases)
8. WAIT for user's Yes/No response
9. IF user says "No" → GOTO step 4 (re-ask)
10. IF user says "Yes" → CONTINUE to validation
11. VALIDATE normalized answer against node.type rules
12. IF validation FAILS → Show friendly error, GOTO step 4 (re-ask)
13. IF validation SUCCEEDS:
    a. STORE answer: answers[node.field_name] = normalized_value
    b. CHECK if node.meta.sensitive → If true, speak acknowledgment
    c. DETERMINE next question ID:
       - IF node.next is STRING → next_id = node.next
       - IF node.next is OBJECT → next_id = node.next[normalized_answer]
    d. IF next_id == "END" → GOTO final summary
    e. ELSE → LOAD question with next_id (GOTO step 1)
```

### Instruction Hierarchy

**TIER 1: CLIENT-PROVIDED SCRIPTS** (Sacred - Never Modify)
- Retrieved from `scripts` section in JSON
- Spoken verbatim, no paraphrasing
- Used when `node.meta.script_before` exists

**TIER 2: BEHAVIORAL ENHANCEMENTS** (Natural Conversation)
- Varied confirmation phrases (anti-robotic)
- Empathetic acknowledgments
- User-friendly error messages

**TIER 3: INTELLIGENT PROCESSING** (Behind the Scenes)
- Smart spelling logic
- Speech normalization
- Context awareness

---

## Issues Fixed During Development

### Issue 1: Instructions Too Generic (December 2025)
**Problem:** Original instructions didn't use client branding or scripts
**Solution:** Integrated Persona.md and QuestionListComprehensive.json
**Files Modified:** All instruction files

### Issue 2: Instructions Were Prescriptive Not Behavioral (Major Issue)
**Problem:** Instructions listed specific questions instead of defining behavior
**User Feedback:** "You put everything in the instructions even asking the questions... but our application question is driven by JSON"
**Solution:** Complete rewrite - separated WHAT (JSON) from HOW (instructions)
**Impact:** Reduced from 1,262 to 782 lines

### Issue 3: General Branching Logic Bug (Fixed)
**Problem:** Agent stopping after validation without loading node.next
**Affected Paths:**
- ✅ Retired path (Q17-Q20) - Fixed
- ❌ Tobacco path - Still had issues
- ✅ Alcohol path - Fixed

**Solution:** Added step 13.e to execution flow:
```
e. ELSE → LOAD question with next_id (GOTO step 1)
```

### Issue 4: Yesno Branching Assumption Bug (Fixed)
**Problem:** Agent assumed ALL yesno types have linear next (string), never checking for branching (object)
**Root Cause:** Q32_RECENT is the ONLY yesno question with branching next in entire JSON
**Affected Path:** Q32_RECENT (tobacco) → Q33_RECENT_NO (being skipped)

**Solution:** Added explicit instruction in BRANCHING LOGIC section:
```
**YESNO TYPE CAN BRANCH:**
Q32_RECENT is type=yesno with BRANCHING next:
- User answers "No"
- Normalize to "No" (capital N)
- Check if node.next is OBJECT
- IF OBJECT: Look up node.next["No"] → "Q33_RECENT_NO"
- Load Q33_RECENT_NO immediately

**NEVER assume yesno means linear next. ALWAYS check if node.next is object first.**
```

**Status:** ✅ Fixed - Q33_RECENT_NO now being asked

### Issue 5: Depth/Parent Metadata Navigation Bug (Current - In Progress)
**Problem:** Agent stopping after first follow-up in branched path
**Observed Behavior:**
- Q32_RECENT → "No" → Q33_RECENT_NO ✅ (being asked)
- Q33_RECENT_NO → Q34_RECENT_NO ❌ (being skipped - jumps to Q46)

**Root Cause:** Agent making navigation decisions based on `parent` and `depth` metadata instead of ONLY using `node.next`

**Analysis:**
- Q33_RECENT_NO has `parent: "Q32_RECENT"`, `depth: 2`, `next: "Q34_RECENT_NO"`
- Q34_RECENT_NO has `parent: "Q32_RECENT"`, `depth: 2`, `next: "Q46"`
- Agent sees depth=2 and thinks "I came from a branch, asked one follow-up, time to return"
- Agent ignores `node.next` value

**Solution Added (Awaiting Deployment):**
```
**IGNORE DEPTH AND PARENT METADATA:**
- Q33_RECENT_NO has parent="Q32_RECENT", depth=2, next="Q34_RECENT_NO"
- After asking Q33_RECENT_NO and validating answer, you MUST load Q34_RECENT_NO from node.next
- Do NOT return to main flow just because you came from a branch
- Do NOT skip questions based on depth or parent metadata
- ONLY use node.next to determine next question
- Continue following node.next until you reach "END"
- Example: Q32_RECENT → Q33_RECENT_NO → Q34_RECENT_NO → Q46 (ALL questions must be asked)
```

**Files Modified:**
- ✅ `acs-agent/agent.py` (lines 103-110)
- ✅ `acs-agent/REVISED_AGENT_INSTRUCTIONS.md` (lines 90-103)

**Next Step:** User needs to update Azure AI Foundry with new instructions

### Issue 6: Architecture Improvement - Phase 1 (Implemented Jan 8, 2026)

**Problem:** LLM handling all branching logic through 300+ lines of instructions caused non-deterministic behavior and multiple bugs.

**Analysis:**
- LLM misinterprets complex conditional rules
- Hard to debug - requires testing every question path
- Every bug requires instruction updates and redeployment
- Root cause: All navigation logic lives in LLM instructions, not deterministic code

**Strategy Chosen:**
- **Phase 1 (Short-term):** Improve LLM-based approach with guardrails - implemented
- **Phase 2 (Long-term):** State Machine in MCP Server - awaiting MCP access

**Phase 1 Solution (Implemented):**

1. **Removed confusing metadata from JSON:**
   - Removed `parent` and `depth` fields from 64 question nodes
   - These fields caused LLM to make wrong navigation decisions

2. **Condensed instructions (170+ lines → 110 lines):**
   - Clearer 4-step navigation algorithm (Steps A, B, C, D)
   - Explicit branching examples with critical paths
   - Maintained Sarah's warm, human-like persona
   - Removed all depth/parent references

3. **Added explicit critical path examples:**
   ```
   Path 1: Q16 → "Retired" → Q17_RETIRED → Q18_RETIRED → Q19_RETIRED → Q20_RETIRED → Q31
   Path 2: Q32_RECENT → "No" → Q33_RECENT_NO → Q34_RECENT_NO → Q46
   Path 3: Q46 → "Within the last year" → Q47_YEAR → Q48_YEAR → Q49_YEAR → Q50_YEAR → Q51_YEAR → END
   ```

**Files Modified:**
- ✅ `acs-agent/QuestionListComprehensive.json` (removed parent/depth from 64 nodes)
- ✅ `acs-agent/agent.py` (new condensed instructions ~110 lines)
- ✅ `acs-agent/AGENT_INSTRUCTIONS_CONDENSED.txt` (updated reference)
- ✅ `acs-agent/AGENT_INSTRUCTIONS_V2.txt` (new backup)

**Backup Created:**
```
/acs-agent/backup_20260108_074611/
├── agent.py
├── QuestionListComprehensive.json
├── AGENT_INSTRUCTIONS_CONDENSED.txt
└── REVISED_AGENT_INSTRUCTIONS.md
```

**Rollback Command (if needed):**
```bash
cp "/Users/user/Python Projects/ProtectiveTeleLife/acs-agent/backup_20260108_074611/"* "/Users/user/Python Projects/ProtectiveTeleLife/acs-agent/"
```

**Status:** ✅ Implementation complete, awaiting deployment and testing

---

## Phase 2 Plan (Future - When MCP Access Obtained)

### Architecture Change
```
Current:  LLM ─(reads JSON)─> decides next question
Future:   LLM ─(calls tool)─> MCP Server ─(returns)─> next question
```

### New MCP Tools to Create
- `get_current_question(session_id)` → returns question node
- `submit_answer(session_id, question_id, answer)` → returns next question or "END"

### Benefits
- Deterministic navigation (code, not LLM interpretation)
- Unit testable
- Session state in Cosmos DB
- Simpler LLM instructions (just ask and normalize)

### Prerequisites
- User needs to obtain MCP server access first
- Current MCP server only handles Cosmos DB writes

---

## Critical Branching Paths (Test Cases)

### Test Path 1: Retired Employment ✅ (Working)
```
Q16: "What is your employment status?"
Answer: "Retired"

Expected Flow:
Q16 → Q17_RETIRED → Q18_RETIRED → Q19_RETIRED → Q20_RETIRED → Q31

JSON Structure:
Q16.next = {"Retired": "Q17_RETIRED", ...}  // Branching
Q17_RETIRED.next = "Q18_RETIRED"            // Linear
Q18_RETIRED.next = "Q19_RETIRED"            // Linear
Q19_RETIRED.next = "Q20_RETIRED"            // Linear
Q20_RETIRED.next = "Q31"                    // Linear
```

### Test Path 2: Tobacco "No" Path ⚠️ (Partially Fixed)
```
Q31: "When did you last use tobacco or nicotine products?"
Answer: "More than a month ago but within the past year"

Q32_RECENT: "Do you presently use tobacco or nicotine products?"
Answer: "No"

Expected Flow:
Q31 → Q32_RECENT → Q33_RECENT_NO → Q34_RECENT_NO → Q46

Current Status:
Q31 → Q32_RECENT → Q33_RECENT_NO ✅ → [SKIPS Q34_RECENT_NO] ❌ → Q46

JSON Structure:
Q31.next = {"More than a month ago but within the past year": "Q32_RECENT", ...}  // Branching
Q32_RECENT.next = {"Yes": "Q33_RECENT_YES", "No": "Q33_RECENT_NO"}                // Branching (yesno)
Q33_RECENT_NO.next = "Q34_RECENT_NO"                                              // Linear
Q34_RECENT_NO.next = "Q46"                                                        // Linear

Metadata Analysis:
Q32_RECENT: parent=null, depth=0
Q33_RECENT_NO: parent="Q32_RECENT", depth=2  ← Agent sees this and stops
Q34_RECENT_NO: parent="Q32_RECENT", depth=2  ← Never loads this
```

### Test Path 3: Alcohol "Within Last Year" Path ✅ (Working)
```
Q46: "When did you last drink alcohol?"
Answer: "Within the last year"

Expected Flow:
Q46 → Q47_YEAR → Q48_YEAR → Q49_YEAR → Q50_YEAR → Q51_YEAR → END

JSON Structure:
Q46.next = {"Within the last year": "Q47_YEAR", ...}  // Branching
Q47_YEAR.next = "Q48_YEAR"                             // Linear
Q48_YEAR.next = "Q49_YEAR"                             // Linear
Q49_YEAR.next = "Q50_YEAR"                             // Linear
Q50_YEAR.next = "Q51_YEAR"                             // Linear
Q51_YEAR.next = "END"                                  // End
```

---

## Key Learnings & Patterns

### 1. JSON Structure Patterns

**Linear Navigation (90% of questions):**
```json
"Q2": {
  "next": "Q3"  // String → Simple progression
}
```

**Branching Navigation (10% of questions):**
```json
"Q16": {
  "type": "choice",
  "next": {
    "Retired": "Q17_RETIRED",
    "Unemployed": "Q17_UNEMP",
    "Disabled": "Q17_DISABLED",
    "Actively Employed": "Q17_EMPLOYED"
  }
}
```

**Unique Case - Yesno Branching (ONLY Q32_RECENT):**
```json
"Q32_RECENT": {
  "type": "yesno",              // ← Most yesno have linear next
  "next": {                      // ← This one branches!
    "Yes": "Q33_RECENT_YES",
    "No": "Q33_RECENT_NO"
  }
}
```

### 2. Metadata Fields

**Navigation-Critical:**
- `id`: Question identifier (Q1, Q2, Q32_RECENT, etc.)
- `conversational`: What agent speaks (USE THIS)
- `type`: Question type (affects validation)
- `next`: Next question (string or object)

**Behavioral Hints:**
- `meta.script_before`: Script key to speak first
- `meta.context_reference`: Additional context to provide
- `meta.sensitive`: Trigger empathetic acknowledgment
- `meta.requires_spelling`: Request letter-by-letter input

**Documentation Only (DO NOT USE FOR NAVIGATION):**
- `meta.parent`: Parent question ID (for reference)
- `meta.depth`: Branch depth level (for reference)
- `meta.section`: Question category (for organization)

### 3. Speech Normalization Patterns

**Yes/No Normalization:**
```
Input: "yes", "yeah", "yup", "yep", "sure", "okay"
Output: "Yes"

Input: "no", "nope", "nah", "not really"
Output: "No"
```

**Date Normalization:**
```
Input: "March fifteenth nineteen eighty-five"
Output: "03/15/1985"
```

**SSN Normalization:**
```
Input: "one two three four five six seven eight nine"
Output: "123-45-6789"
```

**Email Normalization:**
```
Input: "john at gmail dot com"
Output: "john@gmail.com"
```

### 4. Confirmation Phrase Rotation

**Anti-Robotic Pattern:** Rotate through 6+ variations to avoid repetition

```
1. "So that's <value>, is that right?"
2. "I've got <value>, does that sound correct?"
3. "Just to confirm, you said <value>?"
4. "Did I understand that correctly as <value>?"
5. "Let me make sure: <value>?"
6. "I heard <value>, is that accurate?"
```

**Track Last 3 Used:** Never repeat same phrase twice in a row

### 5. Error Message Framework

**User-Friendly Approach:**
1. Acknowledge attempt (positive)
2. Explain issue (helpful)
3. Provide guidance (actionable)
4. Re-ask (supportive)

**Example:**
```
❌ Bad: "Invalid date format"
✅ Good: "I need that date in month, day, year format. For example, 'March 15th, 1985'."
```

---

## Deployment Process

### Manual Deployment (Used by User)

1. **Navigate to Azure AI Foundry** (portal.azure.com)
2. **Find the agent** (my-voic-agent-poc-conversational)
3. **Edit Instructions** in the agent configuration
4. **Copy sections** from updated instruction files:
   - CRITICAL: Question Execution Flow
   - IGNORE DEPTH AND PARENT METADATA
   - BRANCHING LOGIC
   - All other behavioral sections
5. **Save and Deploy**
6. **Test** the three critical paths

### Automated Deployment (Not Currently Used)

```bash
cd "/Users/user/Python Projects/ProtectiveTeleLife/acs-agent"
python agent.py
```

Creates new agent version with instructions from lines 74-222 in agent.py

**Note:** User prefers manual updates in Azure portal for easier iteration

---

## Current Status & Next Steps

### ✅ Completed

1. Initial instruction review and 12 improvement areas identified
2. Complete rewrite: Separated JSON (WHAT) from instructions (HOW)
3. Integrated client scripts and Protective Life branding
4. Fixed general branching logic (step 13.e)
5. Fixed yesno branching assumption bug
6. Added depth/parent metadata ignore instructions
7. **Phase 1 Architecture Improvement (Jan 8, 2026):**
   - Removed parent/depth metadata from 64 JSON nodes
   - Condensed instructions from 170+ to 110 lines
   - Added explicit critical path examples
   - Created backup for rollback capability

### ⚠️ Awaiting Deployment

**Phase 1 Changes Ready:**
- All code changes complete ✅
- Backup created at `backup_20260108_074611/` ✅
- User needs to deploy to Azure AI Foundry ⏳

**Deployment Options:**
1. **Python script:** `python agent.py` (recreates agent)
2. **Manual update:** Copy from `AGENT_INSTRUCTIONS_CONDENSED.txt` + re-upload JSON

**Important:** JSON file changed - must re-upload to vector store!

### 🔄 Testing Required

After deployment, test all three critical paths:
1. ⏳ Retired: Q16 → Q17_RETIRED → Q18 → Q19 → Q20 → Q31
2. ⏳ Tobacco "No": Q31 → Q32_RECENT → Q33_RECENT_NO → Q34_RECENT_NO → Q46
3. ⏳ Alcohol: Q46 → Q47_YEAR → Q48 → Q49 → Q50 → Q51 → END

### 🎯 Success Criteria for Phase 1

- [ ] All 3 critical paths pass testing
- [ ] No branching bugs for 5 consecutive test runs
- [ ] Sarah persona remains warm and human-like
- [ ] Instructions under 150 lines (currently ~110)

### 📋 Future Enhancements

1. **Voice Activity Detection (VAD) Tuning**
   - Adjust silence thresholds
   - Improve interruption handling
   - Balance response timing

2. **Additional Test Coverage**
   - Test all branching paths (employment, tobacco, alcohol)
   - Verify retry logic (max 3 attempts)
   - Test silence handling (3 strikes)
   - Validate error message UX

3. **Performance Optimization**
   - Reduce latency in question loading
   - Optimize vector store queries
   - Improve TTS/STT timing

4. **Monitoring & Analytics**
   - Track question completion rates
   - Identify common retry patterns
   - Measure user satisfaction

---

## Important Reminders for Future Sessions

### 🔴 Critical Don'ts

1. **NEVER hardcode questions** - Always load from JSON
2. **NEVER modify client scripts** - Use verbatim from JSON
3. **NEVER use depth/parent for navigation** - Only use node.next
4. **NEVER assume yesno means linear** - Check if next is object
5. **NEVER validate before confirming** - Confirmation first, then validation
6. **NEVER repeat confirmation phrases** - Rotate through 6+ variations
7. **NEVER use punitive language** - "Invalid" → "I need that in a different format"

### ✅ Always Remember

1. **node.conversational** is what to speak (NOT node.text)
2. **node.next** determines navigation (string = linear, object = branching)
3. **Step 13.e** must ALWAYS load next question after validation
4. **Client scripts** are TIER 1 (sacred, never modify)
5. **Depth/parent** are documentation only (don't use for logic)
6. **User manually deploys** to Azure AI Foundry (not via python script)

### 🎯 Quick Reference: Where to Find Things

**Question Database:** `acs-agent/QuestionListComprehensive.json`
**Agent Instructions:** `acs-agent/REVISED_AGENT_INSTRUCTIONS.md`
**Agent Deployment:** `acs-agent/agent.py` (lines 74-222)
**Client Scripts:** `.agent-os/context/Persona.md`
**This Document:** `.agent-os/context/Project_Context_and_Progress.md`

---

## Contact & Resources

**Project Location:** `/Users/user/Python Projects/ProtectiveTeleLife`
**Client:** Protective Life Insurance
**Platform:** Azure AI Foundry
**Last Session:** January 8, 2026

---

**End of Context Document**

This document should be read at the start of any new session to understand the project state, issues fixed, and current work.
