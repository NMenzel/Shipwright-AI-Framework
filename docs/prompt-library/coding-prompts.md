# Coding Prompts

## Implement A Small Feature

Purpose: Generate a narrow implementation plan and patch for one feature slice.

When to use: Small UI, utility, or testable behavior with clear requirements.

Required input: Requirement, affected files, constraints, acceptance criteria, test expectations.

Prompt:

```text
You are working in this codebase as a senior engineer.
Implement only this feature: [FEATURE].
Use these files or boundaries: [FILES].
Respect these constraints: [CONSTRAINTS].
Before coding, identify assumptions and risks.
After coding, summarize changed files, tests needed, and human review points.
Do not introduce dependencies unless explicitly justified.
```

Expected output: Small patch, assumptions, risk notes, and verification guidance.

Human review requirement: Required before merge.

Failure modes: Scope creep, hallucinated APIs, hidden behavior changes, weak tests.
