import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PromptCard } from "@/components/cards/PromptCard";
import { promptDefinitions } from "@/content/prompts";

describe("PromptCard", () => {
  it("renders prompt governance metadata", () => {
    render(<PromptCard prompt={promptDefinitions[0]} />);

    expect(
      screen.getByRole("link", { name: "Small Feature Implementation" }),
    ).toHaveAttribute("href", "/prompt-library/coding");
    expect(screen.getByText("Human review")).toBeInTheDocument();
    expect(screen.getByText("Required before merge.")).toBeInTheDocument();
  });
});
