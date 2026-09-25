import { RateLimitError } from "@typesafe-ai/sdk";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TriageResult } from "@/lib/jev/triage";

const systemOne = vi.fn();
const getJevClient = vi.fn();

vi.mock("@/lib/jev/client", () => ({
  getJevClient: () => getJevClient(),
}));

const { triagePullRequest } = await import("./actions");

const validSummary =
  "Adds a password reset endpoint that emails a signed token. Unit tests added for token signing.";

function formWith(summary: string) {
  const formData = new FormData();
  formData.set("summary", summary);
  return formData;
}

const result: TriageResult = {
  model: "jev-latest",
  usage: { input_tokens: 120, output_tokens: 8 },
  answers: {
    risk: {
      type: "score",
      score: 2.6,
      confidence: 0.7,
      legend: {} as TriageResult["answers"]["risk"]["legend"],
      probabilities: { 0: 0.01, 1: 0.09, 2: 0.2, 3: 0.7 },
    },
    reviewPath: {
      type: "choice",
      choice: "security",
      confidence: 0.82,
      probabilities: {
        standard: 0.1,
        security: 0.82,
        accessibility: 0.03,
        architecture: 0.05,
      },
    },
    touchesSensitiveSurface: { type: "noul", noul: 0.94 },
    hasTestEvidence: { type: "noul", noul: 0.61 },
  },
};

describe("triagePullRequest", () => {
  beforeEach(() => {
    systemOne.mockReset();
    getJevClient.mockReset();
    getJevClient.mockReturnValue({ systemOne });
  });

  it("rejects summaries that are too short without calling Jev", async () => {
    const state = await triagePullRequest(
      { status: "idle" },
      formWith("too short"),
    );

    expect(state).toEqual({
      status: "error",
      message: expect.stringContaining("at least"),
    });
    expect(systemOne).not.toHaveBeenCalled();
  });

  it("reports when Jev is not configured", async () => {
    getJevClient.mockReturnValue(null);

    const state = await triagePullRequest(
      { status: "idle" },
      formWith(validSummary),
    );

    expect(state).toEqual({
      status: "error",
      message: expect.stringContaining("TYPESAFE_API_KEY"),
    });
  });

  it("sends the trimmed summary as state and maps the answers", async () => {
    systemOne.mockResolvedValue(result);

    const state = await triagePullRequest(
      { status: "idle" },
      formWith(`  ${validSummary}  `),
    );

    expect(systemOne).toHaveBeenCalledWith(
      expect.objectContaining({
        state: { pullRequestSummary: validSummary },
      }),
    );
    expect(state.status).toBe("success");
    if (state.status !== "success") return;

    expect(state.view.risk.level).toMatch(/^High/);
    expect(state.view.reviewPath.choice).toBe("security");
    expect(state.view.touchesSensitiveSurface).toBe(0.94);
    expect(state.view.usage).toEqual({ inputTokens: 120, outputTokens: 8 });
  });

  it("returns a safe message when Jev is rate limited", async () => {
    systemOne.mockRejectedValue(
      new RateLimitError(429, { error: "rate limited" }, new Headers()),
    );

    const state = await triagePullRequest(
      { status: "idle" },
      formWith(validSummary),
    );

    expect(state).toEqual({
      status: "error",
      message: "Jev rate limit reached. Try again shortly.",
    });
  });
});
