import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DocsReader } from "@/components/docs/DocsReader";
import type { KnowledgeDocument } from "@/lib/docs/types";

const document: KnowledgeDocument = {
  id: "research.example",
  title: "Example Research",
  description: "A rendered Markdown example.",
  type: "research",
  status: "draft",
  validationStatus: "source-informed",
  riskLevel: "medium",
  owner: "engineering",
  tags: ["research"],
  related: [],
  updated: "2026-05-08",
  isStarred: true,
  slug: "research/example",
  slugSegments: ["research", "example"],
  path: "/knowledge/research/example",
  relativePath: "research/example.md",
  toc: [{ id: "findings", title: "Findings", level: 2 }],
  content: `
## Findings

- [x] Reviewed

| Area | Status |
| --- | --- |
| Controls | Read-only |

![Workflow](/docs-media/images/example-dashboard.png)

<video controls src="/docs-media/videos/workflow-demo.mp4"></video>

<script>alert("blocked")</script>
`,
};

describe("DocsReader", () => {
  it("renders Markdown content and safe media without script execution markup", () => {
    const { container } = render(<DocsReader document={document} />);

    expect(screen.getByRole("heading", { name: "Findings" })).toHaveAttribute(
      "id",
      "findings",
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByAltText("Workflow")).toHaveAttribute(
      "src",
      "/docs-media/images/example-dashboard.png",
    );
    expect(container.querySelector("video")).toHaveAttribute(
      "src",
      "/docs-media/videos/workflow-demo.mp4",
    );
    expect(container.querySelector("script")).not.toBeInTheDocument();
  });
});
