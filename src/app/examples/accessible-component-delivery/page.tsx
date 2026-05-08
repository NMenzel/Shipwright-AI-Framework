import type { Metadata } from "next";

import { MetricCard } from "@/components/cards/MetricCard";
import { PageShell } from "@/components/layout";
import { accessibleComponentWorkflow } from "@/content/examples";

export const metadata: Metadata = {
  title: "Accessible Button Component Delivery",
  description:
    "A complete AI-assisted accessible component delivery example with human requirement, prompts, review, tests, PR summary, and sign-off.",
};

export default function AccessibleComponentDeliveryPage() {
  return (
    <PageShell
      eyebrow={accessibleComponentWorkflow.eyebrow}
      title={accessibleComponentWorkflow.title}
      description={accessibleComponentWorkflow.description}
      cta={{ label: "Back to examples", href: "/examples" }}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {accessibleComponentWorkflow.steps.map((step) => (
          <MetricCard
            key={step.title}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </PageShell>
  );
}
