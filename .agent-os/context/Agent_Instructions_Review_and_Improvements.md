# Insurance Voice Agent Instructions - Review & Improvement Recommendations

## Executive Summary

The current agent instructions provide a solid technical framework for a questionnaire-based voice bot. However, they lack the warmth, empathy, and conversational naturalness expected from an insurance agent conducting customer interviews. This document identifies critical improvement areas to transform the agent from a functional but robotic questionnaire system into an empathetic, professional insurance interviewer.

---

## Current Strengths

✅ **Technical Foundation:**
- Comprehensive question flow management
- Robust validation and normalization logic
- Clear branching and retry mechanisms
- Anti-loop guarantees
- Section management with context awareness

✅ **Safety Features:**
- Maximum retry limits
- Silence handling with escalation
- Data validation before storage
- Empathetic acknowledgment for sensitive topics (limited)

---

## Critical Improvement Areas

### 1. **Greeting & Introduction (HIGH PRIORITY)**

**Current State:**
```
"Hello! I'm here to help collect a few details from you."
```

**Problems:**
- Too generic and robotic
- Doesn't explain who they are or what this is for
- Doesn't set expectations about the process
- Misses opportunity to build trust and rapport

**Recommended Improvements:**

```markdown
GREETING PROTOCOL:
- Introduce as insurance assessment agent
- Explain purpose: "to help determine your policy eligibility"
- Set expectations: approximate time, question types
- Build trust: explain confidentiality and data security
- Offer to answer questions before starting
- Get explicit consent to proceed

EXAMPLE:
"Hello! I'm Alex, your insurance assessment agent. I'm here to help you with
the qualification process for your insurance policy. This will take about
10-15 minutes, and I'll be asking questions about your personal information,
employment, health history, and family medical background.

All information you provide is confidential and will only be used to assess
your eligibility for coverage. You can ask me to repeat any question, and
you can take your time answering.

Do you have any questions before we begin?"
```

**Implementation Notes:**
- Only ask "Do you have any questions?" if user hasn't already indicated readiness
- Have prepared answers for common questions (What will you do with my data? How long will this take?)
- Wait for user readiness signal before proceeding

---

### 2. **Conversational Naturalness & Reducing Repetition (HIGH PRIORITY)**

**Current State:**
- Every answer confirmation uses identical phrasing: "I understood your answer as <value>. Is that correct? Please say Yes or No."
- This becomes robotic and annoying after 20+ questions

**Problems:**
- Sounds like a broken record
- Destroys conversational flow
- Makes users feel like they're talking to a machine, not a person
- Reduces engagement and patience

**Recommended Improvements:**

```markdown
VARIED CONFIRMATION PHRASES:
Rotate through natural variations while maintaining clarity:

STANDARD CONFIRMATIONS:
- "Just to confirm, you said <value>, is that right?"
- "So that's <value>, correct?"
- "Let me make sure I have this right: <value>?"
- "I've got <value>, does that sound right?"
- "Did I understand you correctly as <value>?"

CASUAL/NATURAL (for non-critical fields):
- "Great, <value>. I've got that down."
- "Perfect, <value> it is."
- "Okay, <value>. Got it."
- "Alright, so <value>."

EMPATHETIC (for sensitive fields):
- "Thank you for sharing that. Just to confirm, <value>?"
- "I appreciate you telling me that. So that's <value>, correct?"

IMPLEMENTATION:
- Create confirmation_style categories: formal, casual, empathetic
- Map to question sensitivity (node.meta.sensitive)
- Randomly select from appropriate category
- Track last 3 confirmations to avoid immediate repeats
- For critical fields (DOB, email, phone), always use clear confirmation
```

---

### 3. **Empathy & Human Touch (HIGH PRIORITY)**

**Current State:**
- Empathetic acknowledgment only for questions marked as sensitive
- Limited to brief phrases after confirmation
- No emotional intelligence throughout the conversation

**Problems:**
- Feels transactional, not human
- Doesn't acknowledge user effort or discomfort
- Misses opportunities to build rapport
- Doesn't adapt to user emotional state

**Recommended Improvements:**

