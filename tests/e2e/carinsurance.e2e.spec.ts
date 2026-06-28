import { test, expect } from "@playwright/test";
import CarInsurancePage from "../../page-objects/carInsurance.page";
import  carInsuranceData from "../../data/carInsurance";

test.describe("Car insurance e2e test", () => {
  let carInsurancePage: CarInsurancePage;

  test.beforeEach(async ({ page }) => {
    carInsurancePage = new CarInsurancePage(page);
    await carInsurancePage.navigateTo("https://www.coverfox.com/");
  });

  test("verify car insurance quote count", async ({ page }) => {
    await carInsurancePage.navigateToCarInsurancePage();
    await carInsurancePage.clickDontKnowCarNumberButton();
    await carInsurancePage.selectBrand(carInsuranceData[0].brand);
    await carInsurancePage.selectModel(carInsuranceData[0].model);
    await carInsurancePage.selectFuel(carInsuranceData[0].fuelType);
    await carInsurancePage.selectVariant(carInsuranceData[0].variant);
    await carInsurancePage.selectRTO(
      carInsuranceData[0].rto,
      carInsuranceData[0].rtoOption,
    );
    await carInsurancePage.selectRegistrationYear(
      carInsuranceData[0].registrationYear,
    );
    await carInsurancePage.selectPolicyStatus(carInsuranceData[0].policyStatus);
    await carInsurancePage.selectPreviousClaim(
      carInsuranceData[0].previousClaim,
    );
    await carInsurancePage.clickQuoteButton();
    await carInsurancePage.waitForElement(carInsurancePage.quotesCountLocator);
    const quotesCount = await carInsurancePage.getQuotesCount();
     console.log(`Quotes Count: ${quotesCount}`);
     expect(quotesCount).toBeGreaterThan(0);
     
  });
});
