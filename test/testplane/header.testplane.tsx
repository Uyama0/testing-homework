import { url, bug_id } from "../mockValue";

describe("Хедер страниц", function () {
  // @ts-ignore
  it("При клике на тоглер раскрывается навигация", async ({ browser }) => {
    await browser.url(`${url}${bug_id}`);
    await browser.setWindowSize(550, 1080);

    const application = await browser.$(".Application");
    const menuToggler = await browser.$(".Application-Toggler");

    await menuToggler.click();

    await application.assertView("plain", { ignoreDiffPixelCount: "0.25%" });
  });

  // @ts-ignore
  it("При повторном клике на тоглер закрывается навигация", async ({
    browser,
  }) => {
    await browser.url(`${url}${bug_id}`);
    await browser.setWindowSize(550, 1080);

    const application = await browser.$(".Application");
    const menuToggler = await browser.$(".Application-Toggler");

    await menuToggler.click();
    await menuToggler.click();

    await application.assertView("plain", { ignoreDiffPixelCount: "0.25%" });
  });

  // @ts-ignore
  it("Раскрытое (гамбургер) меню скрывается при клике на link (Catalog)", async ({
    browser,
  }) => {
    await browser.url(`${url}${bug_id}`);
    await browser.setWindowSize(550, 1080);

    const navbar = await browser.$(".navbar");
    const menuToggler = await browser.$(".Application-Toggler");

    await menuToggler.click();

    const navLink = await browser.$$(".nav-link")[0];

    await navLink.click();

    await navbar.waitForDisplayed();
    await navbar.assertView("plain");
  });

  // it("Раскрытое (гамбургер) меню скрывается при клике на link (Delivery)", async ({
  //   browser,
  // }) => {
  //   await browser.url(`${url}${bug_id}`);
  //   await browser.setWindowSize(550, 1080);

  //   const navbar = await browser.$(".navbar");
  //   const menuToggler = await browser.$(".Application-Toggler");

  //   await menuToggler.click();

  //   const navLink = await browser.$$(".nav-link")[1];

  //   await navLink.click();

  //   await navbar.waitForDisplayed();
  //   await navbar.assertView("plain");
  // });

  // it("Раскрытое (гамбургер) меню скрывается при клике на link (Contacts)", async ({
  //   browser,
  // }) => {
  //   await browser.url(`${url}${bug_id}`);
  //   await browser.setWindowSize(550, 1080);

  //   const navbar = await browser.$(".navbar");
  //   const menuToggler = await browser.$(".Application-Toggler");

  //   await menuToggler.click();

  //   const navLink = await browser.$$(".nav-link")[2];

  //   await navLink.click();

  //   await navbar.waitForDisplayed();
  //   await navbar.assertView("plain");
  // });

  // it("Раскрытое (гамбургер) меню скрывается при клике на link (Cart)", async ({
  //   browser,
  // }) => {
  //   await browser.url(`${url}${bug_id}`);
  //   await browser.setWindowSize(550, 1080);

  //   const navbar = await browser.$(".navbar");
  //   const menuToggler = await browser.$(".Application-Toggler");

  //   await menuToggler.click();

  //   const navLink = await browser.$$(".nav-link")[3];

  //   await navLink.click();

  //   await navbar.waitForDisplayed();
  //   await navbar.assertView("plain");
  // });
});
