import { test, expect } from "@playwright/test";

test.describe("Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays the copyright", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await expect(footer).toContainText(/©\s*\d{4}\s+Thivi Edu\./);
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
    await expect(
      companyNav.getByRole("link", { name: "Privacy policy" }),
    ).toHaveAttribute("href", "/privacy-policy");
  });

  test("does not display unconfigured social links", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await expect(
      footer.getByRole("link", {
        name: /^(Twitter|Facebook|Instagram|LinkedIn)$/,
      }),
    ).toHaveCount(0);
  });
});
