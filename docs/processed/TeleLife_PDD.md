Tele-Life Underwriting AI Automation POC

Version 1.1

Date: December 23, 2025

**DRAFT -- FOR INTERNAL REVIEW**

**Document Control**

  -----------------------------------------------------------------------
  **Author**          \[Project Team\]
  ------------------- ---------------------------------------------------
  **Reviewers**       

  **Status**          Draft v1.1
  -----------------------------------------------------------------------

# Table of Contents

1\. About this Document

2\. Process Overview

3\. Process Complexity & Scale

4\. POC Scope & Scenario Selection

5\. Process Criticality

6\. Process Diagram

7\. Process Inputs

8\. Process Outputs

9\. Assumptions

10\. Known Risks

11\. Step-by-Step Process

12\. Integration Approach

13\. Success Criteria

14\. Deliverables

15\. Process Exceptions

# 1. About this Document

This Process Definition Document (PDD) describes the current (As-Is)
Tele-Life Underwriting process used for life insurance policy issuance
and outlines the proposed approach to evaluate partial automation of the
process using AI as part of a Proof of Concept (POC).

The document captures the end-to-end process flow, key decision points,
business rules, system interactions, and compliance requirements
involved in conducting underwriting interviews via call center agents.
It also highlights areas identified for potential AI-assisted automation
based on feasibility and business impact.

This document serves as a reference for business stakeholders, product
owners, and technical teams to understand the process scope, objectives,
assumptions, and next steps for the proposed POC.

## Key Stakeholders 

  -----------------------------------------------------------------------
  **Stakeholder**        **Role**                   **Key Milestone**
  ---------------------- -------------------------- ---------------------
  Lauren                 Process Owner -- oversees  Demo: January 5th
                         entire Tele-Life process   

  Dustin Dew             Business SME -- Process    Ongoing
                         walkthrough                

  Lars Boeing            Project Sponsor /          Ongoing
                         Oversight                  
  -----------------------------------------------------------------------

# 2. Process Overview

The Tele-Life Underwriting process is used to assess customer
eligibility for life insurance coverage through a structured interview
conducted online or by a call center agent. The process begins when a
customer initiates a life insurance application and proceeds through a
series of personal and medical questions.

Certain customer details may be pre-populated based on information
collected prior to the interview. Regulatory authorization, such as
HIPAA consent, is a mandatory prerequisite before any medical
information is collected. The call center agent ensures that all
required information is captured accurately during the interview.

Customer responses are evaluated using predefined underwriting rules
embedded within the system. Based on the evaluation, the system
determines whether the policy can be issued instantly or requires manual
underwriting.

## Decision Outcomes 

- **Instant Issue:** Policy can be issued immediately without additional
  review, labs, home visits, or physician statements.

- **Manual Underwriting Referral:** Application requires additional
  medical review, lab work, or documentation based on coverage amount or
  health responses.

This POC focuses on reviewing selected parts of this process to assess
the feasibility of AI-assisted automation while maintaining compliance
and decision accuracy. The POC will target 2--3 representative medical
decision scenarios rather than the full question set.

# 3. Process Complexity & Scale 

The Tele-Life Underwriting interview is a highly complex, branching
process driven by dynamic question logic and medical decision rules.

  -----------------------------------------------------------------------
  **Metric**                          **Value**
  ----------------------------------- -----------------------------------
  Total Possible Questions            **\~5,000**

  Potential Decision Paths            **\~400,000**

  Interview Channels                  Online (web-based) & Call Center
                                      Agent

  Decision Factors                    Medical responses + Coverage amount
                                      (face amount)
  -----------------------------------------------------------------------

**Key Insight:** The underwriting decision is not solely based on
medical answers. Coverage amount (face amount) also triggers different
routing---higher coverage amounts may require labs or additional
documentation regardless of health responses.

# 4. POC Scope & Scenario Selection 

Given the complexity of the full process (\~5,000 questions, \~400,000
paths), a full automation is not feasible for POC. The approach is to
select 2--3 representative medical decision scenarios that demonstrate
the AI\'s capability to handle varying levels of complexity.

## Scenario Selection Criteria

- **Scenario 1 -- Common Condition (e.g., Blood Pressure):**
  High-frequency medical condition with a well-defined decision tree.
  Represents the majority of customer interviews.

- **Scenario 2 -- Moderately Complex Condition:** A condition with
  deeper branching logic and multiple follow-up questions (e.g.,
  diabetes, respiratory conditions).

- **Scenario 3 -- Terminology Challenges:** A condition where customers
  typically struggle to articulate medical terminology correctly (e.g.,
  cardiovascular conditions, medications). Tests AI\'s ability to handle
  ambiguous or imprecise responses.

## Rationale

If the POC successfully demonstrates automation for these representative
scenarios, the same approach can be replicated for other medical
decision trees. This phased approach reduces risk while proving
scalability.

# 5. Process Criticality

The Tele-Life Underwriting process is critical as it directly affects
policy issuance, customer experience, and risk management. Accurate data
collection and rule-based decisioning are essential to ensure compliance
and prevent financial or regulatory exposure.

The process handles sensitive medical information, making data privacy
and consent mandatory. Any errors or delays can lead to incorrect
underwriting decisions or increased manual effort. Consistent
application of underwriting rules is required to maintain fairness and
auditability.

Due to the complexity and high business impact of this process,
automation must be carefully evaluated. This POC aims to assess whether
selected steps can be safely assisted by AI without compromising
accuracy or compliance.

