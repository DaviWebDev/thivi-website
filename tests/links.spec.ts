import { test, expect } from "@playwright/test";
import { affiliationsData } from "../src/data/affiliations";
const programsData = [
  {
    slug: "leadership-and-management",
    title: "Cert IV in Leadership & Management",
  },
  {
    slug: "digital-marketing-and-communication",
    title: "Cert IV in Digital Marketing and Communication",
  },
  {
    slug: "hospitality",
    title: "Cert IV in Hospitality",
  },
];

const newsData = [
  {
    slug: "leadership-workshop-for-kitchen-managers",
  },
  {
    slug: "student-portal-is-live",
  },
  {
    slug: "new-hotel-partnership",
  },
];

test.describe("Home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Thivi/);
  });

  test("link redirect for about page", async ({ page }) => {
    const aboutSection = page.getByRole("main").locator("section").nth(1);
    const learnMoreLink = aboutSection.getByRole("link", {
      name: "Learn More",
    });

    await expect(learnMoreLink).toHaveAttribute("href", "/about");
    await learnMoreLink.click();

    await expect(page).toHaveURL(/\/about\/?$/);
  });
});

test.describe("Programs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/programs");
    await expect(page).toHaveTitle(/Programs/);
  });

  test("program links point to their corresponding pages", async ({ page }) => {
    const programCards = page.getByRole("main").locator("section > ul > li");

    await expect(programCards).toHaveCount(programsData.length);

    for (const [index, { title, slug }] of programsData.entries()) {
      const card = programCards.nth(index);
      const link = card.getByRole("link", { name: title });

      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", `/programs/${slug}`);
    }
  });
});

test.describe("Affiliations", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/affiliations");
    await expect(page).toHaveTitle(/Affiliations/);
  });

  test("contact links have the expected destinations", async ({ page }) => {
    const cards = page
      .getByRole("main")
      .locator("section > ul > li")
      .getByRole("article");

    await expect(cards).toHaveCount(affiliationsData.length);

    for (const [i, { info }] of affiliationsData.entries()) {
      const card = cards.nth(i);
      const infoRows = card.locator(".info");

      await expect(card).toBeVisible();

      const emailRow = infoRows.nth(1);
      const emailLink = emailRow.getByRole("link", { name: info.email.label });
      await expect(emailLink).toHaveAttribute("href", info.email.href);

      const phoneRow = infoRows.nth(2);
      const phoneLink = phoneRow.getByRole("link", { name: info.phone.label });
      await expect(phoneLink).toHaveAttribute("href", info.phone.href);
    }
  });
});

test.describe("News", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/news");
    await expect(page).toHaveTitle(/News/);
  });

  test("cards links point to their corresponding pages", async ({ page }) => {
    const cards = page
      .getByRole("main")
      .locator("section > div > ul > li")
      .getByRole("article");

    await expect(cards).toHaveCount(newsData.length);

    for (const [i, { slug }] of newsData.entries()) {
      const card = cards.nth(i);
      const cardLink = card.getByRole("link", { name: "Read More" });

      await expect(card).toBeVisible();
      await expect(cardLink).toHaveAttribute("href", `/news/${slug}`);
    }
  });
});

test.describe("Contact", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact/);
  });

  test("email link uses the published contact address", async ({ page }) => {
    const item = page.locator(".hero__item");

    await expect(
      item.getByRole("link", { name: "contact@thivi.com.au" }),
    ).toHaveAttribute("href", "mailto:contact@thivi.com.au");
  });

  test("requires a choice before showing the embedded map", async ({
    page,
  }) => {
    await expect(
      page.getByRole("button", { name: "Allow Google Maps" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Show map" })).toBeHidden();
    await expect(page.locator("[data-map-frame] iframe")).toHaveCount(0);
  });

  test("rejection shows the alternative and persists after reload", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Decline" }).click();

    await expect(page.locator("[data-map-consent]")).toBeHidden();
    await expect(page.locator("[data-map-fallback]")).toContainText(
      "You chose not to load the embedded Google Map.",
    );
    await expect(page.getByRole("button", { name: "Show map" })).toBeHidden();
    await expect
      .poll(() =>
        page.evaluate(() => localStorage.getItem("thivi-google-maps-consent")),
      )
      .toBe("rejected");

    await page.reload();

    await expect(page.locator("[data-map-consent]")).toBeHidden();
    await expect(page.locator("[data-map-fallback]")).toContainText(
      "You chose not to load the embedded Google Map.",
    );
    await expect(page.getByRole("button", { name: "Show map" })).toBeHidden();
  });

  test("acceptance reveals the map button without loading until clicked", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Allow Google Maps" }).click();

    const showMapButton = page.getByRole("button", { name: "Show map" });
    await expect(showMapButton).toBeVisible();
    await expect(page.locator("[data-map-consent]")).toBeVisible();
    await expect(page.locator("[data-map-consent-options]")).toBeHidden();
    await expect(page.locator("[data-map-frame] iframe")).toHaveCount(0);
    await expect
      .poll(() =>
        page.evaluate(() => localStorage.getItem("thivi-google-maps-consent")),
      )
      .toBe("accepted");

    await page.route("https://www.google.com/maps/embed**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/html",
        body: "<!doctype html><title>Map test</title>",
      }),
    );
    await showMapButton.click();

    await expect(page.locator("[data-map-frame] iframe")).toHaveAttribute(
      "src",
      /^https:\/\/www\.google\.com\/maps\/embed/,
    );
  });

  test("changing the choice removes the saved preference", async ({ page }) => {
    await page.getByRole("button", { name: "Allow Google Maps" }).click();
    await page.getByRole("button", { name: "Change map preference" }).click();

    await expect(
      page.getByRole("button", { name: "Allow Google Maps" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Show map" })).toBeHidden();
    await expect
      .poll(() =>
        page.evaluate(() => localStorage.getItem("thivi-google-maps-consent")),
      )
      .toBeNull();
  });
});

test.describe("Privacy policy", () => {
  test("explains the map preference and demo form behavior", async ({
    page,
  }) => {
    await page.goto("/privacy-policy");

    await expect(
      page.getByRole("heading", { name: "Privacy Policy", level: 1 }),
    ).toBeVisible();
    await expect(page.getByText("thivi-google-maps-consent")).toBeVisible();
    await expect(
      page.getByText(
        "The contact form on this demonstration site is not connected to a server.",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Google’s Privacy Policy" }),
    ).toHaveAttribute("href", "https://policies.google.com/privacy");
  });
});
