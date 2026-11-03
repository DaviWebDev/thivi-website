import { test, expect } from "@playwright/test";

test.describe("Header", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("logo links to the home page", async ({ page }) => {
    const logo = page.getByRole("link", { name: "Logo Thivi from header" });

    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("href", "/");
  });

  test("navigation links point to the expected pages", async ({ page }) => {
    const nav = page.getByRole("navigation", {
      name: "Navigations options",
    });
    const toggle = page.locator("[data-js='toggle-menu']");

    if (await toggle.isVisible()) {
      await toggle.click();
    }

    await expect(nav.getByRole("link")).toHaveCount(6);
    await expect(nav.getByRole("link", { name: "HOME" })).toHaveAttribute(
      "href",
      "/",
    );
    await expect(nav.getByRole("link", { name: "ABOUT" })).toHaveAttribute(
      "href",
      "/about",
    );
    await expect(nav.getByRole("link", { name: "PROGRAMS" })).toHaveAttribute(
      "href",
      "/programs",
    );
    await expect(
      nav.getByRole("link", { name: "AFFILIATIONS" }),
    ).toHaveAttribute("href", "/affiliations");
    await expect(nav.getByRole("link", { name: "NEWS" })).toHaveAttribute(
      "href",
      "/news",
    );
    await expect(nav.getByRole("link", { name: "CONTACT" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  test("ABOUT link navigates to the corresponding page", async ({ page }) => {
    const nav = page.getByRole("navigation", {
      name: "Navigations options",
    });
    const toggle = page.locator("[data-js='toggle-menu']");

    if (await toggle.isVisible()) {
      await toggle.click();
    }

    await nav.getByRole("link", { name: "ABOUT" }).click();
    await expect(page).toHaveURL(/\/about\/?$/);
    await expect(
      page
        .getByRole("navigation", { name: "Navigations options" })
        .getByRole("link", { name: "ABOUT" }),
    ).toHaveAttribute("aria-current", "page");
  });

  test.describe("mobile menu", () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test("opens and closes", async ({ page }) => {
      const nav = page.getByRole("navigation", {
        name: "Navigations options",
      });
      const toggle = page.locator("[data-js='toggle-menu']");

      await expect(toggle).toBeVisible();
      await expect(nav).toBeHidden();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");

      await toggle.click();
      await expect(nav).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Close navigation menu" }),
      ).toHaveAttribute("aria-expanded", "true");

      await page.getByRole("button", { name: "Close navigation menu" }).click();
      await expect(nav).toBeHidden();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
    });
  });
});
