# AI-Assisted Development

## Principle

AI can accelerate development, but it does not remove the need for engineering discipline.

## Acceptable uses

AI may support:

- implementation assistance
- refactoring support
- test generation
- documentation drafting
- review assistance

## Review standard

AI-generated code is treated as untrusted until reviewed.

Engineers remain responsible for final quality, including:

- correctness
- maintainability
- security
- accessibility
- architectural fit
- edge-case handling

## Prompt quality

Good prompts should include:

- goal
- context
- constraints
- expected output
- quality criteria

Better inputs usually produce better reviewable outputs, but they do not replace validation.

## Safety constraints

- Never paste secrets, credentials, customer data, or sensitive infrastructure details into AI tools.
- Review all AI-assisted output before merging.
- Check generated changes for correctness, maintainability, security, accessibility, edge cases, and architectural fit.
- Do not blindly generate or modify shadcn or Radix components without preserving their accessibility behavior.
