import { expect, Locator, Page } from "@playwright/test";

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    try {
      await this.page.goto(url);
      await this.page.waitForLoadState("domcontentloaded");
    } catch (error) {
      console.error(`Failed to navigate to ${url}: ${error}`);
      throw error;
    }
  }

  async click(element: Locator): Promise<void> {
    try {
      await expect(element).toBeVisible({ timeout: 10000 });
      await expect(element).toBeEnabled();
      await element.click();
    } catch (error) {
      console.error(
        `Failed to click element: ${element.toString()}, Error: ${error}`
      );
      throw error;
    }
  }

  async typeInto(element: Locator, text: string): Promise<void> {
    try {
      await expect(element).toBeVisible({ timeout: 10000 });
      await expect(element).toBeEditable();
      await element.fill(text);
    } catch (error) {
      console.error(
        `Failed to enter text '${text}' into element: ${element.toString()}, Error: ${error}`
      );
      throw error;
    }
  }

  async clear(element: Locator): Promise<void> {
    try {
      await expect(element).toBeVisible();
      await element.clear();
    } catch (error) {
      console.error(
        `Failed to clear element: ${element.toString()}, Error: ${error}`
      );
      throw error;
    }
  }

  async hover(element: Locator): Promise<void> {
    try {
      await expect(element).toBeVisible();
      await element.hover();
    } catch (error) {
      console.error(
        `Failed to hover element: ${element.toString()}, Error: ${error}`
      );
      throw error;
    }
  }

  async doubleClick(element: Locator): Promise<void> {
    try {
      await expect(element).toBeVisible();
      await element.dblClick();
    } catch (error) {
      console.error(
        `Failed to double click element: ${element.toString()}, Error: ${error}`
      );
      throw error;
    }
  }

  async scrollIntoView(element: Locator): Promise<void> {
    try {
      await element.scrollIntoViewIfNeeded();
    } catch (error) {
      console.error(
        `Failed to scroll to element: ${element.toString()}, Error: ${error}`
      );
      throw error;
    }
  }

  async getText(element: Locator): Promise<string> {
    try {
      await expect(element).toBeVisible({ timeout: 10000 });
      return (await element.textContent())?.trim() ?? "";
    } catch (error) {
      console.error(
        `Failed to get text from element: ${element.toString()}, Error: ${error}`
      );
      throw error;
    }
  }

  async verifyVisible(element: Locator): Promise<void> {
    try {
      await expect(element).toBeVisible();
    } catch (error) {
      console.error(
        `Element not visible: ${element.toString()}, Error: ${error}`
      );
      throw error;
    }
  }

  async verifyText(
    element: Locator,
    expectedText: string
  ): Promise<void> {
    try {
      await expect(element).toHaveText(expectedText);
    } catch (error) {
      console.error(
        `Text verification failed. Expected: ${expectedText}, Error: ${error}`
      );
      throw error;
    }
  }

  async waitForElement(element: Locator): Promise<void> {
    try {
      await element.waitFor({
        state: "visible",
        timeout: 10000,
      });
    } catch (error) {
      console.error(
        `Element wait failed: ${element.toString()}, Error: ${error}`
      );
      throw error;
    }
  }

  async waitForPageLoad(): Promise<void> {
    try {
      await this.page.waitForLoadState("networkidle");
    } catch (error) {
      console.error(`Page load failed: ${error}`);
      throw error;
    }
  }

  async waitForURL(url: string | RegExp): Promise<void> {
    try {
      await this.page.waitForURL(url);
    } catch (error) {
      console.error(`URL wait failed: ${error}`);
      throw error;
    }
  }

  async isVisible(element: Locator): Promise<boolean> {
    return await element.isVisible();
  }

  async isEnabled(element: Locator): Promise<boolean> {
    return await element.isEnabled();
  }

  async getCount(element: Locator): Promise<number> {
    return await element.count();
  }

  async selectOption(
    element: Locator,
    value: string
  ): Promise<void> {
    try {
      await element.selectOption(value);
    } catch (error) {
      console.error(
        `Failed to select option '${value}', Error: ${error}`
      );
      throw error;
    }
  }
}