```markdown
EMPATHY FRAMEWORK:

A. ANTICIPATORY EMPATHY (Before difficult sections):
"I know these next questions about your medical history might be personal.
Please remember this information stays completely confidential and helps us
provide you with the best coverage options."

B. APPRECIATIVE EMPATHY (Acknowledging user effort):
- After multiple questions: "Thank you for your patience with these questions."
- Before complex sections: "I appreciate you taking the time to answer thoroughly."
- After sensitive answers: "Thank you for trusting me with that information."

C. VALIDATING EMPATHY (When user struggles):
- If retry needed: "That's okay, these details can be tricky. Let me ask that again."
- If user hesitates: "Take your time, there's no rush."
- If user unsure: "That's perfectly fine. We can come back to this if needed."

D. PROGRESSIVE EMPATHY (Showing progress):
- After completing sections: "Great! We're making good progress. Just a few more sections to go."
- Midway: "You're doing great. We're about halfway through."

TONE GUIDELINES:
- Professional but warm
- Patient and understanding
- Never judgmental
- Brief but genuine (avoid over-the-top emotion)
- Adapt to user responses (if user is brief, be efficient; if chatty, allow slight conversation)
```

---

### 4. **Insurance-Specific Context & Terminology (HIGH PRIORITY)**

**Current State:**
- Generic questionnaire agent
- No insurance domain knowledge
- Doesn't explain why questions matter

**Problems:**
- Users may not understand relevance of questions
- Misses opportunity to educate
- Doesn't build confidence in the process
- May lead to incomplete or inaccurate answers

**Recommended Improvements:**

```markdown
INSURANCE CONTEXT INTEGRATION:

A. EXPLAIN RELEVANCE (For complex/sensitive questions):
Example: "I need to ask about your family medical history because certain
hereditary conditions can affect coverage options and premiums."

Example: "Your employment status helps us determine the right coverage level
and payment schedule for you."

B. INSURANCE TERMINOLOGY:
- Avoid jargon when possible
- When using industry terms, briefly explain:
  "Premium (that's your monthly payment)"
  "Beneficiary (the person who would receive the benefit)"
  "Pre-existing condition (a health issue you had before applying)"

C. PRIVACY & COMPLIANCE:
- Explain HIPAA protections when collecting health data
- Mention how data security works
- Clarify what information is shared with whom

D. UNDERWRITING CONTEXT:
- Explain that answers help determine eligibility, not deny coverage
- Mention that honesty prevents issues later
- Clarify that some conditions may require additional review, not automatic denial

IMPLEMENTATION:
Add to node.meta:
- "relevance_explanation": Optional field with why this question matters
- "terminology": Key terms to explain in this question
- "reassurance": Privacy/security notes to mention
```

---

### 5. **Intelligent Spelling Requests (MEDIUM PRIORITY)**

**Current State:**
- For all text questions: "Please spell your answer letter by letter"
- Applied uniformly regardless of context

**Problems:**
- Annoying for simple names (John, Mary)
- Necessary for complex names (Xochitl, Siobhan)
- Overkill for city names
- Creates bad user experience

**Recommended Improvements:**

```markdown
SMART SPELLING PROTOCOL:

A. INITIAL CAPTURE (No spelling request):
- Accept spoken input
- Use speech-to-text as-is
- Normalize common variations

B. CONFIDENCE-BASED SPELLING:
If speech-to-text confidence is HIGH:
- Confirm without spelling: "I've got your first name as John, is that correct?"

If speech-to-text confidence is LOW or name is uncommon:
- Request spelling: "Just to make sure I have that exactly right, could you spell
  your last name for me?"

C. CONDITIONAL SPELLING:
Only request spelling for:
- Names (first, last, middle)
- City names if unclear
- Employer names if unclear
- Medical conditions if unclear

Never request spelling for:
- Numbers (phone, SSN, age)
- Dates
- Standard choices (Yes/No, state names)
- Email (already has format validation)

D. PHONETIC ALPHABET SUPPORT:
For difficult names:
"Would you like to use the phonetic alphabet? For example, A as in Alpha,
B as in Bravo?"

IMPLEMENTATION:
- Add confidence threshold to speech-to-text
- Maintain list of common names (don't require spelling)
- Maintain list of always-spell scenarios
- Allow user to offer spelling proactively
```

---

### 6. **Error Handling & Validation Messages (HIGH PRIORITY)**

**Current State:**
```
"That answer is invalid: <error>. Please try again."
```

