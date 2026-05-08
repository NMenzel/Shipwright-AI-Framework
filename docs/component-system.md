# Component System

## Baseline strategy

This starter uses shadcn/ui as the baseline for common UI primitives and Radix UI primitives where accessible interaction behavior is needed.

The intent is practical:

- start from accessible, source-based primitives
- keep components readable
- make customization straightforward
- avoid importing a large unused component set

## How to treat shadcn/ui components

shadcn/ui components are committed source files, not a black-box package. They should stay easy to review and maintain.

When customizing them:

- preserve the accessibility behavior they rely on
- keep the public API small and explicit
- prefer typed variants over ad hoc booleans and one-off class branches
- document non-obvious behavior changes

## When to use Radix UI directly

Use Radix primitives directly when a component needs accessible interaction behavior that is not already covered by the baseline shadcn components.

Before adding a Radix-driven component, ask:

- is this interaction genuinely needed now
- does semantic HTML already solve the requirement
- can the component stay small and understandable after it is added

## Design constraints

- prefer semantic HTML before custom interaction logic
- keep variants explicit and typed
- keep class composition centralized
- do not break keyboard behavior while styling components
- add components intentionally rather than preloading a large inventory

## Component contribution checklist

- Is the component necessary?
- Is it accessible by default?
- Does it preserve keyboard behavior?
- Are variants typed and limited?
- Is the API small and understandable?
- Is it tested where behavior matters?
