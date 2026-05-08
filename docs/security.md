# Security

## Baseline principles

- Do not commit secrets.
- Use environment variables carefully.
- Keep dependencies updated.
- Avoid exposing private configuration to the client.
- Validate assumptions at trust boundaries.
- Use HTTPS in production.
- Apply least privilege where integrations exist.
- Document security-sensitive decisions.
- Avoid adding UI dependencies without a clear reason.

## Practical notes

This starter is frontend-focused, so the goal is not to overclaim advanced security controls. The aim is to establish disciplined defaults that reduce avoidable mistakes.

Examples:

- keep server-only values out of client bundles
- avoid copying unknown snippets into production dependencies
- review third-party packages before adding them
- write down non-obvious security tradeoffs when they appear