**Problems:**
- Too technical and harsh
- Doesn't explain what went wrong
- Doesn't guide user to correct answer
- Sounds accusatory

**Recommended Improvements:**

```markdown
USER-FRIENDLY ERROR MESSAGES:

GENERAL FRAMEWORK:
1. Acknowledge the attempt (positive)
2. Explain what's wrong (helpful)
3. Provide example or guidance (actionable)
4. Re-ask with patience (supportive)

SPECIFIC ERROR TYPES:

EMAIL VALIDATION:
❌ "That answer is invalid: missing @ symbol. Please try again."
✅ "I didn't catch that as an email address. Please say it again, and remember
   to say 'at' for the @ symbol and 'dot' for periods. For example,
   john dot smith at gmail dot com."

DATE VALIDATION:
❌ "That answer is invalid: date format error. Please try again."
✅ "I need that date in a different format. Please say it as month, day, year.
   For example, March 15th, 1985."

NUMBER VALIDATION:
❌ "That answer is invalid: must be a number. Please try again."
✅ "I need that as a number. For example, you could say 35 or one hundred twenty."

CHOICE VALIDATION:
❌ "That answer is invalid: not a valid choice. Please try again."
✅ "I didn't catch that as one of the options. Your choices are: [list choices].
   Which one works best for you?"

MISSING VALUE:
❌ "That answer is invalid: required field. Please try again."
✅ "I'll need an answer for this one to continue. If you're not sure, I can
   help explain the question differently."

RETRY MESSAGES (Progressive patience):
1st retry: "Let me ask that again. <question>"
2nd retry: "No problem, let's try this once more. <question>"
3rd retry: "That's okay, these can be tricky. If you'd like, we can come back
            to this question. Should we continue with the next section?"

IMPLEMENTATION:
- Create error_message_templates for each validation type
- Include examples in error messages
- Progressive tone (more helpful with each retry)
- Offer help or skip options after 2+ failures
```

---

### 7. **Section Transitions & Progress Tracking (MEDIUM PRIORITY)**

**Current State:**
- Section transitions exist but feel mechanical
- No clear sense of progress
- User doesn't know how much longer the interview will take

**Problems:**
- Users lose patience without knowing progress
- Transitions feel abrupt
- No psychological motivation to continue

**Recommended Improvements:**

```markdown
PROGRESS & TRANSITION FRAMEWORK:

A. SECTION INTRODUCTIONS:
Structure:
1. Complete previous section
2. Acknowledge completion
3. Explain next section
4. Preview question types
5. Provide progress indicator

Example - Employment Section:
"Excellent, I have your personal information. Now let's talk about your employment
situation. This helps us understand your income stability for coverage purposes.
We're about 30% through the process."

Example - Health History:
"Thank you for that information. Now I need to ask about your health history.
I know these questions are personal, but they're essential for determining your
coverage options. This is the most detailed section, but we'll get through it
together."

B. PROGRESS INDICATORS:
- After each section completion: "Great! That's [X] out of [Y] sections complete."
- At 50% mark: "We're about halfway done. You're doing great."
- At 75% mark: "Almost there! Just one more section after this."

C. MICRO-PROGRESS (Within long sections):
For sections with 10+ questions:
"Just a few more questions about your family history..."
"Last couple of questions in this section..."

D. TRANSITION TECHNIQUES:
Soft transitions (related topics):
"Since we just talked about your employment, let me ask about your income..."

Hard transitions (unrelated topics):
"Now let's shift gears and talk about your health history."

Anticipatory transitions (before difficult sections):
"The next section asks about medical conditions. I know this can be sensitive,
but your honesty helps us provide the best coverage. Ready to continue?"

IMPLEMENTATION:
- Calculate total questions at start
- Track questions completed
- Provide percentage at section boundaries
- Add node.meta.progress_style: "percentage", "fraction", "descriptive"
```

---

### 8. **Silence & Timeout Handling (MEDIUM PRIORITY)**

**Current State:**
```
1st silence: "I didn't hear a response. Please answer the question."
2nd silence: "I still didn't catch that. Please say your answer now."
3rd silence: "It seems you're unavailable right now. We can continue later. Thank you."
```

**Problems:**
- Too mechanical and impatient
- Doesn't differentiate between thinking time and actual silence
- Doesn't offer help or alternatives
- Escalates too quickly

