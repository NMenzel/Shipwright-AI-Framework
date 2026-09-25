"use server";

import {
  APIConnectionError,
  AuthenticationError,
  RateLimitError,
} from "@typesafe-ai/sdk";

import { getJevClient } from "@/lib/jev/client";
import {
  MAX_SUMMARY_LENGTH,
  MIN_SUMMARY_LENGTH,
  toTriageView,
  triageQuestions,
  type TriageView,
} from "@/lib/jev/triage";

export type TriageState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; view: TriageView };

export async function triagePullRequest(
  _previousState: TriageState,
  formData: FormData,
): Promise<TriageState> {
  const summary = formData.get("summary");

  if (typeof summary !== "string") {
    return { status: "error", message: "Enter a pull request summary." };
  }

  const trimmed = summary.trim();

  if (trimmed.length < MIN_SUMMARY_LENGTH) {
    return {
      status: "error",
      message: `The summary must be at least ${MIN_SUMMARY_LENGTH} characters.`,
    };
  }

  if (trimmed.length > MAX_SUMMARY_LENGTH) {
    return {
      status: "error",
      message: `The summary must be at most ${MAX_SUMMARY_LENGTH} characters.`,
    };
  }

  const client = getJevClient();

  if (!client) {
    return {
      status: "error",
      message:
        "Jev is not configured on this deployment. Set TYPESAFE_API_KEY on the server to enable it.",
    };
  }

  try {
    const result = await client.systemOne({
      state: { pullRequestSummary: trimmed },
      questions: triageQuestions,
    });

    return { status: "success", view: toTriageView(result) };
  } catch (error) {
    return { status: "error", message: describeError(error) };
  }
}

function describeError(error: unknown) {
  if (error instanceof RateLimitError) {
    return "Jev rate limit reached. Try again shortly.";
  }

  if (error instanceof AuthenticationError) {
    return "Jev rejected the server's API key.";
  }

  if (error instanceof APIConnectionError) {
    return "Jev could not be reached. Try again shortly.";
  }

  return "Jev could not triage this summary.";
}
