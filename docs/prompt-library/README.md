# Prompt Library

Prompts in this library are reusable engineering assets. Each prompt should define purpose, when to use it, required input, expected output, human review requirement, and failure modes.

## Governance Rules

- Prefer small, task-specific prompts over broad requests.
- Include current project context only when necessary.
- Require the model to state assumptions.
- Require review checklists for high-risk output.
- Retire prompts that produce repeated hallucinations or unsafe suggestions.

## Categories

- Coding
- Refactoring
- PR review
- Security review
- Accessibility review
- Architecture review
- Token optimized
- Clarification
- Assumption challenging
