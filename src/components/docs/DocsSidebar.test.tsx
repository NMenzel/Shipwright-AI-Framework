import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DocsSidebar } from "@/components/docs/DocsSidebar";
import type { KnowledgeTreeSummaryNode } from "@/components/docs/docs-shared";

const tree: KnowledgeTreeSummaryNode[] = [
  {
    title: "Research",
    segment: "research",
    path: "research",
    children: [],
    documents: [
      {
        id: "research.example",
        title: "Example Research",
        description: "Research documentation",
        type: "research",
        status: "draft",
        tags: ["example"],
        related: [],
        slug: "research/example",
        path: "/knowledge/research/example",
        relativePath: "research/example.md",
      },
    ],
  },
];

describe("DocsSidebar", () => {
  it("renders document navigation without mutation controls", () => {
    render(<DocsSidebar tree={tree} activeSlug="research/example" />);

    expect(screen.getAllByText("Example Research").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("searchbox").length).toBeGreaterThan(0);
    expect(screen.queryByText(/upload/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^edit$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/delete/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^save$/i)).not.toBeInTheDocument();
  });
});
