import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders a button with its accessible name", () => {
    render(<Button>Review quality gates</Button>);

    expect(
      screen.getByRole("button", { name: "Review quality gates" }),
    ).toBeInTheDocument();
  });

  it("does not call the click handler when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "Disabled" }));

    expect(handleClick).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
  });

  it("supports shadcn-style asChild rendering for links", () => {
    render(
      <Button asChild variant="link">
        <a href="/docs">Read the docs</a>
      </Button>,
    );

    expect(screen.getByRole("link", { name: "Read the docs" })).toHaveAttribute(
      "href",
      "/docs",
    );
  });
});
