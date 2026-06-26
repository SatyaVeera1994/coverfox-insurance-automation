import { Locator, Page } from '@playwright/test';
import BasePage from './base.page';

export default class CarInsurancePage extends BasePage {

  readonly brandLocator: Locator;
  readonly modelLocator: Locator;
  readonly fuelLocator: Locator;
  readonly variantLocator: Locator;
  readonly rtoTextbox: Locator;
  readonly rtoOptionLocator: Locator;
  readonly registrationYearLocator: Locator;
  readonly policyStatusLocator: Locator;
  readonly previousClaimLocator: Locator;

  constructor(page: Page) {
    super(page);

    this.rtoTextbox = page.getByRole('textbox', {
      name: 'e.g MH 02 or Mumbai'
    });

    this.brandLocator = page.locator('');
    this.modelLocator = page.locator('');
    this.fuelLocator = page.locator('');
    this.variantLocator = page.locator('');
    this.rtoOptionLocator = page.locator('');
    this.registrationYearLocator = page.locator('');
    this.policyStatusLocator = page.locator('');
    this.previousClaimLocator = page.locator('');
  }

  async selectBrand(brand: string) {
    await this.click(this.page.getByText(brand, { exact: true }));
  }

  async selectModel(model: string) {
    await this.click(this.page.getByText(model));
  }

  async selectFuel(fuel: string) {
    await this.click(this.page.getByText(fuel, { exact: true }));
  }

  async selectVariant(variant: string) {
    await this.click(this.page.getByText(variant));
  }

  async enterRTO(rto: string) {
    await this.typeInto(this.rtoTextbox, rto);
  }

  async selectRTOOption(option: string) {
    await this.click(this.page.getByText(option));
  }

  async selectRegistrationYear(year: string) {
    await this.click(this.page.getByText(year));
  }

  async selectPolicyStatus(status: string) {
    await this.click(this.page.getByText(status));
  }

  async selectPreviousClaim(claim: string) {
    await this.click(this.page.getByText(claim).nth(3));
  }
}