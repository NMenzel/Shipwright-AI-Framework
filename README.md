# Shipwright AI Framework

A production-oriented framework for using AI in software delivery without weakening engineering accountability.

This project demonstrates how I structure AI-assisted software delivery as a senior engineer: with clear context, reusable prompts, human review checkpoints, secure tool boundaries, accessibility awareness, and measurable quality controls.

## What This Is

Shipwright AI Framework is a public portfolio project built on a production-minded Next.js starter. It is not a vibe-coding demo or a prompt dump. It is a structured engineering system for using AI responsibly across planning, implementation support, review, documentation, security analysis, accessibility workflows, and delivery evaluation.

The app and repository documentation are designed for engineering managers, tech leads, recruiters, AI enablement teams, and product teams adopting AI-assisted workflows.

## Why This Project Exists

AI can improve software delivery only when it is governed by strong engineering judgment, secure workflows, clear context, human review, and measurable quality controls.

This project makes that operating model concrete by showing:

- where AI is allowed to assist
- where humans must decide
- how prompts are governed
- how AI-generated code is reviewed
- how context is managed
- how security and privacy risks are controlled
- how accessibility workflows remain human-reviewed
- how delivery quality is measured over time

## What It Demonstrates

- Responsible AI usage policies
- Prompt-library governance
- AI-assisted PR review discipline
- Context engineering templates
- Security and privacy controls
- Accessibility-aware workflows
- Token-optimization guidance
- Human-in-the-loop approval checkpoints
- Workflow evaluation metrics
- Production-minded frontend delivery

## Core Modules

- Operating model
- Responsible AI policy
- Prompt library
- AI PR review guidelines
- Context engineering
- Security threat model
- Token optimization
- Evaluation framework
- Accessibility AI workflow
- Example delivery workflows

## Example Workflow

The repository includes an end-to-end example called Accessible Button Component Delivery. It shows:

- human requirement definition
- AI planning prompt
- AI implementation prompt
- human architecture review
- code review checklist
- accessibility checks
- test checklist
- final PR summary
- human sign-off

## Responsible AI Principles

- AI can propose, draft, summarize, and accelerate.
- Humans remain accountable for architecture, security, compliance, customer impact, and production approval.
- Confidential customer data, secrets, credentials, private keys, proprietary code, and sensitive business information must not be shared with AI tools unless the tool, contract, and data-processing setup explicitly allow it.
- AI-generated outputs require review for correctness, maintainability, accessibility, security, and architectural fit.
- The project uses source-informed and expert-review-ready language. It does not claim certification or expert approval.

## Human-In-The-Loop Model

AI assistance is treated as a reviewed contribution, not an autonomous production authority.

Key checkpoints:

- requirement approval
- context approval
- architecture review
- implementation review
- security and privacy review
- accessibility review
- test evidence review
- production or release approval

## Security And Privacy Guardrails

The project documents controls for:

- prompt injection
- secrets leakage
- customer data exposure
- insecure tool/plugin design
- excessive agent permissions
- repository write access risk
- dependency manipulation
- generated vulnerable code
- fake citations and unverifiable claims
- destructive action approval

## Evaluation Framework

Workflow quality is scored using practical measures:

- code quality
- review quality
- bug detection
- security issue detection
- accessibility issue detection
- documentation quality
- token efficiency
- developer time saved
- hallucination rate
- human correction rate
- rework rate

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Radix UI / shadcn-style source components
- pnpm
- ESLint
- Prettier
- Vitest
- React Testing Library
- Playwright
- GitHub Actions

## Running Locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Available Scripts

```bash
pnpm lint
pnpm typecheck
pnpm test:run
pnpm test:e2e
pnpm format:check
pnpm build
```

## Project Structure

```txt
.
├─ docs/
├─ src/
│  ├─ app/
│  ├─ components/
│  ├─ content/
│  ├─ lib/
│  ├─ styles/
│  └─ types/
├─ tests/e2e/
├─ playwright.config.ts
├─ vitest.config.ts
└─ vitest.setup.ts
```

## Portfolio Positioning

This project demonstrates how I structure AI-assisted software delivery as a senior engineer: with clear context, reusable prompts, human review checkpoints, secure tool boundaries, accessibility awareness, and measurable quality controls.

## Disclaimer

This project is source-informed and prepared for expert review. It does not claim legal, compliance, security, or accessibility certification.
