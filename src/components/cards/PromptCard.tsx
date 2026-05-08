import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PromptDefinition } from "@/content/prompts";

interface PromptCardProps {
  prompt: PromptDefinition;
}

export function PromptCard({ prompt }: PromptCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {prompt.category}
        </p>
        <CardTitle>
          <Link
            href={`/prompt-library/${prompt.slug}`}
            className="rounded-sm outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {prompt.title}
          </Link>
        </CardTitle>
        <CardDescription>{prompt.purpose}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <div>
          <p className="font-medium text-foreground">When to use</p>
          <p>{prompt.whenToUse}</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Human review</p>
          <p>{prompt.humanReview}</p>
        </div>
      </CardContent>
    </Card>
  );
}
