"use client";

import { useActionState } from "react";

import { triagePullRequest, type TriageState } from "@/app/jev-triage/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MAX_SUMMARY_LENGTH, type TriageView } from "@/lib/jev/triage";

const initialState: TriageState = { status: "idle" };

const exampleSummary =
  "Adds a password reset endpoint that emails a signed token to the user. Token expiry is 30 minutes. Adds unit tests for token signing; e2e not yet run.";

function formatPercent(probability: number) {
  return `${Math.round(probability * 100)}%`;
}

interface TriageFormProps {
  enabled: boolean;
}

export function TriageForm({ enabled }: TriageFormProps) {
  const [state, formAction, pending] = useActionState(
    triagePullRequest,
    initialState,
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Pull request summary</CardTitle>
          <CardDescription>
            Paste a PR description. Do not paste secrets, credentials, or
            confidential customer data: the text is sent to TypeSafe AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <label htmlFor="summary" className="sr-only">
              Pull request summary
            </label>
            <textarea
              id="summary"
              name="summary"
              required
              rows={10}
              maxLength={MAX_SUMMARY_LENGTH}
              defaultValue={exampleSummary}
              disabled={!enabled}
              aria-describedby="triage-status"
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
            />
            <Button type="submit" disabled={!enabled || pending}>
              {pending ? "Triaging…" : "Triage with Jev"}
            </Button>
            <p
              id="triage-status"
              aria-live="polite"
              className="text-sm text-muted-foreground"
            >
              {!enabled
                ? "Jev is not configured on this deployment."
                : state.status === "error"
                  ? state.message
                  : null}
            </p>
          </form>
        </CardContent>
      </Card>

      {state.status === "success" ? (
        <TriageResultCard view={state.view} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Advisory decision</CardTitle>
            <CardDescription>
              Jev returns bounded decisions with probabilities: a risk score, a
              review path, and two yes/no signals. It proposes; a human reviewer
              decides.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}

function TriageResultCard({ view }: { view: TriageView }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advisory decision</CardTitle>
        <CardDescription>
          Model {view.model} · {view.usage.inputTokens} input /{" "}
          {view.usage.outputTokens} output tokens. Not a merge approval.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="font-medium">Risk score</dt>
            <dd className="text-muted-foreground">
              {view.risk.score.toFixed(2)} / 3 · {view.risk.level} (confidence{" "}
              {formatPercent(view.risk.confidence)})
            </dd>
          </div>
          <div>
            <dt className="font-medium">Review path</dt>
            <dd className="space-y-2 text-muted-foreground">
              <p>
                <Badge variant="secondary">{view.reviewPath.choice}</Badge>{" "}
                {view.reviewPath.description}
              </p>
              <ul className="flex flex-wrap gap-2">
                {Object.entries(view.reviewPath.probabilities).map(
                  ([path, probability]) => (
                    <li key={path}>
                      <Badge variant="outline">
                        {path} {formatPercent(probability)}
                      </Badge>
                    </li>
                  ),
                )}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="font-medium">Touches a sensitive surface</dt>
            <dd className="text-muted-foreground">
              {formatPercent(view.touchesSensitiveSurface)} probability
            </dd>
          </div>
          <div>
            <dt className="font-medium">Includes test evidence</dt>
            <dd className="text-muted-foreground">
              {formatPercent(view.hasTestEvidence)} probability
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
