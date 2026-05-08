# PR Review Prompts

## Senior Review Support

Purpose: Assist a human reviewer in finding risks in a pull request.

When to use: Before or during human PR review.

Required input: PR summary, diff, acceptance criteria, relevant architecture context.

Prompt:

```text
Review this PR as support for a human reviewer.
Prioritize bugs, regressions, security issues, accessibility issues, test gaps, and maintainability risks.
Do not approve the PR.
Return findings ordered by severity with file references, reasoning, and suggested fixes.
List assumptions and areas requiring human judgment.
```

Expected output: Risk-focused findings and open questions.

Human review requirement: AI review is advisory only.

Failure modes: False positives, missed domain context, overconfidence, noisy style comments.
