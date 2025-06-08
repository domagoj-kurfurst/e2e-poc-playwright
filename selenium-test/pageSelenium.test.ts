//command to test 
// yarn ts-node pageSelenium.test.ts

const { Builder, By, until } = require("selenium-webdriver");

async function toggleDarkModeAndFavoriteTaskMaster(driver: { get: (arg0: string) => any; findElement: (arg0: any) => any; wait: (arg0: { (): Promise<any>; (): Promise<boolean>; }, arg1: number) => any; findElements: (arg0: any) => any; sleep: (arg0: number) => any; }) {
  await driver.get("http://localhost:3000");

  // Verify light mode is active by default (html element should NOT have class 'dark')
  let html = await driver.findElement(By.css("html"));
  let classes = await html.getAttribute("class");
  if (classes.includes("dark")) {
    throw new Error("Expected light mode by default, but 'dark' class found");
  }

  // Click the dark mode toggle button
  const darkModeToggle = await driver.findElement(By.css('[data-testid="dark-mode-toggle"]'));
  await darkModeToggle.click();

  // Wait for dark class to be added
  await driver.wait(async () => {
    let classList = await html.getAttribute("class");
    return classList.includes("dark");
  }, 5000);

  // Find TaskMaster app card
  const appCards = await driver.findElements(By.css('[data-testid="app-card"]'));
  let taskMasterCard = null;
  for (const card of appCards) {
    let text = await card.getText();
    if (text.includes("TaskMaster")) {
      taskMasterCard = card;
      break;
    }
  }
  if (!taskMasterCard) throw new Error("TaskMaster card not found");

  // Check if card is visible (Selenium throws if not, so this is implicit)
  const displayed = await taskMasterCard.isDisplayed();
  if (!displayed) throw new Error("TaskMaster card not visible");

  // Find favorite button inside TaskMaster card
  const favoriteButton = await taskMasterCard.findElement(By.css('button[data-testid="favorite-button"]'));
  await favoriteButton.click();

  // Wait a bit for UI update (or better: wait for class change on heart icon)
  const heartIcon = await favoriteButton.findElement(By.css('svg[data-testid="heart-icon"]'));
  await driver.wait(async () => {
    const classes = await heartIcon.getAttribute("class");
    return /fill-red-500/.test(classes);
  }, 5000);

  // Toggle group by tags
  const tagsToggle = await driver.findElement(By.css('[data-testid="group-by-tags-toggle"]'));
  await driver.wait(until.elementIsVisible(tagsToggle), 5000);
  await tagsToggle.click();

  // Wait a moment (optional)
  await driver.sleep(800);

  // Revert back
  await tagsToggle.click();
  await driver.sleep(800);
}

// async function moveToDetailPageAndGoBack(driver: { get: (arg0: string) => any; findElements: (arg0: any) => any; wait: (arg0: () => Promise<boolean>, arg1: number) => any; findElement: (arg0: any) => any; navigate: () => { (): any; new(): any; back: { (): any; new(): any; }; }; }) {
//   await driver.get("http://localhost:3000");

//   // Find TaskMaster card and app name link
//   const appCards = await driver.findElements(By.css('[data-testid="app-card"]'));
//   let taskMasterCard = null;
//   for (const card of appCards) {
//     let text = await card.getText();
//     if (text.includes("TaskMaster")) {
//       taskMasterCard = card;
//       break;
//     }
//   }
//   if (!taskMasterCard) throw new Error("TaskMaster card not found");

//   const appNameLink = await taskMasterCard.findElement(By.css('[data-testid="app-name"]'));
//   await appNameLink.click();

//   // Wait for detail page URL change (assumes URL contains /app/)
//   await driver.wait(until.urlMatches(/\/app\/\w+/), 5000);

//   // Favorite button in detail page
//   const favoriteButton = await driver.findElement(By.css('button[data-testid="favorite-button"]'));
//   await favoriteButton.click();

//   const heartIcon = await driver.findElement(By.css('svg[data-testid="heart-icon"]'));
//   await driver.wait(async () => {
//     const classes = await heartIcon.getAttribute("class");
//     return /fill-red-500/.test(classes);
//   }, 5000);

//   // Go back to list page
//   await driver.navigate().back();

//   // Wait for list page URL
//   await driver.wait(until.urlIs("http://localhost:3000"), 5000);

//   // Check page header text (assuming h1 with "Application Store")
//   const header = await driver.findElement(By.css("h1"));
//   const headerText = await header.getText();
//   if (headerText !== "Application Store") {
//     throw new Error(`Expected header "Application Store", found "${headerText}"`);
//   }
// }

async function runTests() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await toggleDarkModeAndFavoriteTaskMaster(driver);
    console.log("Test 1 passed");

    //await moveToDetailPageAndGoBack(driver);
    //console.log("Test 2 passed");

  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await driver.quit();
  }
}

runTests();
