# Architecture

## Folder structure

The starter uses a small set of top-level source folders so responsibilities stay visible:

- `src/app`: App Router entry points, layouts, routes, and route-specific composition.
- `src/components/ui`: source-based reusable UI primitives following shadcn/ui conventions.
- `src/components/layout`: layout primitives such as `Container`.
- `src/features`: feature-oriented modules for business-facing code and feature-local components.
- `src/lib`: shared utilities that do not belong to a single feature.
- `src/styles`: global styling and theme tokens.
- `src/types`: shared type definitions when a type must be reused across features.

## Separation of concerns

Keep route files focused on composition. A route should assemble feature modules and reusable components, not become the default home for business logic.

Put feature-specific code inside `src/features/<feature-name>`:

- feature components
- feature-local types
- feature-local hooks
- feature-local data transformation logic

Put shared utilities in `src/lib` only when they are truly cross-cutting. Avoid moving code into a global folder too early just because it might be reused later.

## Why `components/ui` exists

`src/components/ui` is the home for reusable design primitives such as `Button`, `Card`, `Badge`, and `Separator`.

These components follow shadcn/ui conventions:

- they are committed as source
- they stay readable
- they remain easy to customize
- they should not be treated like opaque vendor code

If a shadcn-derived component becomes hard to understand, it is drifting away from the purpose of the starter.

## Why `components/layout` exists

Layout primitives solve spacing and page-structure concerns, not reusable control concerns. `Container` belongs here because it helps compose pages without becoming part of the UI primitive layer.

Keeping layout primitives separate avoids turning `components/ui` into a catch-all folder.

## Why `features` exists

`src/features` is the intended home for business-facing application code as the project grows. That includes domain logic, feature-local components, and behavior that should not leak into the global component layer.

This keeps shared folders small and prevents a repository from collapsing into a flat collection of unrelated files.

## Avoid dumping everything into global folders

A simple rule helps:

- if the code is product or domain specific, place it in a feature
- if the code is a reusable primitive, place it in `components/ui`
- if the code is page layout infrastructure, place it in `components/layout`
- if the code is a small shared utility, place it in `lib`

Choose the narrowest home that fits the responsibility. Promote code into a shared location only after real reuse appears.
