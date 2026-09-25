import { choice, noul, score, type SystemOneResult } from "@typesafe-ai/sdk";

export const MIN_SUMMARY_LENGTH = 40;
export const MAX_SUMMARY_LENGTH = 4000;

export const riskLevels = [
  "Trivial: documentation, copy, or formatting only.",
  "Low: localized logic change with existing test coverage.",
  "Moderate: cross-module behaviour, API, or data-shape change.",
  "High: authentication, payments, data migrations, infrastructure, or security-sensitive code.",
] as const;

export const reviewPaths = {
  standard: "A standard peer review is sufficient.",
  security:
    "Needs a security reviewer: auth, secrets, user data, or untrusted input handling.",
  accessibility:
    "Needs an accessibility reviewer: user-facing UI, focus, semantics, or contrast.",
  architecture:
    "Needs an architecture reviewer: new boundaries, dependencies, or cross-cutting patterns.",
} as const;

export type ReviewPath = keyof typeof reviewPaths;

export const triageQuestions = {
  risk: score(
    "How much production risk does this pull request carry?",
    riskLevels,
  ),
  reviewPath: choice(
    "Which human review path should this pull request follow?",
    reviewPaths,
  ),
  touchesSensitiveSurface: noul(
    "Does this change touch authentication, authorization, secrets, personal data, or handling of untrusted input?",
  ),
  hasTestEvidence: noul(
    "Does the description include concrete test evidence, such as named tests added or commands run with results?",
  ),
};

export type TriageResult = SystemOneResult<typeof triageQuestions>;

export interface TriageView {
  risk: {
    score: number;
    level: string;
    confidence: number;
  };
  reviewPath: {
    choice: ReviewPath;
    description: string;
    confidence: number;
    probabilities: Record<ReviewPath, number>;
  };
  touchesSensitiveSurface: number;
  hasTestEvidence: number;
  model: string;
  usage: { inputTokens: number; outputTokens: number };
}

export function toTriageView(result: TriageResult): TriageView {
  const { risk, reviewPath, touchesSensitiveSurface, hasTestEvidence } =
    result.answers;
  const nearestLevel = Math.min(
    riskLevels.length - 1,
    Math.max(0, Math.round(risk.score)),
  );

  return {
    risk: {
      score: risk.score,
      level: riskLevels[nearestLevel],
      confidence: risk.confidence,
    },
    reviewPath: {
      choice: reviewPath.choice,
      description: reviewPaths[reviewPath.choice],
      confidence: reviewPath.confidence,
      probabilities: { ...reviewPath.probabilities },
    },
    touchesSensitiveSurface: touchesSensitiveSurface.noul,
    hasTestEvidence: hasTestEvidence.noul,
    model: result.model,
    usage: {
      inputTokens: result.usage.input_tokens,
      outputTokens: result.usage.output_tokens,
    },
  };
}