**Recommended Improvements:**

```markdown
INTELLIGENT SILENCE HANDLING:

A. SILENCE DIFFERENTIATION:
1. THINKING PAUSE (5-10 seconds after question):
   - Normal, especially for calculation/memory questions
   - Don't interrupt - this is expected processing time

2. EXTENDED SILENCE (15+ seconds):
   - May need clarification
   - May be distracted
   - May have audio issues

B. CONTEXT-AWARE RESPONSES:

For COMPLEX questions (calculations, dates, medical history):
1st silence (15 sec): "Take your time. I know that might require a moment to think about."
2nd silence (30 sec): "No rush at all. If you'd like me to rephrase the question or
                       come back to it, just let me know."
3rd silence (45 sec): "It seems like this might be a difficult question. Would you like
                       to skip it for now and come back later, or would you like me to
                       explain it differently?"

For SIMPLE questions (name, yes/no):
1st silence (10 sec): "I'm here when you're ready. Please go ahead with your answer."
2nd silence (20 sec): "I'm still listening. If you're having trouble hearing me,
                       please try saying 'repeat the question'."
3rd silence (30 sec): "I'm not hearing a response. This might be a connection issue.
                       Should we pause and reconnect later? Say 'yes' to pause or
                       'no' to continue."

C. OFFER HELP OPTIONS:
After silence, add:
"If you need me to:
- Repeat the question, say 'repeat'
- Rephrase it, say 'rephrase'
- Skip this question, say 'skip'
- Take a break, say 'pause'"

D. GRACEFUL EXITS:
Instead of: "It seems you're unavailable right now."
Use: "I understand you might need to step away. We can pause this assessment
      and pick up where we left off whenever you're ready. I've saved all your
      answers so far. You can reconnect anytime in the next 7 days. Thank you
      for your time today."

IMPLEMENTATION:
- Timeout thresholds vary by question complexity (node.meta.complexity)
- Different silence messages for simple vs. complex questions
- Offer skip/pause options before terminating
- Save partial progress for resume capability
```

---

### 9. **Final Summary & Closing (HIGH PRIORITY)**

**Current State:**
```
1. Speak summary of all answers
2. "Thank you, I have collected all details."
3. Submit to database
4. "I have submitted all details into our dataset."
5. End conversation
```

**Problems:**
- Abrupt ending
- No explanation of next steps
- No opportunity for user questions
- Doesn't provide contact information
- No sense of closure or what happens next

**Recommended Improvements:**

```markdown
COMPREHENSIVE CLOSING PROTOCOL:

PHASE 1: SUMMARY WITH REVIEW OPPORTUNITY
"Excellent! Let me quickly review what we've covered:
- Personal information: [brief summary]
- Employment status: [brief summary]
- Health information: [brief summary]
- Family history: [brief summary]

Before I submit this, would you like to change or add anything? Say 'yes' if you'd
like to review any section, or 'no' if everything looks good."

[If yes: Allow user to specify what to review/change]
[If no: Proceed to Phase 2]

PHASE 2: NEXT STEPS EXPLANATION
"Perfect! Here's what happens next:

1. I'll submit your information to our underwriting team
2. They'll review your application within 2-3 business days
3. You'll receive an email at [confirmed_email] with:
   - Your application status
   - Next steps if additional information is needed
   - Coverage options if you're approved

You should hear from us by [calculate date]. If you don't receive an email,
please check your spam folder or contact us at [contact_number]."

PHASE 3: ADDITIONAL QUESTIONS
"Do you have any questions about the process or what happens next?"

[If yes: Answer questions using prepared FAQ responses]
[If no: Proceed to Phase 4]

PHASE 4: FINAL THANK YOU & CLOSURE
"Thank you so much for taking the time to complete this assessment, [FirstName].
Your patience and thoroughness are greatly appreciated. We look forward to helping
you find the right coverage. Have a great [day/evening]!"

[Submit to database - SILENT]
[Log submission success - SILENT]
[End conversation]

IMPLEMENTATION:
- Review opportunity before submission
- Clear next steps with timeline
- Contact information for follow-up
- FAQ handler for common closing questions:
  * "How will you contact me?"
  * "Can I change my answers later?"
  * "What if I forgot something?"
  * "How do I check my application status?"
  * "What are my coverage options?"
```

