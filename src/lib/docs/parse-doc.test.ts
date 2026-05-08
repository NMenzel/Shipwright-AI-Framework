import { describe, expect, it } from "vitest";

import { getTableOfContents } from "@/lib/docs/get-table-of-contents";
import { parseKnowledgeDocument } from "@/lib/docs/parse-doc";
import { buildDocTree } from "@/lib/docs/build-doc-tree";

const markdown = `---
id: research.token-optimization-briefing
title: Token Optimization and Responsible AI Integration
description: Research briefing on token optimization and governance.
type: research
status: draft
validation_status: source-informed
risk_level: medium
owner: engineering
tags:
  - token-optimization
  - responsible-ai
related:
  - standard.token-optimization
updated: 2026-05-08
---

# Ignored H1

## Executive Summary

### Evidence Model

## Executive Summary
`;

describe("knowledge document parsing", () => {
  it("parses frontmatter and preserves Markdown body content", () => {
    const document = parseKnowledgeDocument(
      markdown,
      "research/token-optimization-briefing.md",
    );

    expect(document.id).toBe("research.token-optimization-briefing");
    expect(document.title).toBe(
      "Token Optimization and Responsible AI Integration",
    );
    expect(document.type).toBe("research");
    expect(document.status).toBe("draft");
    expect(document.validationStatus).toBe("source-informed");
    expect(document.riskLevel).toBe("medium");
    expect(document.tags).toEqual(["token-optimization", "responsible-ai"]);
    expect(document.related).toEqual(["standard.token-optimization"]);
    expect(document.path).toBe("/knowledge/research/token-optimization-briefing");
    expect(document.isStarred).toBe(false);
    expect(document.content).toContain("## Executive Summary");
  });

  it("marks important filename documents as starred without leaking marker into routes", () => {
    const document = parseKnowledgeDocument(markdown, "research/briefing.I.md");

    expect(document.isStarred).toBe(true);
    expect(document.slug).toBe("research/briefing");
    expect(document.path).toBe("/knowledge/research/briefing");
  });

  it("generates h2/h3 table of contents with duplicate-safe ids", () => {
    expect(getTableOfContents(markdown)).toEqual([
      { id: "executive-summary", title: "Executive Summary", level: 2 },
      { id: "evidence-model", title: "Evidence Model", level: 3 },
      { id: "executive-summary-2", title: "Executive Summary", level: 2 },
    ]);
  });

  it("builds a folder-first document tree", () => {
    const first = parseKnowledgeDocument(markdown, "research/briefing.md");
    const second = parseKnowledgeDocument(
      "# Security\n\n## Controls",
      "security/prompt-injection-controls.md",
    );
    const tree = buildDocTree([second, first]);

    expect(tree.map((node) => node.segment)).toEqual(["research", "security"]);
    expect(tree[0].documents[0].title).toBe(
      "Token Optimization and Responsible AI Integration",
    );
  });
});
