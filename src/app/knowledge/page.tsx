import type { Metadata } from "next";

import { DocsLayout } from "@/components/docs/DocsLayout";
import { getKnowledgeCorpus } from "@/lib/docs/get-docs";

export const metadata: Metadata = {
  title: "Knowledge Viewer",
  description:
    "Read-only Markdown research and standards viewer for the AI-Assisted Delivery Lab.",
};

export default function KnowledgePage() {
  return <DocsLayout corpus={getKnowledgeCorpus()} />;
}
