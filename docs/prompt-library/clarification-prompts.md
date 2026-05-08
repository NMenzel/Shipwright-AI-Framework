# Clarification Prompts

## Requirement Clarifier

Purpose: Turn vague requirements into reviewable engineering questions.

When to use: Before implementation when scope is unclear.

Required input: Requirement draft, constraints, known stakeholders.

Prompt:

```text
Identify the missing information needed to implement this safely.
Ask only the highest-impact questions.
Group questions by product behavior, technical constraints, accessibility, security, and testing.
Do not propose implementation until the unknowns are resolved.
```

Expected output: Prioritized clarification questions.

Human review requirement: Product or technical owner should answer before implementation.

Failure modes: Asking too many low-value questions, proposing premature solutions.