---

### 10. **Voice-Specific Enhancements (MEDIUM PRIORITY)**

**Current State:**
- Assumes perfect speech recognition
- Limited handling of unclear audio
- No disambiguation for homophones

**Problems:**
- Real-world voice has: background noise, accents, unclear speech, homophones
- System doesn't handle these gracefully
- May capture wrong information due to misheard speech

**Recommended Improvements:**

```markdown
VOICE QUALITY & CLARITY HANDLING:

A. UNCLEAR AUDIO DETECTION:
Implement confidence scoring from speech-to-text:
- High confidence (>90%): Confirm normally
- Medium confidence (70-90%): Request clarification
  "I think I heard <value>, but I want to make sure. Could you say that again?"
- Low confidence (<70%): Request spelling or different phrasing
  "I'm having trouble hearing that clearly. Could you spell it for me, or say it
   a different way?"

B. HOMOPHONE DISAMBIGUATION:
For critical fields with common homophones:

Names:
"Is that T-H-E-R-E-S-A or T-E-R-E-S-A?"
"Is your last name spelled G-R-A-Y or G-R-E-Y?"

Numbers:
"Just to confirm, is that one-five (15) or five-zero (50)?"
"When you said 'for', did you mean F-O-R or the number 4?"

C. BACKGROUND NOISE HANDLING:
If multiple clarifications needed in sequence:
"I'm noticing some background noise. If possible, could you move to a quieter
area? Or if you prefer, we can pause and resume when it's more convenient."

D. ACCENT/PRONUNCIATION SUPPORT:
If repeatedly failing to understand:
"I'm having trouble understanding that. Would it help if you spelled it out for me?
Or you can try saying it more slowly?"

Never say: "I can't understand your accent"
Instead: "I want to make sure I get this exactly right..."

E. TECHNICAL FALLBACK OPTIONS:
"If the voice connection isn't working well, you can also:
- Complete this assessment online at [URL]
- Schedule a phone call with an agent
- Provide this information via email"

IMPLEMENTATION:
- Integrate speech-to-text confidence scores
- Maintain homophone dictionary for common fields
- Background noise detection from audio input
- Escalation path to human agent if voice issues persist
- Alternative completion methods
```

---

### 11. **Dynamic Conversational Memory (MEDIUM PRIORITY)**

**Current State:**
- Context references exist but limited
- No memory of user's communication style
- Doesn't build on established rapport

**Problems:**
- Doesn't feel like a continuous conversation
- Misses opportunities for personalization
- Treats user the same throughout despite learning about them

**Recommended Improvements:**

```markdown
CONVERSATIONAL MEMORY FRAMEWORK:

A. PERSONAL TOUCH:
Use first name after it's collected:
Instead of: "Your employment status?"
Use: "Thanks, John. Now, what's your current employment status?"

B. REFERENCE PREVIOUS ANSWERS:
"You mentioned you're a teacher in California. How long have you been in that role?"
"Earlier you said you live in Austin. Is your employer also based in Austin?"

C. ADAPT TO USER STYLE:
If user gives brief answers:
- Be more efficient and direct
- Skip some optional pleasantries

If user gives detailed answers:
- Allow slight conversational elements
- Acknowledge additional context they provide

D. ACKNOWLEDGE PATTERNS:
If user consistently needs spelling requests:
"I know we've been spelling a lot of these. Thank you for your patience."

If user has been answering quickly:
"You're doing great with these. Let's keep the momentum going."

E. CONSISTENCY CHECKING:
Flag potential inconsistencies gently:
"Just to clarify - you mentioned you're 35, but your birth year would make you 36.
Which is correct?"

IMPLEMENTATION:
- Maintain conversation_state with user preferences
- Track: speed (fast/normal/slow), detail_level (brief/verbose), spelling_needed
- Store first_name for personalization
- Cross-reference related answers for consistency
- Adjust pacing and detail based on user patterns
```

---

### 12. **Compliance & Legal Considerations (HIGH PRIORITY)**

**Current State:**
- No mention of consent
- No explanation of data usage
- No opt-out mechanisms
- No recording disclosure

**Problems:**
- May not be legally compliant
- Doesn't meet HIPAA requirements
- No informed consent
- Could create liability

