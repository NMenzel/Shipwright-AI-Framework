# Security Review Prompts

## Security Risk Scan

Purpose: Identify security risks in code, prompts, agent workflows, or tool permissions.

When to use: Auth, data handling, dependencies, agent permissions, or external integrations.

Required input: Diff, data classes, permission model, known trust boundaries.

Prompt:

```text
Perform a security risk scan of this change.
Focus on data exposure, secrets handling, injection risk, auth boundaries, dependency risk, unsafe defaults, and excessive agent permissions.
Do not claim the code is secure.
Return risks, exploit scenarios, mitigations, and required human review points.
```

Expected output: Threats, mitigations, and unresolved questions.

Human review requirement: Security owner review required for high-risk changes.

Failure modes: Missing business-specific threats, speculative findings, false confidence.
