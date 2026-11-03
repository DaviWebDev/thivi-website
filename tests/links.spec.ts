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

  test("test phone and email links", async ({ page }) => {
    const item = page.locator(".hero__item");

    await expect(
      item.getByRole("link", { name: "+1-2345-2345" }),
    ).toHaveAttribute("href", "tel:+1-2345-2345");
    await expect(
      item.getByRole("link", { name: "contact@thivi.com.au" }),
    ).toHaveAttribute("href", "mailto:contact@thivi.com.au");
  });
});