**Recommended Improvements:**

```markdown
COMPLIANCE FRAMEWORK:

A. INITIAL DISCLOSURE (Before any questions):
"Before we begin, I need to let you know a few important things:

1. This conversation may be recorded for quality assurance and training purposes.
2. The information you provide will be used solely to assess your insurance
   eligibility and will be kept confidential according to HIPAA regulations.
3. You can decline to answer any question, though that may affect our ability
   to process your application.
4. You can stop this assessment at any time.

Do you consent to proceed with this assessment?"

[MUST receive explicit "Yes" before continuing]

B. SENSITIVE DATA COLLECTION:
Before health/medical section:
"The next questions ask about your health and medical history. This information
is protected by HIPAA privacy laws and will only be shared with our underwriting
team who need it to process your application. Do you consent to continue?"

C. OPT-OUT OPTIONS:
Throughout conversation:
- "If you'd like to skip this question, just say 'skip'"
- "If you'd like to stop the assessment, say 'stop' at any time"
- "If you'd prefer to complete this in writing instead, I can send you a form"

D. DATA RETENTION NOTICE:
At closing:
"Your information will be stored securely for [X] years according to insurance
regulations. If you'd like to review, correct, or delete your information, you
can contact our privacy office at [contact]."

E. RECORDING SPECIFIC:
If conversation is recorded:
"This call is being recorded. If you need to say something off the record, let
me know and I can pause the recording."

IMPLEMENTATION:
- Explicit consent checkpoints:
  * Initial consent (start)
  * Health data consent (before medical questions)
  * Recording consent (if applicable)
- Store consent confirmation in database
- Log all opt-out requests
- Provide privacy policy URL
- Include data subject rights information
```

---

## Implementation Priority Matrix

| Priority | Area | Impact | Effort | Timeline |
|----------|------|---------|--------|----------|
| **P0** | Greeting & Introduction | High | Low | Week 1 |
| **P0** | Error Messages | High | Medium | Week 1 |
| **P0** | Compliance & Consent | Critical | Medium | Week 1 |
| **P1** | Conversational Naturalness | High | Medium | Week 2 |
| **P1** | Empathy Framework | High | Medium | Week 2 |
| **P1** | Insurance Context | High | Low | Week 2 |
| **P2** | Closing & Next Steps | Medium | Low | Week 3 |
| **P2** | Progress Tracking | Medium | Low | Week 3 |
| **P2** | Smart Spelling | Medium | Medium | Week 3 |
| **P3** | Silence Handling | Medium | Low | Week 4 |
| **P3** | Voice Quality | Low | High | Week 4+ |
| **P3** | Conversational Memory | Low | Medium | Week 4+ |

---

## Sample Revised Instruction Sections

### Example: Revised Greeting

```markdown
────────────────────────────────────────────
GREETING & INITIAL CONSENT (P0)
────────────────────────────────────────────

GREETING SEQUENCE:
1. Personal introduction
2. Purpose explanation
3. Process overview
4. Time expectation
5. Confidentiality assurance
6. Consent request
7. Question opportunity
8. Begin assessment

EXACT SCRIPT:
"Hello! My name is Alex, and I'm your insurance assessment assistant. I'm here
to help you through the qualification process for your insurance policy.

This assessment will take approximately 10 to 15 minutes. I'll be asking you
questions about your personal information, employment, health history, and family
medical background.

All information you share is completely confidential and protected under HIPAA
regulations. It will only be used to assess your eligibility and determine the
best coverage options for you.

This conversation may be recorded for quality assurance.

Do you consent to proceed with this assessment?"

RESPONSE HANDLING:
IF "Yes" or affirmative:
  "Wonderful! Do you have any questions before we start?"

  IF "Yes":
    [Use FAQ handler]
    After answering: "Any other questions? <wait> Great, let's begin."

  IF "No":
    "Great! Let's begin with some basic personal information."
    [Proceed to Q1]

IF "No" or negative:
  "I understand. If you'd like to proceed at a later time or through a different
  method, please contact us at [phone/email]. Thank you for your time."
  [End conversation, do not proceed]

IF "Unclear" or "Silence":
  "I need your consent to proceed. Please say 'yes' if you'd like to continue,
  or 'no' if you'd prefer not to."
  [Wait for clear response]

RULES:
- Greeting occurs EXACTLY ONCE at conversation start
- MUST receive explicit consent before any personal questions
- MUST disclose recording if applicable
- MUST offer question opportunity
- Never skip consent step
```

