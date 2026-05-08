# Assumption-Challenging Prompts

## Challenge The Plan

Purpose: Find weak assumptions before implementation.

When to use: Architecture proposals, complex refactors, security-sensitive changes.

Required input: Proposed plan, constraints, risks, acceptance criteria.

Prompt:

```text
Challenge this plan.
Identify assumptions that could be wrong, missing constraints, simpler alternatives, security or accessibility risks, and test gaps.
Be direct and specific.
Return only issues that could materially affect delivery quality.
```

Expected output: Material concerns and alternatives.

Human review requirement: Required for decisions that affect architecture, security, accessibility, or production behavior.

Failure modes: Excessive pessimism, speculative objections, ignoring delivery cost.
