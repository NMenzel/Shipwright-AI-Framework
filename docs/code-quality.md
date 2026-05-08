# Code Quality

## Working principles

- Prefer readable code over clever code.
- Keep components small.
- Use explicit types where they improve clarity.
- Keep interfaces understandable.
- Avoid premature abstraction.
- Apply DRY only when duplication is creating real maintenance cost.

## Practical guidance

The starter is meant to stay easy to reason about. That means:

- compose routes from smaller pieces
- isolate reusable primitives from feature code
- keep helper utilities narrow in scope
- avoid adding dependencies without a clear justification

If an abstraction hides more than it clarifies, it is probably too early.

## Quality gates

CI should fail on problems that are cheap to detect automatically:

- lint errors
- type errors
- broken unit tests
- broken production builds

## Pull request expectations

PRs should leave the codebase clearer or at least no harder to understand.

Reviewers should check:

- naming clarity
- boundary placement
- test coverage for meaningful behavior
- accessibility impact
- security-sensitive assumptions

## shadcn/ui maintenance rule

Do not modify shadcn/ui-derived components in ways that make them harder to maintain or less recognizable unless there is a clear product need. Source ownership is valuable only if the source stays understandable.
