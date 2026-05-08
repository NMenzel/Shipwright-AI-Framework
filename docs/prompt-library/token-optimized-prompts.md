# Token-Optimized Prompts

## Concise Implementation Review

Purpose: Reduce token usage for low-risk review tasks.

When to use: Small changes with clear context and low security/compliance risk.

Required input: Short diff or file, specific question, risk level.

Prompt:

```text
Brief review. Focus only on correctness bugs, type errors, accessibility regressions, and missing tests.
Output: findings only. If none, say "No findings."
Context: [CONTEXT]
Diff: [DIFF]
```

Expected output: Minimal findings.

Human review requirement: Still required.

Failure modes: Lost nuance, missed edge cases, unsafe for high-risk work.
