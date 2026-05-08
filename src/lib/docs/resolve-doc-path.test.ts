import { describe, expect, it } from "vitest";

import {
  createSlugFromRelativePath,
  hasImportantFilenameMarker,
  isSafeSlugSegments,
  resolveDocsRelativePath,
} from "@/lib/docs/resolve-doc-path";

describe("knowledge document path resolution", () => {
  it("creates stable viewer slugs from docs paths", () => {
    expect(
      createSlugFromRelativePath(
        "research/AI_Engineering_Standard_and_Responsible_Integration_Summary.md",
      ),
    ).toBe("research/ai-engineering-standard-and-responsible-integration-summary");
  });

  it("uses directory slug for nested README documents", () => {
    expect(createSlugFromRelativePath("prompt-library/README.md")).toBe(
      "prompt-library",
    );
  });

  it("strips the important marker from generated slugs", () => {
    expect(createSlugFromRelativePath("research/token-briefing.I.md")).toBe(
      "research/token-briefing",
    );
    expect(hasImportantFilenameMarker("research/token-briefing.I.md")).toBe(
      true,
    );
    expect(hasImportantFilenameMarker("research/token-briefing.md")).toBe(false);
  });

  it("rejects traversal-style route segments", () => {
    expect(isSafeSlugSegments(["research", "token-optimization"])).toBe(true);
    expect(isSafeSlugSegments(["..", "package-json"])).toBe(false);
    expect(isSafeSlugSegments(["research", "%2e%2e"])).toBe(false);
  });

  it("prevents relative paths from escaping docs root", () => {
    expect(() => resolveDocsRelativePath("../package.json")).toThrow(
      /escapes docs root/i,
    );
  });
});
