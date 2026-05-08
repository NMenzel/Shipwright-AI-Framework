import { expect, test } from "@playwright/test";

test("homepage loads and shows the main heading", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /production-oriented framework for using AI/i,
    }),
  ).toBeVisible();
});

test("primary navigation reaches the prompt library", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Prompt Library" }).first().click();

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Governed prompts for responsible AI-assisted delivery.",
    }),
  ).toBeVisible();
});
