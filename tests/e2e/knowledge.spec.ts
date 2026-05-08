import { expect, test } from "@playwright/test";

test("knowledge viewer loads the read-only landing state", async ({ page }) => {
  await page.goto("/knowledge");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /read-only research and delivery documentation/i,
    }),
  ).toBeVisible();

  await expect(page.getByRole("searchbox", { name: /search documents/i }).first()).toBeVisible();
  await expect(page.getByText(/upload/i)).toHaveCount(0);
  await expect(page.getByText(/^edit$/i)).toHaveCount(0);
  await expect(page.getByText(/delete/i)).toHaveCount(0);
  await expect(page.getByText(/^save$/i)).toHaveCount(0);
});

test("knowledge document route renders Markdown and navigation", async ({
  page,
}) => {
  await page.goto("/knowledge/readme");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Shipwright AI Framework Documentation",
    }),
  ).toBeVisible();

  await expect(page.getByRole("navigation", { name: /document breadcrumbs/i })).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});
