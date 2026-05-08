import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ChecklistCard } from "@/components/cards/ChecklistCard";

describe("ChecklistCard", () => {
  it("renders every checklist item", () => {
    render(
      <ChecklistCard
        title="Review gates"
        items={["Architecture review", "Security review"]}
      />,
    );

    expect(screen.getByText("Review gates")).toBeInTheDocument();
    expect(screen.getByText("Architecture review")).toBeInTheDocument();
    expect(screen.getByText("Security review")).toBeInTheDocument();
  });
});
