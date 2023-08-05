import { Builder, By, Key, until, Select} from "selenium-webdriver";
import assert from "assert";

describe("Post", function () {
  let driver;
  const textPrompt = "Cow jumping over the moon";

  before(async function () {
    
    driver = await new Builder().forBrowser("chrome").build();
    
    // Set implicit wait to 10 seconds
    driver.manage().setTimeouts({ implicit: 10000 });

  });
  
  after(async function () {
    await driver.quit();
  });
  
  it("Post", async function () {
      this.timeout(10000);

    try {
      await driver.get("http://localhost:3000"); // Replace with the URL of your React app
      // Click Login button
      var loginBtn = await driver.findElement(By.id("loginBtn"));
      await loginBtn.click();
  
      const username = await driver.findElement(By.id("username"));
      await username.sendKeys("test");
  
      const password = await driver.findElement(By.id("password"));
      await password.sendKeys("test", Key.RETURN);

      const createBtn = await driver.wait(until.elementLocated(By.id("createBtn")),3000);

      await createBtn.click();

      // Find the dropdown element by its name attribute
      const dropdownElement = await driver.findElement(By.name("selectModel"));

      // Create a new Select instance
      const dropdown = await new Select(dropdownElement);

      // Use the `selectByValue` method to select the option with the value "SD"
      await dropdown.selectByValue("SD");

      const prompt = await driver.findElement(By.id("prompt"));
      await prompt.sendKeys(textPrompt);

      const generateBtn = await driver.findElement(By.id("generateBtn"));
      await generateBtn.click();

      // Wait until the alert is present
      await driver.wait(until.alertIsPresent(), 20000); // 20 seconds timeout

      // Now you can switch to the alert and interact with it
      const alert = await driver.switchTo().alert();
      assert.equal(await alert.getText(), "Success");
      await alert.accept(); // Accept the alert (click OK)

      await driver.sleep(1000);

      const searchInp = await driver.findElement(By.id("text"));
      await searchInp.sendKeys(textPrompt, Key.RETURN);

      const posts = await driver.findElements(By.className("post"));
      // Assert that the posts list contains exactly one element
      assert.strictEqual(posts.length, 1, "Expected only one post element.");

      // var post = await driver.findElement(By.css(`[alt=${textPrompt}}]`));
      var post = await driver.findElement(By.className("post"));
      await post.click();

      const overlay = await driver.wait(until.elementLocated(By.className("overlay")), 3000);

      // Like post
      await driver.sleep(200);
      const unlike = await driver.findElement(By.css(`[alt="Unlike"]`));
      await unlike.click();

      await driver.sleep(200);
      const like = await driver.findElement(By.css(`[alt="Like"]`));
      assert.ok(like, "Like icon shows when image is liked");

      // close modal - selenium element click doesn't seem to close the modal
      await driver.executeScript((elem) => {
        elem.click();
    }, overlay);

      const avatar = await driver.findElement(By.id("avatar"));
      await avatar.click();
      const profile = await driver.wait(until.elementLocated(By.id("Profile")), 3000);
      await profile.click();
      await driver.sleep(200);
      // Go to my likes
      const myLikes = await driver.wait(until.elementLocated(By.id("my-likes")), 3000);
      await myLikes.click();
      await driver.sleep(200);

      // post = await driver.findElement(By.css(`[alt=${textPrompt}}]`));
      post = await driver.findElement(By.className("post"));
      assert.ok(post, "post shows up in my likes list");

      // hover over post
      // const post = await driver.findElement(By.css(`[alt=${textPrompt}}]`));
      post = await driver.findElement(By.className("post"));
      // Create an Actions object
      const actions = driver.actions();

      // Perform the hover action
      // await actions.moveToElement(post).perform();
      await actions.move({ origin: post }).perform();

      const remove = await driver.findElement(By.css(`[alt="remove"]`));
      await remove.click();
      await driver.sleep(200);
      // Assert that the post element is removed from the page
      await driver.wait(until.stalenessOf(post), 1000, "Post element was not removed.");

    } catch (error) {
      // Log the error along with additional information
      console.error("Test failed with error:", error);
      console.error("Test step causing the error:", error.stack);
      throw error; // Rethrow the error to fail the test
    }

  });
});
