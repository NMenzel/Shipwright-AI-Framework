# Architecture Review Prompts

## Architecture Fit Review

Purpose: Evaluate whether a proposed change fits the existing architecture.

When to use: New modules, data flows, state management, dependency boundaries, cross-cutting changes.

Required input: Architecture context, proposed change, affected files, constraints.

Prompt:

```text
Evaluate this proposal for architecture fit.
Check separation of concerns, SOLID, DRY, KISS, dependency direction, testability, operational risk, and future maintenance.
Do not rewrite the solution unless necessary.
Return accepted parts, risks, alternatives, and decision points for the human owner.
```

Expected output: Tradeoff analysis and human decision points.

Human review requirement: Required before large or irreversible changes.

Failure modes: Overengineering, ignoring delivery constraints, inventing missing architecture.
