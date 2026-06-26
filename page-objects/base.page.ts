import { expect, Locator, Page } from '@playwright/test';
// import {loger} from '../logs/loger';

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    try {
      await this.page.goto(url);
    } catch (error) {
      console.error(`Failed to navigate to ${url}: ${error}`);
      throw error;
    }
  }

  async click(element: Locator): Promise<void> {
    try {
      await expect(element).toBeVisible({ timeout: 10000 });
      await element.click();
    } catch (error) {
      console.error(
        `Failed to click element: ${element.toString()}, Error: ${error}`
      );
      throw error;
    }
  }

  async typeInto(
    element: Locator,
    text: string
  ): Promise<void> {
    try {
      await expect(element).toBeVisible({ timeout: 10000 });
      await element.fill(text);
    } catch (error) {
      console.error(
        `Failed to enter text '${text}' into element: ${element.toString()}, Error: ${error}`
      );
      throw error;
    }
  }

  async getText(element: Locator): Promise<string> {
    try {
      await expect(element).toBeVisible({ timeout: 10000 });
      return (await element.textContent()) || '';
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
      await element.waitFor({ state: 'visible' });
    } catch (error) {
      console.error(
        `Element wait failed: ${element.toString()}, Error: ${error}`
      );
      throw error;
    }
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