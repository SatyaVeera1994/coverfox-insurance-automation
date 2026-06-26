import { test, expect } from '@playwright/test';
import CarInsurancePage from '../../page-objects/carInsurance.page';
const carInsuranceData =require  ('../../data/carInsurance.data.json');
const packagers = require("../../../../../drm/json/PACKAGERS.json");

test('Verify Quote Count', async ({ page }) => {

    const carPage = new CarInsurancePage(page);

    await carPage.navigateTo('https://www.coverfox.com/');

    await carPage.click(carPage.dontKnowCarNumber);

    await carPage.selectBrand(carInsuranceData.brand);

    await carPage.selectModel(carInsuranceData.model);

    await carPage.selectFuel(carInsuranceData.fuelType);

    await carPage.selectVariant(carInsuranceData.variant);

    await carPage.enterRTO(carInsuranceData.rto);

    await carPage.selectRTOOption(carInsuranceData.rtoOption);

    await carPage.selectRegistrationYear(carInsuranceData.registrationYear);

    await carPage.selectPolicyStatus(carInsuranceData.policyStatus);

    await carPage.selectPreviousClaim(carInsuranceData.previousClaim);

    await carPage.clickViewQuotes();

    const quoteCount = await carPage.getQuoteCount();

    expect(quoteCount).toBeGreaterThan(0);

});