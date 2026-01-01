**STATEMENT OF WORK 2025-20**

**"TeleLife Conversational AI Proof of Concept"**

This Statement of Work ("SOW") is made and entered into as of December
2, 2026 ("SOW Effective Date") by and between **Capgemini America,
Inc.** ("Capgemini") and **Protective Life Insurance Company** ("Client"
or "Protective"). By signing below, the parties agree to the terms and
conditions of this SOW, which shall be governed by the **Master Services
Agreement** entered into by the parties dated March 19, 2021, as amended
("Agreement"). The terms and conditions of the Agreement are an integral
part of this SOW and are hereby incorporated herein. Capitalized terms
not defined herein shall have the definitions given to them in the
Agreement.

1.  **Project Description**

Protective Life intends to explore conversational voice automation
possibilities. Part of this exploration is to test how AI can improve
its TeleLife interview process by developing an AI agent capable of
conducting phone interviews with prospective customers. During an 8-week
a **Proof of Concept** ("POC"), Capgemini will build and evaluate a
conversational voice agent that follows a pre-defined part of the
TeleLife questionnaire, records responses in real time, manages
deviations from the standard interview flow, and generates completed
interview records. The objective is to demonstrate feasibility and
present a summary document for leadership consideration.

1.  **Service in Scope**

Capgemini shall provide the following services to Client under this SOW
(collectively, the "Services"):

- Confirm the part of the TeleLife interview process that will be the
  scope of the POC.

- Develop a conversational voice agent for applicant interviews using
  the pre-defined part of the structured questionnaire.

- Showcase live interaction and automated summary collection in a
  sandbox environment using synthetic data.

  1.  **Out of Scope**

<!-- -->

- Integration with any Protective IT environments (development, test or
  production)

- Use of real customer data

- Multi-language support, besides English

- Implementation of future state recommendations

- Any services or obligations not expressly denoted herein as being
  included in the scope of Services

  1.  **Activities**

- ***Phase 1: Preparation & Design (Weeks 1--2)***

  - Obtain and review relevant current-state business, process, and
    architecture documentation.

  - Conduct Kick Off Meeting.

  - Finalize Proof-of-Concept scope and success metrics.

  - Convert TeleLife questionnaire into structured data format
    (JSON/Dataverse).

  - Confirm sandbox setup, Azure resource provisioning, and access.

- ***Phase 2: Build & Integration (Weeks 3--4)***

  - Develop core conversation logic and orchestration layer using Azure
    Functions and Azure OpenAI.

  - Integrate Azure Communication Services for PSTN connectivity.

  - Implement branching logic and session state management.

  - Configure RAG service for grounding responses in TeleLife
    questionnaire.

  - Validate security setup using Azure Key Vault.

  - Conduct interviews with stakeholders focusing on aspects related to
    future AI scaling.

- ***Phase 3: Testing & Refinement (Weeks 5--6)***

  - Conduct initial internal testing of the voice pipeline and logic
    flow.

  - Perform dry-run tests with synthetic data to validate accuracy and
    latency.

  - Refine prompts, error handling, and escalation triggers.

  - Gather internal feedback and make iteration adjustments.

  - Validate data output structure and summary generation.

  - Conduct two small focus group workshops with business stakeholders
    one with technical stakeholders.

- ***Phase 4: Demo (Weeks 7--8)***

<!-- -->

- Conduct client-facing demo showcasing end-to-end call handling.

  1.  **Project Plan**

# The high-level project plan and timeline is below. Any changes shall be subject to the change control procedures. 

# 

![](media/image1.png){width="7.0625in" height="3.96875in"}

2.  **Deliverables**

  ------------------------------------------------------------------------------------------
  **Ref**   **Deliverable**   **Purpose and   **Acceptance     **Client         **Est.
                              Format**        Criteria**       Dependency**     Delivery**
  --------- ----------------- --------------- ---------------- ---------------- ------------
  **D01**   Kick-off Meeting  Provides plan   Presentation     Client to        Week 4
            Presentation      and approach    that lays out    provide list of  
                              for the         the approach,    stakeholders to  
                              engagement in   process and      be included      
                              Microsoft       timeline.        kick-off         
                              PowerPoint                       meeting.         

  **D02**   TeleLife          Demonstration   Functionality of Provide TeleLife Week 11
            Conversational    in sandbox      TeleLife         questionnaire,   
            Voice Agent       environment     Conversational   aligned success  
                              covering up to  Voice Agent      criteria,        
                              20 questions of demonstrated     stakeholder      
                              the TeleLife    (according to    availability     
                              questionnaire   success criteria                  
                                              jointly defined                   
                                              and decided with                  
                                              Protective Life)                  
  ------------------------------------------------------------------------------------------

**Acceptance of Deliverables:**

