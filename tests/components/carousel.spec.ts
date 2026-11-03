import { test, expect } from "@playwright/test";

test.describe("Carousel", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
  });

  test("displays the three course cards", async ({ page }) => {
    const carousel = page.getByRole("region", { name: "Our Courses" });

    await expect(carousel).toBeVisible();
    await expect(carousel.locator(".carousel__card")).toHaveCount(3);
  });

  test("advances to the next page using the button", async ({ page }) => {
    const carousel = page.getByRole("region", { name: "Our Courses" });
    const next = carousel.getByRole("button", { name: "Next slide" });
    const previous = carousel.getByRole("button", { name: "Previous slide" });
    const dots = carousel.getByRole("group", { name: "Carousel pages" });
    const pages = dots.getByRole("button");

    await carousel.evaluate((element) =>
      element.scrollIntoView({ block: "center" }),
    );
    await expect(next).toBeInViewport();
    await expect(next).toBeEnabled();
    await expect(previous).toBeDisabled();
    await expect(pages.nth(1)).toBeVisible();
    await expect(pages.nth(0)).toHaveAttribute("aria-current", "true");

    await next.click();

    await expect(pages.nth(1)).toHaveAttribute("aria-current", "true");
  });

  test("returns to the previous page using the button", async ({ page }) => {
    const carousel = page.getByRole("region", { name: "Our Courses" });
    const next = carousel.getByRole("button", { name: "Next slide" });
    const previous = carousel.getByRole("button", { name: "Previous slide" });
    const pages = carousel
      .getByRole("group", { name: "Carousel pages" })
      .getByRole("button");

    await carousel.evaluate((element) =>
      element.scrollIntoView({ block: "center" }),
    );
    await expect(next).toBeInViewport();
    await expect(next).toBeEnabled();
    await expect(pages.nth(0)).toHaveAttribute("aria-current", "true");
    await next.click();
    await expect(pages.nth(1)).toHaveAttribute("aria-current", "true");

    await previous.click();

    await expect(previous).toBeDisabled();
    await expect(pages.nth(0)).toHaveAttribute("aria-current", "true");
  });

  test("pagination indicators navigate to the selected page", async ({
    page,
  }) => {
    const carousel = page.getByRole("region", { name: "Our Courses" });
    const pages = carousel
      .getByRole("group", { name: "Carousel pages" })
      .getByRole("button");

    await carousel.evaluate((element) =>
      element.scrollIntoView({ block: "center" }),
    );
    await expect(pages.nth(1)).toBeInViewport();
    await expect(pages.nth(1)).toBeVisible();
    await expect(pages.nth(0)).toHaveAttribute("aria-current", "true");
    await pages.nth(1).click();

    await expect(pages.nth(1)).toHaveAttribute("aria-current", "true");
  });
});
