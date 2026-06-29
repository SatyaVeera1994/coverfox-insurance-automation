import { test, expect } from "@playwright/test";
import CarInsurancePage from "../../page-objects/carInsurance.page";
import  carInsuranceData from "../../data/carInsurance";

test.describe("Car insurance e2e test", () => {
  let carInsurancePage: CarInsurancePage;

  test.beforeEach(async ({ page }) => {
    carInsurancePage = new CarInsurancePage(page);
    await page.goto("https://www.coverfox.com/");
  });

  const data = carInsuranceData[0];

  test(`verify quote count for ${data.brand} ${data.model}`, async ({ page }) => {

    await carInsurancePage.navigateToCarInsurancePage();
    await carInsurancePage.clickDontKnowCarNumberButton();

    await carInsurancePage.selectBrand(data.brand);
    await carInsurancePage.selectModel(data.model);
    await carInsurancePage.selectFuel(data.fuelType);
    await carInsurancePage.selectVariant(data.variant);

    await carInsurancePage.selectRTO(data.rto, data.rtoOption);

    await carInsurancePage.selectRegistrationYear(data.registrationYear);
    await carInsurancePage.selectPolicyStatus(data.policyStatus);
    await carInsurancePage.selectPreviousClaim(data.previousClaim);

   await carInsurancePage.clickQuoteButton();
    await carInsurancePage.waitForElement(carInsurancePage.quotesCountLocator);
    const quotesCount = await carInsurancePage.getQuotesCount();
     console.log(`Quotes Count: ${quotesCount}`);
     expect(quotesCount).toBeGreaterThan(0);

    await test.info().attach("quotes-count", {
      body: `Quotes Count: ${quotesCount}`,
      contentType: "text/plain",
    });
   
   
    
  });
});