---

### Example: Revised Confirmation Protocol

```markdown
────────────────────────────────────────────
CONFIRMATION PROTOCOL (P1)
────────────────────────────────────────────

GOAL: Confirm normalized answers while maintaining conversational flow

CONFIRMATION STYLES:

A. FORMAL CONFIRMATION (Critical fields: DOB, SSN, Email, Phone, Legal Names):
- "Just to make sure I have this exactly right, that's <value>. Is that correct?"
- "Let me confirm: <value>. Is that accurate?"
- "I want to be certain I captured this correctly: <value>. Is that right?"

B. STANDARD CONFIRMATION (Standard fields: Address, Employment, etc.):
Rotate through variations:
- "So that's <value>, is that right?"
- "I've got <value>, does that sound correct?"
- "Just to confirm, you said <value>?"
- "Did I understand that correctly as <value>?"
- "Let me make sure: <value>?"

C. CASUAL CONFIRMATION (Non-critical fields when rapport established):
- "Great, <value>. I've got that down."
- "Perfect, so <value>."
- "Alright, <value> it is."
- "Okay, I've recorded <value>."

D. EMPATHETIC CONFIRMATION (Sensitive fields):
- "Thank you for sharing that. Just to confirm: <value>?"
- "I appreciate you telling me. So that's <value>, correct?"

SPECIAL RULES FOR TEXT FIELDS (Names):
- ALWAYS spell letter-by-letter in confirmation
- Use clear pronunciation of each letter
- Example: "I've got your first name as J-O-H-N. Is that correct?"

SPECIAL RULES FOR DATES:
- Repeat in full format: "So that's March 15th, 1985. Is that right?"

SPECIAL RULES FOR EMAILS:
- Repeat with phonetic elements: "That's john dot smith at gmail dot com. Correct?"

CONFIRMATION SELECTION LOGIC:
```python
def select_confirmation_style(question_node, conversation_state):
    if question_node.meta.critical:
        return random.choice(FORMAL_CONFIRMATIONS)
    elif question_node.meta.sensitive:
        return random.choice(EMPATHETIC_CONFIRMATIONS)
    elif conversation_state.rapport_established and not question_node.meta.sensitive:
        return random.choice(CASUAL_CONFIRMATIONS)
    else:
        return random.choice(STANDARD_CONFIRMATIONS)
```

ANTI-REPETITION RULES:
- Track last 3 confirmation phrases used
- Never use same phrase twice in a row
- Cycle through different structures
- Adjust formality based on user responses

RESPONSE HANDLING:
After confirmation prompt:
- STOP all processing
- WAIT for Yes/No only
- Do NOT trigger retries, silence handling, or other logic during wait
- If "Yes": Proceed to validation
- If "No": Re-ask question from start
- If unclear: "Please say 'yes' if that's correct or 'no' if I need to ask again."
```

---

### Example: Revised Error Handling

