import { url, bug_id } from "../mockValue";

describe("Хедер страниц", function () {
  // @ts-ignore
  it("При клике на тоглер раскрывается навигация", async ({ browser }) => {
    await browser.url(`${url}${bug_id}`);
    await browser.setWindowSize(550, 1080);

    const application = await browser.$(".Application");
    const menuToggler = await browser.$(".Application-Toggler");

    await menuToggler.click();

    await application.assertView("plain", { ignoreDiffPixelCount: "0.1%" });
  });

  // @ts-ignore
  it("При повторном клике на тоглер закрывается навигация", async ({browser}) => {
    await browser.url(`${url}${bug_id}`); 
    await browser.setWindowSize(550, 1080);

    const application = await browser.$(".Application");
    const menuToggler = await browser.$(".Application-Toggler");

    await menuToggler.click();
    await menuToggler.click();

    await application.assertView("plain", { ignoreDiffPixelCount: "0.1%" });
  });
});
