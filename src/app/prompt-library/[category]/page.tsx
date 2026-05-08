import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ChecklistCard } from "@/components/cards/ChecklistCard";
import { PageShell } from "@/components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPromptDefinition, promptDefinitions } from "@/content/prompts";

interface PromptCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export function generateStaticParams() {
  return promptDefinitions.map((prompt) => ({
    category: prompt.slug,
  }));
}

export async function generateMetadata({
  params,
}: PromptCategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const prompt = getPromptDefinition(category);

  if (!prompt) {
    return {
      title: "Prompt Not Found",
    };
  }

  return {
    title: `${prompt.category} Prompt`,
    description: prompt.purpose,
  };
}

export default async function PromptCategoryPage({
  params,
}: PromptCategoryPageProps) {
  const { category } = await params;
  const prompt = getPromptDefinition(category);

  if (!prompt) {
    notFound();
  }

  return (
    <PageShell
      eyebrow={prompt.category}
      title={prompt.title}
      description={prompt.purpose}
      cta={{ label: "Back to prompt library", href: "/prompt-library" }}
    >
      <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="min-w-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>When to use</CardTitle>
              <CardDescription>{prompt.whenToUse}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Expected output</p>
                <p>{prompt.expectedOutput}</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Human review</p>
                <p>{prompt.humanReview}</p>
              </div>
            </CardContent>
          </Card>
          <ChecklistCard title="Required input" items={prompt.requiredInput} />
          <ChecklistCard title="Failure modes" items={prompt.failureModes} />
        </div>

        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Prompt</CardTitle>
            <CardDescription>
              Adapt placeholders to the task. Keep confidential data out unless
              the tool and data-processing setup explicitly allow it.
            </CardDescription>
          </CardHeader>
          <CardContent className="min-w-0">
            <pre className="max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-border bg-secondary p-4 text-sm leading-6 text-secondary-foreground">
              <code className="break-words">{prompt.prompt}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
