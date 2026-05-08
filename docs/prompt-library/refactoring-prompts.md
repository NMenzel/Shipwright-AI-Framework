# Refactoring Prompts

## Refactor Without Behavior Change

Purpose: Improve structure without changing runtime behavior.

When to use: Extracting components, reducing duplication, improving names, isolating utilities.

Required input: Current behavior, target files, protected behaviors, test commands.

Prompt:

```text
Refactor [FILES] without changing observable behavior.
Preserve public APIs, accessibility behavior, tests, and route behavior.
Explain each structural change.
Flag anything that might alter behavior instead of changing it silently.
Return a concise verification checklist.
```

Expected output: Behavior-preserving patch and verification notes.

Human review requirement: Required, with special attention to hidden behavior changes.

Failure modes: Accidental API changes, deleted edge cases, over-abstraction.
