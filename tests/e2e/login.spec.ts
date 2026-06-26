import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/homePage';



const VALID_MOBILE_NUMBER = '9876543210'; 
const FIXED_TEST_OTP = '0000'; 
const WRONG_OTP = '9999'; 

test.describe('Coverfox Login Flow', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateTo('https://www.coverfox.com/'); 
  });

  test('should login successfully with valid mobile number and OTP', async ({ page }) => {
    await homePage.clickLoginLink();
    await homePage.loginTocoverfox(VALID_MOBILE_NUMBER);
    await expect(homePage.otpTextbox).toBeVisible();
    await expect(homePage.verifyButton).toBeVisible();
    await homePage.enterOtpAndVerify(FIXED_TEST_OTP);
    // await expect(page).not.toHaveURL('https://www.coverfox.com/user-login/');
  });

  test('should show OTP field after submitting a valid mobile number', async () => {
   await homePage.clickLoginLink();
    await homePage.click(homePage.submitButton);
    
  // Assertions
    await expect(homePage.mobileErrorMessage).toBeVisible();
    await expect(homePage.mobileErrorMessage).toHaveText('Please enter a valid mobile number.');
    await expect(homePage.otpTextbox).not.toBeVisible();
  });

  test('should not proceed with an empty mobile number', async () => {
   await homePage.clickLoginLink();
    await homePage.click(homePage.submitButton); 
    await homePage.verifyVisible(homePage.mobileTextbox); 
    await expect(homePage.mobileErrorMessage).toBeVisible();
    await expect(homePage.mobileErrorMessage).toHaveText('Please enter a valid mobile');
    await expect(homePage.otpTextbox).not.toBeVisible();
  });

  test('should not login with an incorrect OTP', async ({ page }) => {
    await homePage.clickLoginLink();
    await homePage.loginTocoverfox(VALID_MOBILE_NUMBER);
    await homePage.verifyVisible(homePage.otpTextbox);
    await homePage.enterOtpAndVerify(WRONG_OTP)
    await homePage.verifyOtpErrorMessage();
    await expect(homePage.otpErrorMessage).toBeVisible();
    await expect(homePage.otpErrorMessage).toHaveText('OTP is invalid');
    await expect(homePage.otpTextbox).toBeVisible();
    await expect(page).not.toHaveURL(/dashboard/i);
  });

  test('should not login with an empty OTP', async () => {
    await homePage.clickLoginLink();
    await homePage.loginTocoverfox(VALID_MOBILE_NUMBER);
    await homePage.verifyVisible(homePage.otpTextbox);
    await homePage.click(homePage.verifyButton);

    // Assertions
    await expect(homePage.otpTextbox).toBeVisible();
    await expect(homePage.verifyButton).toBeVisible();
  });
});