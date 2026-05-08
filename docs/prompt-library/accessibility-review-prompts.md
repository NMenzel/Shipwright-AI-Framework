# Accessibility Review Prompts

## Accessibility Triage Support

Purpose: Support human accessibility review for UI changes.

When to use: New components, changed flows, forms, navigation, modals, dashboards.

Required input: UI requirements, relevant code, screenshots if permitted, expected user flow.

Prompt:

```text
Review this UI change for accessibility support.
Check semantics, heading structure, labels, keyboard access, focus management, contrast risks, reduced-motion considerations, and screen reader concerns.
Do not claim WCAG compliance.
Return likely issues, manual tests, false positive risks, and required human verification.
```

Expected output: Triage findings and manual test checklist.

Human review requirement: Mandatory for compliance-sensitive claims.

Failure modes: False positives, missed assistive technology behavior, incomplete manual evidence.
