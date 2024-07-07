import { url, bug_id } from "../mockValue";

describe("Статические данные", function () {
  // @ts-ignore
  it("На странице доставки отрисовывается статика (Delivery)", async ({ browser }) => {
    await browser.url(`${url}/delivery${bug_id}`);
    const application = await browser.$(".Application");
    await application.waitForDisplayed();
    await application.assertView("plain", { ignoreDiffPixelCount: "0.05%" });
  });
  // @ts-ignore
  it("На странице контактов отрисовывается статика (Delivery)", async ({ browser }) => {
    await browser.url(`${url}/contacts${bug_id}`);
    const application = await browser.$(".Application");
    await application.waitForDisplayed();
    await application.assertView("plain", { ignoreDiffPixelCount: "0.05%" });
  });
});
