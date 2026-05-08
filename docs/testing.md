# Testing

## Testing strategy

This starter uses a layered approach:

- Vitest for unit and component tests
- React Testing Library for user-facing component behavior
- Playwright for end-to-end browser coverage

## What to test

Prefer tests that reflect user-visible behavior:

- rendered output that matters to users
- accessible names and roles
- interaction behavior
- boundary conditions that could regress

Avoid tests that couple directly to implementation details such as internal helper calls or purely cosmetic class structure unless that class contract is itself the API being protected.

## Async App Router guidance

Use E2E tests for full user flows and for cases where App Router behavior or async server rendering makes unit tests an awkward fit.

Component tests are still useful for reusable client-side primitives such as `Button`.

## Recommended test pyramid

- many small unit and component tests for reusable logic and UI primitives
- fewer integration-style tests for feature behavior
- a small number of high-value E2E tests for full-page flows

## Component testing guidance

Component tests should focus on behavior and accessible output, not CSS implementation details.

Examples:

- a button renders the expected accessible role and label
- a disabled button does not invoke its handler
- an important variant contract still renders the correct semantic element
