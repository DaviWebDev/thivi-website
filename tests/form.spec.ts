import { expect, test } from "@playwright/test";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("shows messages when required fields are empty", async ({ page }) => {
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.locator('[data-js="name-alert"]')).toHaveText(
      "A name must be entered",
    );
    await expect(page.locator('[data-js="email-alert"]')).toHaveText(
      "An email must be entered",
    );
  });

  test("shows messages for invalid name and email", async ({ page }) => {
    await page.getByRole("textbox", { name: "Your name" }).fill("Davi123");
    await expect(page.locator('[data-js="name-alert"]')).toHaveText(
      "The name cannot contain numbers or special characters.",
    );

    await page.getByRole("textbox", { name: "Your email" }).fill("invalid");
    await expect(page.locator('[data-js="email-alert"]')).toHaveText(
      "Email format is invalid",
    );
  });

  test("shows success and clears the fields after valid submission", async ({
    page,
  }) => {
    const nameInput = page.getByRole("textbox", { name: "Your name" });
    const emailInput = page.getByRole("textbox", { name: "Your email" });

    await nameInput.fill("Davi Silva");
    await emailInput.fill("davi@example.com");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.locator('[data-js="form-message"]')).toContainText(
      "This demo form does not send messages yet.",
    );
    await expect(nameInput).toBeEmpty();
    await expect(emailInput).toBeEmpty();
  });
});
