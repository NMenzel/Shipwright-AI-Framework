# Accessibility

## Baseline rules

- Use semantic HTML before ARIA.
- Preserve Radix and shadcn accessibility behavior when customizing components.
- Ensure keyboard accessibility for meaningful interactions.
- Provide visible focus states.
- Maintain sufficient color contrast.
- Use accessible names for controls.
- Do not hide focusable content from assistive technologies.
- Validate forms with clear error messaging.
- Test important flows with keyboard navigation.

## Practical expectations

Treat accessibility as part of normal implementation work:

- headings should form a sensible outline
- buttons should be real buttons
- links should navigate
- interactive controls should remain reachable by keyboard
- focus should stay visible during navigation

Do not add ARIA attributes to compensate for incorrect semantics when proper HTML would solve the problem more cleanly.

## Accessibility checklist for PRs

- Does the change use semantic elements where possible?
- Are keyboard interactions preserved?
- Is the focus state visible and not removed?
- Are control labels and headings meaningful?
- Is contrast still acceptable after visual changes?
- Has any Radix or shadcn behavior been altered in a way that needs manual verification?
