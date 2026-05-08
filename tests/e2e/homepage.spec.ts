import { expect, test } from "@playwright/test";

test("homepage loads and shows the main heading", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Production-ready Next.js foundation for maintainable frontend projects.",
    }),
  ).toBeVisible();
});