# 6. Process Diagram

High-Level Process Flow

*\[Insert detailed process flow diagram here\]*

## Process Flow Summary

  -------------------------------------------------------------------------
  **Step**   **Activity**                  **System/Actor**
  ---------- ----------------------------- --------------------------------
  1          Customer initiates            Online Portal / Call Center
             application                   

  2          HIPAA authorization validated System (pre-email) / Agent

  3          Tele-Life interview begins    Agent / AI Bot (POC)

  4          Dynamic Q&A based on rules    Rules Engine
             engine                        

  5          System evaluates risk &       Underwriting System
             eligibility                   

  6          Decision: Instant Issue OR    Underwriting System
             Manual Referral               
  -------------------------------------------------------------------------

# 7. Process Inputs

The process inputs are:

1.  Customer life insurance application details captured through an
    online application or pre-email.

2.  Pre-populated customer information available in the underwriting
    system.

3.  HIPAA authorization completed online or captured via voice consent
    during the call.

4.  Customer personal details collected during the Tele-Life interview.

5.  Customer medical history and health-related responses provided
    during the interview.

6.  Coverage amounts and policy details selected by the customer.

7.  Identification of respondent (insured vs. beneficiary vs. other
    party).

# 8. Process Outputs

The process outputs are:

1.  Decision on life insurance eligibility based on underwriting rules.

2.  Instant issuance of the life insurance policy for eligible
    customers.

3.  Referral of the application to manual underwriting for cases
    requiring additional medical review.

4.  Captured and stored Tele-Life interview responses for audit and
    compliance purposes.

5.  Confirmation of HIPAA authorization and voice consent completion.

# 9. Assumptions 

1.  Lauren (Process Owner) will provide detailed walkthrough of selected
    scenarios during January 5th demo.

2.  Mock interview transcripts will be made available for AI training
    and testing.

3.  Decision tree logic for selected scenarios will be documented and
    validated by SMEs.

4.  POC will use mock API integrations (JSON-based) rather than live
    system connections.

5.  HIPAA authorization handling remains out of scope for AI automation
    during POC.

6.  Underwriting rules and questionnaire logic will remain stable during
    POC execution.

7.  POC focuses on call center agent channel; online channel automation
    is future scope.

# 10. Known Risks

## Standard Risks During POC Execution

- Changes to underwriting rules, questionnaires, or system configuration
  during the POC period.

- Incomplete or missing customer information impacting underwriting
  decisions.

- Network or system connectivity issues affecting interview flow or data
  capture.

- Access or permission issues for call center agents or POC systems.

- Delays caused by dependency on test data or mock integrations.

## Standard Development Risks

- Limited access to underwriting systems or test environments.

- Dependency on availability of subject matter experts (SMEs) for rule
  clarification.

- Changes in POC requirements during development.

- Delays due to data privacy or compliance approvals.

## Process Risks

- HIPAA authorization not completed prior to medical data collection.

- Incorrect or ambiguous medical responses provided by customers.

- Rule engine misclassification leading to incorrect routing of cases.

- Increased manual underwriting due to conservative rule handling during
  POC.

## AI-Specific Risks 

- AI misinterpretation of ambiguous or colloquial medical terminology
  from customers.

- Training data insufficiency for complex or rare medical scenarios.

- Latency or response time concerns impacting customer experience during
  live calls.

# 11. Step-by-Step Process

1.  Customer initiates life insurance application.

2.  Tele-Life interview begins (online or via agent).

3.  System validates respondent identity (insured vs. beneficiary vs.
    other).

4.  Customer answers dynamic medical and personal questions.

5.  Rules engine determines follow-up questions based on responses.

6.  Additional details collected for specific conditions (e.g., asthma,
    weight change, blood pressure).

7.  HIPAA authorization and voice signature validated.

8.  System evaluates risk and coverage eligibility based on responses
    and face amount.

9.  Decision generated: Instant issuance OR Manual underwriting
    referral.

# 12. Integration Approach 

For the POC demonstration, live system integrations are not required.
The following approach will be used:

## Mock API Strategy

- **JSON-Based Mock Data:** Pre-populated customer information and
  decision tree logic will be stored in JSON files to simulate API
  responses.

- **Manual Data Extraction:** Relevant data from underwriting screens
  will be manually copied into JSON format for demo purposes.

- **Simulated Responses:** Mock APIs will return predefined responses to
  demonstrate AI decision flow.

## Future State Considerations

Executive share-out documentation will include requirements for
production integration (live API connections, real-time data access,
system authentication) as part of next-phase planning.

# 13. Success Criteria 

The POC will be considered successful if the following criteria are met:

1.  AI bot successfully navigates the complete question flow for 2--3
    selected medical scenarios.

2.  Decision logic matches expected outcomes based on predefined rules
    for test cases.

3.  AI demonstrates ability to handle ambiguous or colloquial customer
    responses (Scenario 3).

4.  Stakeholders confirm feasibility for broader rollout.

# 14. Deliverables

1.  Identification of 2--3 representative medical decision scenarios for
    the POC.

2.  End-to-end automated flow demonstrated for the selected scenarios.

3.  Feasibility assessment of AI-based automation for Tele-Life
    underwriting interactions.

4.  Recommendations on scalability and next steps based on POC outcomes.

5.  Executive share-out presentation summarizing POC results,
    integration requirements, and roadmap.

6.  Documented mock interview transcripts converted to Word format for
    reference.

# 15. Process Exceptions

*\[To be defined based on SME input during January 5th demo\]*
