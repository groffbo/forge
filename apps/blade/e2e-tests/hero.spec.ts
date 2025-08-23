// tests/hero.spec.ts
import { expect, test } from "@playwright/test";

test.describe("Hero", () => {
  test("renders copy, sign-in, sponsor link, and hero image", async ({
    page,
  }) => {
    // Assumes baseURL is set; otherwise replace "/" with the full URL
    await page.goto("/");

    // Heading (h1)
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Everything Knight Hacks, in");

    // Gradient subline inside the heading ("one platform.")
    await expect(page.getByText("one platform.")).toBeVisible();

    // Subtitle paragraph
    await expect(
      page.getByText(
        "Manage your Knight Hacks membership, hackathon information, and more with Blade.",
      ),
    ).toBeVisible();

    // Sign-in button (server action is not executed in this test; just verify UI)
    // Icon has no accessible label, so assert on the button text only.
    const signInBtn = page.getByRole("button", { name: /Sign in with/i });
    await expect(signInBtn).toBeVisible();

    // Sponsor CTA is a Next <Link/> wrapping a button; assert the link and its href
    const sponsorLink = page.getByRole("link", { name: "Sponsor us!" });
    await expect(sponsorLink).toBeVisible();
    await expect(sponsorLink).toHaveAttribute("href", "/sponsor");

    // Hero image
    const heroImg = page.getByRole("img", { name: "Hero image" });
    await expect(heroImg).toBeVisible();
  });

  test("sponsor link is navigable", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Sponsor us!" }).click();
    await expect(page).toHaveURL(/\/sponsor$/);
  });
});
