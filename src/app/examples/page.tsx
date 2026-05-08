import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const examples = [
  {
    title: "Accessible Button Component Delivery",
    href: "/examples/accessible-component-delivery",
    description:
      "A complete feature delivery flow from human requirement through prompts, review, tests, and sign-off.",
  },
  {
    title: "AI-Assisted PR Review",
    href: "/ai-pr-review",
    description:
      "How AI review support is constrained so final approval remains human-owned.",
  },
  {
    title: "AI-Assisted Security Review",
    href: "/security",
    description:
      "Threat-focused review flow for data exposure, permissions, dependencies, and generated vulnerabilities.",
  },
  {
    title: "AI-Assisted Accessibility Review",
    href: "/accessibility-workflow",
    description:
      "Human-reviewed accessibility triage and remediation support without compliance overclaiming.",
  },
];

export const metadata: Metadata = {
  title: "Example Workflows",
  description:
    "Practical examples for AI-assisted delivery, PR review, security review, and accessibility review.",
};

export default function ExamplesPage() {
  return (
    <PageShell
      eyebrow="Examples"
      title="Practical AI-assisted delivery workflows."
      description="Examples show how the operating model works in real engineering flows rather than as abstract policy."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {examples.map((example) => (
          <Card key={example.href} className="h-full">
            <CardHeader>
              <CardTitle>
                <Link
                  href={example.href}
                  className="rounded-sm outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {example.title}
                </Link>
              </CardTitle>
              <CardDescription>{example.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
