import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { ChecklistCard } from "@/components/cards/ChecklistCard";
import { MetricCard } from "@/components/cards/MetricCard";
import { SectionHeading } from "@/components/content/SectionHeading";
import { Container } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  evaluationMetrics,
  homepagePillars,
  labContents,
  qualityGates,
  workflowSteps,
} from "@/content/home";

export default function Home() {
  return (
    <main id="main-content">
      <section className="border-b border-border bg-card/40">
        <Container className="grid gap-10 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:py-20">
          <div className="space-y-7">
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary">Responsible AI</Badge>
              <Badge variant="secondary">Human-reviewed workflows</Badge>
              <Badge variant="secondary">Production delivery</Badge>
            </div>
            <div className="max-w-4xl space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                AI-Assisted Delivery Lab
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
                A production-oriented framework for using AI in software
                delivery without weakening engineering accountability.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                Explore responsible AI usage policies, prompt-library
                governance, PR review checklists, context engineering
                templates, security guardrails, token-optimization patterns,
                and evaluation methods for modern engineering teams.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/operating-model">
                  Explore the Workflow
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/prompt-library">View Prompt Library</Link>
              </Button>
            </div>
          </div>

          <Card className="border-primary/20 bg-background/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
                Operating principle
              </CardTitle>
              <CardDescription>
                AI output is a reviewed contribution, not an approved decision.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                AI can propose, draft, summarize, and accelerate. Humans remain
                accountable for architecture, security, compliance, customer
                impact, and production approval.
              </p>
              <p>
                The lab uses source-informed and expert-review-ready language.
                It does not claim legal, compliance, security, or accessibility
                certification.
              </p>
            </CardContent>
          </Card>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <section aria-labelledby="problem" className="space-y-8">
          <SectionHeading
            id="problem"
            eyebrow="Problem statement"
            title="AI delivery fails when speed is treated as the control."
            description="The useful question is not whether AI can generate output. The useful question is whether the workflow preserves accountability, evidence, security, accessibility, and maintainability."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {homepagePillars.map((pillar) => (
              <MetricCard
                key={pillar.title}
                title={pillar.title}
                description={pillar.description}
              />
            ))}
          </div>
        </section>

        <Separator className="my-14" />

        <section aria-labelledby="contents" className="space-y-8">
          <SectionHeading
            id="contents"
            eyebrow="What the lab contains"
            title="A governed workflow system, not a prompt dump."
            description="Each module exists to make AI-assisted delivery reviewable, repeatable, and safe enough for production-minded teams."
          />
          <ChecklistCard
            title="Core modules"
            description="The public app mirrors the repository documentation."
            items={labContents}
          />
        </section>

        <Separator className="my-14" />

        <section aria-labelledby="workflow" className="space-y-8">
          <SectionHeading
            id="workflow"
            eyebrow="Example workflow"
            title="AI-assisted delivery with explicit human control."
            description="The model keeps ownership clear from requirement definition through implementation, review, and final sign-off."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {workflowSteps.map((step) => (
              <MetricCard
                key={step.title}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </section>

        <Separator className="my-14" />

        <section aria-labelledby="quality-gates" className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <SectionHeading
              id="quality-gates"
              eyebrow="Quality gates"
              title="Human checkpoints make the workflow auditable."
              description="The system makes explicit which decisions cannot be delegated to an AI tool."
            />
            <Button asChild variant="outline">
              <Link href="/ai-pr-review">Review AI PR Guidelines</Link>
            </Button>
          </div>
          <ChecklistCard title="Required gates" items={qualityGates} />
        </section>

        <Separator className="my-14" />

        <section aria-labelledby="metrics" className="space-y-8">
          <SectionHeading
            id="metrics"
            eyebrow="Evaluation"
            title="Responsible adoption has to be measured."
            description="The lab tracks whether AI assistance improves delivery quality or simply moves correction work into review."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {evaluationMetrics.map((metric) => (
              <Card key={metric}>
                <CardHeader>
                  <CardTitle className="text-base">{metric}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