> Client shall notify Capgemini in writing within three (3) business
> days of delivery ("Acceptance Period") if a Deliverable fails in any
> material respect to meet agreed upon specifications or other
> Acceptance Criteria; Capgemini shall make such revisions as necessary
> to cause such Deliverable to meet the specifications and/or other
> Acceptance Criteria and re-submit such Deliverable to Client. 
> Capgemini will have the right to rely upon Client's acceptance of a
> Deliverable as the basis for subsequent work on the engagement. A
> Deliverable will be deemed accepted if not rejected within the
> Acceptance Period.

2.  **Term of the SOW**

The Term of this SOW shall commence on **December 15, 2025**, and shall
expire eleven (11) weeks thereafter. Either Client or Capgemini may
terminate this SOW for its convenience upon thirty (30) days' prior
written notice to the other party. In the event of any termination for
convenience of this SOW by Client, Client shall pay Capgemini for all
fees and expenses incurred through the effective date of termination
based on actual work performed.

3.  **Location of Performance of Services**

    Capgemini will perform the Services from Capgemini's offices in the
    US, Capgemini's local offices and offshore affiliate's offices in
    India, as well as Capgemini personnel India and US home locations.

4.  **Fees, Expenses, Invoicing and Payment Terms**

    Capgemini's fees for Services provided under this SOW will be billed
    on a fixed-price basis, as set forth below, exclusive of expenses.
    Client will be invoiced by Capgemini in accordance with the schedule
    below. Client shall pay Capgemini's invoices within thirty (30) days
    following receipt of the invoice.

  --------------------------- --------------------- --------------------------
  **[Invoice                         **[Due          **[Amount]{.underline}**
  Schedule]{.underline}**      Date]{.underline}**  

  TeleLife Conversational                                   \$221,334
  Agent POC                                         

  One-Time Partnership                                      -\$141,334
  Discount                                          

  **TOTAL FIXED FEE**            **12/15/2025**            **\$80,000**
  --------------------------- --------------------- --------------------------

Any delay in the completion of any applicable invoicing milestone that
is attributable to a failure or delay by the Client will not impact the
invoicing or payment related to such milestone. Thus, for example, if a
milestone is delayed due to a failure or delay by the Client (such as a
failure by the Client or its vendors or contractors, or other parties,
to perform their obligations in connection with the project; the failure
of software or hardware to perform as expected; or the failure of any of
the assumptions established in this SOW), then the applicable
milestone-based fee shall be invoiced and become payable on the
originally projected completion date for the milestone. Any affected
milestone date shall be extended according to the change control
procedures of the Agreement.

In the event of termination of this SOW for any reason, Client shall pay
Capgemini, on a pro-rata basis, for all Services rendered, Deliverables
delivered, and expenses incurred, through the date of termination,
whether or not such payments are otherwise then due and payable.

Capgemini will also invoice Client for necessary out-of-pocket expenses
incurred by Capgemini and its personnel in the course of providing the
Services. Such expenses may include, but are not limited to, travel,
accommodations, meals and local transportation costs incurred when
traveling on behalf of Client for on-site work efforts or otherwise. All
out-of-pocket expenses must be pre-approved by Protective in writing
prior to being incurred.

5.  **Responsibilities**

> Each party shall perform its respected tasks and responsibilities
> stated herein. Capgemini will perform the Services in accordance with
> all requirements of the Agreement and this SOW. Each party
> acknowledges that project duration and cost under this SOW may be
> affected if a party fails to promptly and completely perform its tasks
> and responsibilities on time. In such event, the parties will
> negotiate necessary variations to this SOW in good faith to address
> necessary changes.

