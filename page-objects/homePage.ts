import { expect, Locator, type Page } from "@playwright/test";
import BasePage from "./base.page";
// import {loger} from '../logs/loger';

export class HomePage extends BasePage {
  readonly loginLink: Locator;
  readonly mobileTextbox: Locator;
  readonly submitButton: Locator;
  readonly otpTextbox: Locator;
  readonly verifyButton: Locator;
  readonly errorMessage: Locator;
  readonly buyInsuranceLink: Locator;
  readonly contactCustomerServiceText: Locator;
  readonly mobileErrorMessage: Locator;
  readonly otpErrorMessage: Locator;

  // constructor
  constructor(page: Page) {
    super(page);

    this.loginLink = page.getByRole("link", { name: "Login" });
    this.mobileTextbox = page.getByRole("textbox", { name: "Mobile" });
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.otpTextbox = page.getByRole("textbox", { name: "Enter OTP" });
    this.verifyButton = page.getByRole("button", { name: "Verify" });
    this.mobileErrorMessage= page.getByText('Please enter a valid mobile number.');
    this.otpErrorMessage = page.getByText('OTP is invalid');

    this.errorMessage = page.getByText(
      "Sorry! You do not have any Insurance Plan. If you wish to buy an Insurance",
    );
    this.buyInsuranceLink = page.getByRole("link", {
      name: "Buy Insurance",
    });
   
    this.contactCustomerServiceText = page.getByText(
      "Contact our Customer Service Unit help@coverfox.com Toll Free: 022 4897",
    );
  
  }
 async clickLoginLink(){
    await this.click(this.loginLink);
 }
 
  async loginTocoverfox(mobilenumber: string){
   
    await this.typeInto(this.mobileTextbox, mobilenumber);
    await this.click(this.submitButton);
  }
 
  async verifyMobileErrorMessage(){
    await this.verifyVisible(this.mobileErrorMessage);
  }
   


  async enterOtpAndVerify(otp: string) {
    await this.typeInto(this.otpTextbox, otp);
  await this.click(this.verifyButton );
}

async verifyOtpErrorMessage(){
    await this.verifyVisible(this.otpErrorMessage);
  }

  async BuyInsurance() {
    await this.click( this.buyInsuranceLink );

    
  }

  async ContactCustomerService() {
    await this.click(this.contactCustomerServiceText )
  }

    async verifyContactCustomerServiceText() {
    await this.verifyVisible(this.contactCustomerServiceText);
  }


}