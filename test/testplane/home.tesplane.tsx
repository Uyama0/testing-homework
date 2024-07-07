import { url, bug_id } from "../mockValue";

describe("На главной странице", function () {
  // @ts-ignore
  it("Верстка адаптируется под ширину экрана (550)", async ({ browser }) => {
    await browser.url(`${url}${bug_id}`);
    await browser.setWindowSize(550, 1080);
    const application = await browser.$(".Application");
    await application.waitForDisplayed();
    await application.assertView("plain", { ignoreDiffPixelCount: "0.05%" });
  });
  // @ts-ignore
  it("Верстка адаптируется под ширину экрана (1400)", async ({ browser }) => {
    await browser.url(`${url}${bug_id}`);
    await browser.setWindowSize(1400, 1080);
    const application = await browser.$(".Application");
    await application.waitForDisplayed();
    await application.assertView("plain", { ignoreDiffPixelCount: "0.05%" });
  });
});
