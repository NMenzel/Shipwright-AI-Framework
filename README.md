# Next.js Production Starter

A production-oriented Next.js starter focused on maintainable architecture, accessibility, shadcn/ui components, testing, CI/CD quality gates, and AI-assisted engineering workflows with human review.

This starter is designed as a reusable foundation for frontend projects where code quality, accessibility, and long-term maintainability matter.

## Why this starter exists

Many starter projects optimize for visual novelty or speed of scaffolding. This repository optimizes for a different goal: a clean, production-minded baseline that can grow with real project requirements.

The focus is on a stable engineering foundation:

- readable code and clear boundaries
- accessible component primitives
- explicit testing layers
- CI quality gates
- security-conscious defaults
- source-based UI components that remain easy to audit and customize

## Engineering principles

This starter is built around:

- Type-safe application development
- Small, composable components
- Clear separation of concerns
- Accessibility by default
- Radix/shadcn-based UI primitives
- Automated quality gates
- Testable UI behavior
- Maintainable folder structure
- Security-conscious defaults
- AI-assisted development with human review

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- pnpm
- ESLint
- Prettier
- Vitest
- React Testing Library
- Playwright
- GitHub Actions

## Component foundation

This starter uses shadcn/ui as a source-based component foundation and Radix UI primitives where accessible behavior is required.

The goal is not to hide complexity behind a black-box UI library. The goal is to start with accessible, customizable primitives that can be reviewed, tested, and adapted to project needs.

The initial baseline includes:

- `Button`
- `Card`
- `Badge`
- `Separator`
- `Container` for layout composition

## Repository structure

```txt
.
├─ .github/workflows/ci.yml
├─ components.json
├─ docs/
├─ src/
│  ├─ app/
│  ├─ components/
│  │  ├─ layout/
│  │  └─ ui/
│  ├─ features/
│  ├─ lib/
│  ├─ styles/
│  └─ types/
├─ tests/e2e/
├─ playwright.config.ts
├─ vitest.config.ts
└─ vitest.setup.ts
```

## Quality gates

The baseline quality gates are:

- ESLint for static analysis
- TypeScript `--noEmit` type checking
- Vitest component tests
- Playwright end-to-end coverage for the homepage entry flow
- production build verification
- GitHub Actions CI on push to `main` and on pull requests

## Accessibility baseline

This starter treats accessibility as a default engineering concern, not a later enhancement.

- semantic HTML comes before ARIA
- visible focus styles are preserved
- Radix and shadcn accessibility behavior should not be broken during customization
- keyboard navigation should work for important flows
- headings, buttons, and landmarks should remain meaningful and predictable

See [docs/accessibility.md](docs/accessibility.md) for the full baseline.

## AI-assisted development principle

AI can accelerate implementation and review workflows, but it does not replace engineering accountability.

The working rule for this repository is:

> AI can accelerate development, but it does not remove the need for engineering discipline.

See [docs/ai-assisted-development.md](docs/ai-assisted-development.md) for prompt guidance, review expectations, and safety constraints.

## Getting started

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Available scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint .",
  "typecheck": "tsc --noEmit",
  "test": "vitest",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage",
  "test:e2e": "playwright test",
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
```

## Testing

- `pnpm test:run` runs the Vitest suite.
- `pnpm test:e2e` runs the Playwright homepage test.
- `pnpm test:coverage` collects unit test coverage with the V8 provider.

The intended testing pyramid is:

- unit and component tests for reusable logic and UI behavior
- E2E tests for full-page flows and async integration behavior

## CI/CD

GitHub Actions runs the core verification pipeline:

- install dependencies
- lint
- typecheck
- unit tests
- production build

The default CI stays lean by not running Playwright browsers on every push. E2E is configured locally and can be added to CI once the project needs that extra gate.

## Future improvements

- add more shadcn/ui primitives only when product requirements justify them
- add visual regression testing if the project surface area grows
- introduce environment validation for projects that depend on runtime configuration
- add Storybook or a component workshop only when the component surface area becomes large enough to justify the maintenance cost
