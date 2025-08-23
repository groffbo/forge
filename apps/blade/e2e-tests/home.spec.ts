// tests/auth-home.spec.ts
import { expect, test } from "@playwright/test";

// Route where <AuthHome /> is rendered (e.g. "/" or "/auth")
const UI_ROUTE = "/";

test.describe("AuthHome", () => {
  test("renders heading, subtitle, and Dashboard link", async ({ page }) => {
    await page.goto(UI_ROUTE);

    // Heading
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Welcome to Blade!",
    );

    // Subtitle
    await expect(
      page.getByText(
        "Manage your Knight Hacks membership, hackathon information, and more!",
      ),
    ).toBeVisible();

    // Link (the Button is wrapped by a Next <Link/>; click the link by accessible name)
    const dashboardLink = page.getByRole("link", { name: /Dashboard/i });
    await expect(dashboardLink).toBeVisible();
    await expect(dashboardLink).toHaveAttribute("href", "/dashboard");

    // Optional: icon presence inside the link (lucide renders an <svg/>)
    await expect(dashboardLink.locator("svg")).toHaveCount(1);
  });

  test("navigates to /dashboard when clicking Dashboard", async ({ page }) => {
    await page.goto(UI_ROUTE);

    await page.getByText("Dashboard").click();

    // Wait for Next.js client-side navigation
    await page.waitForURL("**/dashboard");
    await expect(page).toHaveURL(/\/dashboard$/);
  });
});
