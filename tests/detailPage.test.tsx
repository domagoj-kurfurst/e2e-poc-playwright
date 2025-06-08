// import { test, expect } from "@playwright/test";

// test("move to detail page and go back to application list", async ({
//   page,
// }) => {
//   await page.goto("http://localhost:3000");

//   const taskMasterCard = page
//     .locator('[data-testid="app-card"]')
//     .filter({ hasText: "TaskMaster" })
//     .first();

//   const appNameLink = taskMasterCard.locator('[data-testid="app-name"]');
//   await appNameLink.click();

//   // Optional: wait for the detail page to load
//   await page.waitForURL(/\/app\/\w+/); // or exact match if known
//   await page.waitForTimeout(1000); // Just to observe

//   // Find the favorite button inside that card
//   const favoriteButton = page.locator(
//     'button[data-testid="favorite-button"]'
//   );
//   await page.waitForTimeout(500);

//   // Click the favorite button to mark TaskMaster as favorite
//   await favoriteButton.click();
//   await page.waitForTimeout(1000);
//   // Assert the heart icon has the filled red class after clicking (favorite marked)
//   const heartIcon = page.locator('svg[data-testid="heart-icon"]');
//   await expect(heartIcon).toHaveClass(/fill-red-500/);
//   await page.waitForTimeout(1000);

//   // Go back to the application list
//   await page.goBack();
//   await page.waitForTimeout(1600);

//   // Wait for list page to reload
//   await page.waitForURL("http://localhost:3000");
//   await expect(page.locator("h1")).toHaveText("Application Store");
// });