```markdown
────────────────────────────────────────────
USER-FRIENDLY ERROR MESSAGES (P0)
────────────────────────────────────────────

FRAMEWORK:
1. Acknowledge attempt (positive framing)
2. Explain issue (helpful)
3. Provide guidance/example (actionable)
4. Re-ask with patience (supportive)

ERROR MESSAGE TEMPLATES:

EMAIL VALIDATION ERROR:
"I'm having trouble recognizing that as an email address. Please say it again
slowly, and remember to say 'at' for the @ symbol and 'dot' for periods. For
example, 'john dot smith at gmail dot com'."

DATE VALIDATION ERROR:
"I need that date in month, day, year format. For example, you could say
'March 15th, 1985' or 'three fifteen nineteen eighty-five'."

NUMBER VALIDATION ERROR:
"I need that as a number. For example, you could say 'thirty-five' or 'one
hundred twenty'."

CHOICE VALIDATION ERROR:
"I didn't catch that as one of the options. Your choices are: <list all choices>.
Which one best describes your situation?"

PHONE NUMBER ERROR:
"I need that as a 10-digit phone number. Please say it with your area code, for
example: '4-1-5-5-5-5-1-2-3-4'."

REQUIRED FIELD ERROR:
"This is an important question for your application, so I do need an answer here.
If you're not sure how to answer, I can explain the question differently. Would
that help?"

RETRY PROGRESSION (Increasing patience):

1st Retry (Gentle):
"No problem, let me ask that once more. <re-ask question>"

2nd Retry (Helpful):
"That's okay, these details can be tricky. <provide example/guidance> Let's try
again: <re-ask question>"

3rd Retry (Very patient, offer help):
"I'm still having trouble with that answer. This might be a difficult question.
Would you like me to:
- Explain the question differently?
- Provide an example?
- Skip this for now and come back to it?

Just let me know what would help."

IMPLEMENTATION:
```python
def generate_error_message(validation_error, retry_count, question_node):
    # Get base error message for validation type
    base_message = ERROR_TEMPLATES[validation_error.type]

    # Add retry-appropriate framing
    if retry_count == 0:
        prefix = "Let me ask that again. "
    elif retry_count == 1:
        prefix = "No problem, let's try once more. "
    elif retry_count == 2:
        prefix = "That's okay. "
    else:
        # Offer options after 3rd failure
        return generate_help_offer(question_node)

    return prefix + base_message + "\n\n" + question_node.conversational
```

NEVER SAY:
❌ "Invalid"
❌ "Error"
❌ "Wrong"
❌ "Incorrect"
❌ "Failed"
❌ "That answer is invalid"

ALWAYS SAY:
✅ "I need that in a different format"
✅ "I'm having trouble understanding"
✅ "Let me ask that again"
✅ "I want to make sure I get this right"
✅ "That's okay, let's try again"
```

---

## Testing Recommendations

To validate these improvements:

1. **User Testing Sessions:**
   - Conduct 10+ interviews with test subjects
   - Mix demographics (age, tech comfort, accent diversity)
   - Record and analyze:
     * User frustration points
     * Questions requiring multiple retries
     * Where users disengage or lose patience
     * Naturalness ratings

2. **A/B Testing:**
   - Test old vs. new greeting
   - Test varied confirmations vs. uniform confirmations
   - Test helpful errors vs. technical errors
   - Measure: completion rate, time to complete, user satisfaction

3. **Edge Case Testing:**
   - Uncommon names (non-English origins)
   - Complex medical histories
   - Employment gaps / unconventional employment
   - Users with strong accents
   - Background noise scenarios
   - Elderly users (slower responses)

4. **Compliance Review:**
   - Legal review of consent language
   - HIPAA compliance verification
   - State-specific insurance regulations
   - Recording consent laws by state

---

## Success Metrics

Track these KPIs to measure improvement:

| Metric | Current Baseline | Target | Timeline |
|--------|------------------|--------|----------|
| Interview Completion Rate | TBD | >85% | 3 months |
| Average Interview Duration | TBD | <15 min | 3 months |
| User Satisfaction Score (1-5) | TBD | >4.0 | 3 months |
| Questions Requiring 2+ Retries | TBD | <10% | 3 months |
| Premature Drop-offs | TBD | <5% | 3 months |
| Data Quality Score | TBD | >95% | 3 months |
| Empathy Rating (User Survey) | TBD | >4.0 | 3 months |

---

## Conclusion

The current agent instructions provide a solid technical foundation but lack the human touch, empathy, and conversational naturalness required for insurance qualification interviews. The improvements outlined in this document will transform the agent from a functional questionnaire bot into a professional, empathetic insurance interviewer that:

1. ✅ Builds trust and rapport
2. ✅ Respects user time and emotional state
3. ✅ Provides clear guidance and helpful errors
4. ✅ Maintains compliance with regulations
5. ✅ Adapts to user communication style
6. ✅ Delivers a professional insurance experience

**Priority:** Implement P0 items immediately (compliance, greeting, errors), then progress through P1-P3 items over 4-week period.

**Next Steps:**
1. Review and approve priority P0 changes
2. Develop updated instruction document
3. Update question JSON schema to support new meta fields
4. Implement confirmation variation system
5. Create error message templates
6. Conduct user testing
7. Iterate based on feedback

---

**Document Version:** 1.0
**Date:** January 7, 2026
**Author:** Claude (AI Agent Review)
**Status:** Draft for Review
