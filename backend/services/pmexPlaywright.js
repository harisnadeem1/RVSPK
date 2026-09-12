import { chromium } from "playwright";

export const createPmexAccount = async (data) => {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  try {
    await page.goto(
      "https://demotrade.pmex.com.pk/terminal",
      {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      }
    );

    // Open Demo Account tab
    const demoTab = page
      .locator("label")
      .filter({
        hasText: "Open Demo account",
      });

    await demoTab.waitFor({
      state: "visible",
      timeout: 30000,
    });

    await demoTab.click();

    // Wait for registration form
    const firstNameInput = page.locator(
      'input[name="firstName"]'
    );

    await firstNameInput.waitFor({
      state: "visible",
      timeout: 60000,
    });

    // Fill customer details
    await firstNameInput.fill(data.firstName);

    await page
      .locator('input[name="secondName"]')
      .fill(data.lastName);

    await page
      .locator('input[name="email"]')
      .fill(data.email);

    await page
      .locator('input[name="phone"]')
      .fill(data.phone);

    // Deposit
    await page
      .locator('input[name="deposit"]')
      .fill("100000");

    // Account type and leverage
    const selects = page.locator("form select");

    await selects
      .nth(0)
      .selectOption("#web_group_7");

    await selects
      .nth(1)
      .selectOption("100");

    // Accept terms
    await page
      .locator('input[name="disclaimer"]')
      .check();

    // Submit
    await page
      .getByRole("button", {
        name: "Open Demo account",
        exact: true,
      })
      .click();

    // Wait for account creation
    const successTitle = page.getByText(
      "New account opened",
      {
        exact: true,
      }
    );

    await successTitle.waitFor({
      state: "visible",
      timeout: 60000,
    });

    const resultForm = successTitle.locator(
      "xpath=ancestor::form[1]"
    );

    // Extract login
    const login = (
      await resultForm
        .getByText("Login", {
          exact: true,
        })
        .locator(
          "xpath=following-sibling::div[1]"
        )
        .innerText()
    ).trim();

    // Extract password
    const password = (
      await resultForm
        .getByText("Password", {
          exact: true,
        })
        .locator(
          "xpath=following-sibling::div[1]"
        )
        .innerText()
    ).trim();

    if (!login || !password) {
      throw new Error(
        "PMEX account was created but credentials could not be extracted"
      );
    }

    return {
      login,
      password,
    };
  } catch (error) {
    console.error(
      "PMEX account creation failed:",
      error.message
    );

    throw error;
  } finally {
    await browser.close();
  }
};