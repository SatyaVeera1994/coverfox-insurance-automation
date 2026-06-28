import { test, expect } from "@playwright/test";
import CarInsurancePage from "../../page-objects/carInsurance.page";
import registrationData from "../../data/carInsuranceRegistrationdata";

test.describe("Car insurance", () => {
  let carInsurancePage: CarInsurancePage;

  test.beforeEach(async ({ page }) => {
    carInsurancePage = new CarInsurancePage(page);
    await page.goto("https://www.coverfox.com/");
  });

  registrationData.forEach((registration) => {
    test(`Verify quotes for car ${registration.carNumber}`, async () => {

      await carInsurancePage.navigateToCarInsurancePage();

      await carInsurancePage.enterCarNumber(registration.carNumber);
      await carInsurancePage.clickQuoteButton();

      await carInsurancePage.selectPreviousClaim(registration.previousClaim);

      await carInsurancePage.enterMobileNumber(registration.mobileNumber);
      await carInsurancePage.clickReQuoteButton();

      

      const quotesCount = await carInsurancePage.getQuotesCount();

      await test.info().attach("quotes", {
        body: `Quotes Count: ${quotesCount}`,
        contentType: "text/plain",
      });

      expect(quotesCount).toBeGreaterThan(0);
      expect(quotesCount).toBeLessThan(100);
    });
  });
});