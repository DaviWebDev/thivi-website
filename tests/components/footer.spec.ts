import { test, expect } from "@playwright/test";

test.describe("Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays the copyright", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await expect(footer).toContainText(/©\s*Thivi, Edu\.\s+\d{4}/);
  });

  test("navigation links lead to corresponding pages", async ({ page }) => {
    const companyNav = page.getByRole("navigation", {
      name: "Company menu",
    });

    await expect(
      companyNav.getByRole("link", { name: "About us" }),
    ).toHaveAttribute("href", "/about");
    await expect(
      companyNav.getByRole("link", { name: "Contact us" }),
    ).toHaveAttribute("href", "/contact");
  });

  test("displays accessible social links", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    const socialNames = ["Twitter", "Facebook", "Instagram", "LinkedIn"];

    for (const name of socialNames) {
      const link = footer.getByRole("link", { name });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", /.+/);
    }
  });
});
