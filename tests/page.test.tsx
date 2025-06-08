// command to run 
// yarn playwright test --headed

import { test, expect } from "@playwright/test";

test("toggle dark mode and favorite TaskMaster app", async ({ page }) => {

  // Go to the application dashboard page
  await page.goto("http://localhost:3000"); // adjust URL to your app

  // Verify light mode is active by default
  const root = page.locator("html");
  

  // Toggle dark mode by clicking the dark mode toggle button in ApplicationHeader
  const darkModeToggle = page.locator('[data-testid="dark-mode-toggle"]');
  await darkModeToggle.click();
  await page.waitForTimeout(500);

  // Expect the document root to have 'dark' class after toggling
  await expect(root).toHaveClass(/dark/);
  await page.waitForTimeout(1000);
  // Find the card for TaskMaster app by app name inside cards
  const taskMasterCard = page
    .locator('[data-testid="app-card"]')
    .filter({ hasText: "TaskMaster" })
    .first();

  // Check that TaskMaster card is visible
  await expect(taskMasterCard).toBeVisible();
  await page.waitForTimeout(1000);
  // Find the favorite button inside that card
  const favoriteButton = taskMasterCard.locator(
    'button[data-testid="favorite-button"]'
  );
  await page.waitForTimeout(500);

  // Click the favorite button to mark TaskMaster as favorite
  await favoriteButton.click();
  await page.waitForTimeout(500);
  
  // Assert the heart icon has the filled red class after clicking (favorite marked)
  const heartIcon = favoriteButton.locator('svg[data-testid="heart-icon"]');
  await expect(heartIcon).toHaveClass(/fill-red-500/);
  await page.waitForTimeout(500);

  // Group by tags toggle
  const tagsToggle = page.locator('[data-testid="group-by-tags-toggle"]');
  await tagsToggle.waitFor({ state: "visible" });
  await tagsToggle.click();
  await page.waitForTimeout(780);

  // Revert back to Application view
  await tagsToggle.click();
  await page.waitForTimeout(300);
});

test("move to detail page and go back to application list", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");

  const taskMasterCard = page
    .locator('[data-testid="app-card"]')
    .filter({ hasText: "TaskMaster" })
    .first();

  const appNameLink = taskMasterCard.locator('[data-testid="app-name"]');
  await appNameLink.click();

  // Optional: wait for the detail page to load
  await page.waitForURL(/\/app\/\w+/); // or exact match if known
  await page.waitForTimeout(500);

  // Find the favorite button inside that card
  const favoriteButton = page.locator('button[data-testid="favorite-button"]');
  await page.waitForTimeout(500);

  // Click the favorite button to mark TaskMaster as favorite
  await favoriteButton.click();
  await page.waitForTimeout(1000);

  // Fill the heart icon with red color
  const heartIcon = page.locator('svg[data-testid="heart-icon"]');
  await expect(heartIcon).toHaveClass(/fill-red-500/);
  await page.waitForTimeout(1000);

  // Go back to the application list
  await page.goBack();
  await page.waitForTimeout(1600);

  // Wait for list page to reload
  await page.waitForURL("http://localhost:3000");
  await expect(page.locator("h1")).toHaveText("Application Store");
});