(a) Client will provide a project sponsor or manager ("Client Project
    Director") for all communications with Capgemini, with the authority
    to act for Client. The Client Project Director will have the
    following responsibilities:

- Serve as the single authorized point of contact between Capgemini and
  Client;

- Identify, schedule and confirm the availability of Client SMEs for
  meetings and support;

- Work with Capgemini to administer the project change process, if
  applicable;

- Obtain and promptly provide information, data, decisions and
  approvals, within five (5) business days of Capgemini request unless
  both parties agree to an extended response time;

- Resolve deviations from project plans; and,

- Resolve project issues, escalate issues within the Client
  organization, and monitor and report project status on a regular basis
  to the pertinent person.

(b) Client will provide Capgemini with necessary and prompt access to,
    and ensure the availability of, all personnel, documentation,
    information, standards, systems and other resources that are
    necessary for Capgemini to perform and meet its obligations
    hereunder provided said access and availability does not violate any
    third-party agreements.

(c) Client will work with Capgemini to control and manage scope,
    schedules, resources, and follow project change control processes as
    required.

(d) The parties acknowledge that it is not expected that the Client will
    disclose any personal data hereunder, absent prior agreement of the
    parties.

(e) All Client data accessed by Capgemini in providing the Services
    under this SOW must remain in the Client designated environment, and
    Capgemini is not permitted to remove any such information from the
    Customer designated environment. Client will not provide Capgemini
    with such Client Data outside Client designated environment.

(f) Once the parties agree to which software and other material will be
    needed by Capgemini, Client will confirm that it possesses the
    necessary license rights to allow Capgemini personnel to legally use
    all software and other materials provided by Client to Capgemini. If
    further consents required from any third party(ies), Client shall
    obtain such consent(s).

(g) Client will be responsible for providing the VDIs used in
    performance of the Services. Additional software requirements
    necessary for the completion of the Services may be identified in
    the Project Plan delivered to Client, subject to Client's prior
    written approval. After confirmation of the requirements with
    Client, Client will provide to Capgemini the additional software
    within a reasonable time, including the right for Capgemini to use
    the software required to complete the Services.

(h) Client agrees to provide supporting documentation confirming this
    SOW and the Services performed by assigned Capgemini personnel to
    submit to appropriate immigration authorities for immigration
    purposes for Capgemini's employees.

## Assumptions: Capgemini has relied on the assumptions stated below in pricing, planning, and determining its approach to the Services. Client acknowledges that project duration and cost to Client under this SOW may be adversely affected if any project assumptions are changed or not realized, or if there are any additional elements or assumptions.

(a) The Services do not include creation of user documentation, such as
    user manuals.

(b) Environment will run on Capgemini-provided Azure environment with
    licenses for OpenAI, Speech, Communication Services, and Copilot
    Studio. The environment will not have any integration with
    Protective's IT landscape.

(c) Development and testing will be done in the Capgemini-provided
    sandbox environment.

(d) The scope of the POC shall encompass up to twenty (20) pre-selected
    questions from the TeleLife questionnaire provided by Protective.
    The questions to be included within the scope of the POC shall be
    mutually agreed upon by Protective and Capgemini prior to the start
    of development activities.

(e) Client will only provide access to masked or anonymized personal or
    sensitive data. Client shall not provide Capgemini with access to
    any PII/PHI data.

(f) Development and testing will be done using synthetic data only.

(g) Capgemini will notify Client of any Client or third-party software
    it deems necessary for the performance of the Services. Subject to
    Client's written agreement, Client will provide Capgemini with legal
    access to, at Client's sole expense, all Client and third-party
    software necessary to the performance of the Services. If any other
    third-party product is needed for the Services, it will be procured
    and licensed by Client as pre-approved and agreed in writing.
    Capgemini is not responsible for interface updates or upgrades
    related to future releases of any Client or third-party software,
    and any such work is subject to the mutual written agreement of the
    parties.

(h) Any changes in scope, budget, or resources must be agreed to between
    the parties in writing in a change order.

(i) Both parties will perform its tasks and responsibilities under this
    SOW in a prompt manner, specifically including all stated
    Responsibilities.

(j) Capgemini shall have no obligation to independently verify the
    accuracy or completeness of the information provided by Client or
    its agents. Capgemini's services are informational and advisory in
    nature, and Client has full responsibility for the use of, and the
    results obtained from, the services and any deliverables. Capgemini
    is not providing Client with any legal or financial advice.

(k) Personnel supplied by either party will not for any purpose be
    considered employees or agents of the other party. Except as may
    otherwise be provided in this Agreement, each party shall be solely
    responsible for the supervision, daily direction and control of its
    employees and payment of their salaries (including withholding of
    appropriate payroll taxes), workers' compensation, disability and
    other benefits.

(l) Client's identified stakeholders will be available for interviews,
    workshops, and reviews as is necessary. Capgemini will notify Client
    when such availability is needed.

(m) All required client stakeholders have been briefed and understand
    the project objectives as well as their time commitments for active
    participation and collaboration to this project's successful
    delivery.

(n) Capgemini US-based consultants will perform work from remote
    locations and travel to Client US-based office location(s) based on
    the written request from Client.

(o) Implementation of the assessment recommendations are not included in
    the scope of this SOW.

(p) The Services are limited to the activities/deliverables specifically
    identified in this SOW. Any change to scope, timeline, assumptions,
    dependencies or any other terms or provisions of this SOW shall be
    subject to the Changes provision in the Agreement.

(q) The 'TeleLife Conversational AI Proof of Concept' and the 'Proof of
    Concept Readout' SOWs are designed to be delivered as a unified
    engagement. The Client is required to execute both SOWs; neither
    document may be accepted independently.

**IN WITNESS WHEREOF, the Parties have caused this SOW to be executed as
of the Effective Date by their duly authorized representatives.**

  ---------------------------------------------------------------------------------------------------------------------
  **Capgemini America, Inc.**                                **Protective Life Insurance Company**
  ---------------------------------------------------------- ----------------------------------------------------------
  By: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ By: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

  Name:                                                      Name:
  \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_     \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

  Title:                                                     Title:
  \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_     \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

  Date:                                                      Date:
  \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_   \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
  ---------------------------------------------------------------------------------------------------------------------
