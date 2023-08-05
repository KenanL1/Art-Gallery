import { Builder, By, Key, until } from "selenium-webdriver";
import assert from "assert";

describe("Post", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    // Set implicit wait to 10 seconds
    driver.manage().setTimeouts({ implicit: 10000 });
  });

  after(async function () {
    await driver.quit();
  });

  it("Should be able to login and see updated nav", async function () {
    try {
      await driver.get("http://localhost:3000"); // Replace with the URL of your React app

      // Click Login button
      var loginBtn = await driver.findElement(By.id("loginBtn"));
      await loginBtn.click();

      const username = await driver.findElement(By.id("username"));
      await username.sendKeys("test");

      const password = await driver.findElement(By.id("password"));
      await password.sendKeys("test", Key.RETURN);

      const createBtn = await driver.findElement(By.id("createBtn"));
      assert.strictEqual(await createBtn.getText(), "Create");

      // Avatar should be first char of username
      const avatar = await driver.findElement(By.id("avatar"));
      assert.strictEqual(await avatar.getText(), "T");

      // Logout
      await avatar.click();
      const logoutBtn = await driver.wait(until.elementLocated(By.id("Logout")), 3000);
      await logoutBtn.click();

      // After clicking logout, the login button should be visible again
      loginBtn = await driver.findElement(By.id("loginBtn"));
      assert.strictEqual(await loginBtn.getText(), "Login");

    } catch (error) {
      // Log the error along with additional information
      console.error("Test failed with error:", error);
      console.error("Test step causing the error:", error.stack);
      throw error; // Rethrow the error to fail the test
    }


  });
});
