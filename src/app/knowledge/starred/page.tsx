import type { Metadata } from "next";

import { DocsLayout } from "@/components/docs/DocsLayout";
import { getKnowledgeCorpus } from "@/lib/docs/get-docs";

export const metadata: Metadata = {
  title: "Starred Docs",
  description:
    "Important Markdown research and standards marked by filename in the AI-Assisted Delivery Lab.",
};

export default function StarredDocsPage() {
  return <DocsLayout corpus={getKnowledgeCorpus()} view="starred" />;
}
