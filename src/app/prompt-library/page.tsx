import type { Metadata } from "next";

import { PromptCard } from "@/components/cards/PromptCard";
import { PageShell } from "@/components/layout";
import { promptDefinitions } from "@/content/prompts";

export const metadata: Metadata = {
  title: "Prompt Library",
  description:
    "Governed prompt categories for coding, refactoring, PR review, security review, accessibility review, architecture review, and token-optimized work.",
};

export default function PromptLibraryPage() {
  return (
    <PageShell
      eyebrow="Prompt library"
      title="Governed prompts for responsible AI-assisted delivery."
      description="Each prompt includes a purpose, when to use it, required inputs, expected output, human review requirement, and failure modes."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {promptDefinitions.map((prompt) => (
          <PromptCard key={prompt.slug} prompt={prompt} />
        ))}
      </div>
    </PageShell>
  );
}
