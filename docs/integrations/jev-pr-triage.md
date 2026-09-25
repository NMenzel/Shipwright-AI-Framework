# Jev PR Triage Integration

The `/jev-triage` page sends a pull request summary to Jev, TypeSafe AI's structured decision model, and shows an advisory triage. Jev returns bounded answers with probabilities. It does not generate free text.

## What Jev Is Asked

- `risk`: a score from 0 (trivial) to 3 (high: auth, payments, migrations, infrastructure, security-sensitive code).
- `reviewPath`: one of `standard`, `security`, `accessibility`, `architecture`.
- `touchesSensitiveSurface`: the probability that the change touches auth, secrets, personal data, or untrusted input.
- `hasTestEvidence`: the probability that the summary includes concrete test evidence.

The questions are defined in `src/lib/jev/triage.ts`.

## Boundaries

- The output only routes human review. It is not a merge approval and must not gate a release on its own.
- The PR summary is user-controlled text, so it can be written to game the triage (prompt injection). Because Jev only returns fixed labels and probabilities, the worst case is a skewed routing decision, never arbitrary output or tool execution.
- The text is sent to TypeSafe AI. Follow `docs/security/secrets-handling-rules.md`: no secrets, credentials, or confidential customer data. Before using this with client code, check TypeSafe's data-processing terms and whether you need a DPA (GDPR Art. 28).

## Configuration

| Variable                 | Required | Notes                                            |
| ------------------------ | -------- | ------------------------------------------------ |
| `TYPESAFE_API_KEY`       | Yes      | Server-only. Never prefix with `NEXT_PUBLIC_`.   |
| `TYPESAFE_DEFAULT_MODEL` | No       | Defaults to `jev-latest`.                        |
| `TYPESAFE_LOG_LEVEL`     | No       | Defaults to `warn`. `debug` logs request bodies. |

Get a key from the TypeSafe Console. Copy `.env.example` to `.env.local` for local development. Without a key, the page renders in a disabled state and never calls the API.

## Architecture

- `src/lib/jev/client.ts` is marked `server-only` and lazily creates one `TypeSafeClient` (10 s timeout, 1 retry).
- `src/app/jev-triage/actions.ts` is a Server Action. It validates input length (40–4000 characters), calls `systemOne`, and maps SDK errors to safe messages.
- `src/components/jev/TriageForm.tsx` is a Client Component that uses `useActionState`. The API key never reaches the browser.

## Cost And Abuse

The page has no authentication. On a public deployment, anyone can spend your TypeSafe quota. Before you set the key in production, add one of these:

- platform rate limiting or a firewall rule on `/jev-triage` (for example Vercel WAF), or
- authentication in the Server Action, or
- a spending cap in the TypeSafe Console.
