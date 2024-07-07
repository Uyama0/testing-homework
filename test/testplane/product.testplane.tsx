import { url, bug_id } from "../mockValue";

import { mockedProductValues } from "../mockValue";

describe("На странице продукта", function () {
  // @ts-ignore
  it("Верстка адаптируется под ширину экрана (550)", async ({ browser }) => {
    const mock = await browser.mock(
      `http://localhost:3000/hw/store/api/products/1`
    );
    mock.respondOnce(mockedProductValues, { fetchResponse: true });
    await browser.url(`${url}/catalog/1${bug_id}`);
    await browser.setWindowSize(550, 1080);
    const application = await browser.$(".Application");
    await application.waitForDisplayed();
    await application.assertView("plain");
  });
  // @ts-ignore
  it("Верстка адаптируется под ширину экрана (max)", async ({ browser }) => {
    const mock = await browser.mock(
      `http://localhost:3000/hw/store/api/products/1`
    );
    mock.respondOnce(mockedProductValues, { fetchResponse: true });
    await browser.url(`${url}/catalog/1${bug_id}`);
    const application = await browser.$(".Application");
    await application.waitForDisplayed();
    await application.assertView("plain");
  });
  // @ts-ignore
  it("С сервера приходят валидные данные товара", async ({ browser }) => {
    await browser.url(`${url}/catalog/17${bug_id}`);
    const application = await browser.$(".Application");

    const productName = await application.$(".ProductDetails-Name").getText();
    const productDescription = await application
      .$(".ProductDetails-Description")
      .getText();
    const productColor = await application.$(".ProductDetails-Color").getText();
    const productMaterial = await application
      .$(".ProductDetails-Material")
      .getText();

    expect(productName).toBeTruthy();
    expect(productDescription).toBeTruthy();
    expect(productColor).toBeTruthy();
    expect(productMaterial).toBeTruthy();

    expect(productName).toMatch(/^[a-zA-Z0-9\s]+$/);
    expect(productDescription).toMatch(/^[a-zA-Z0-9\s]+$/);
    expect(productColor).toMatch(/^[a-zA-Z0-9\s]+$/);
    expect(productMaterial).toMatch(/^[a-zA-Z0-9\s]+$/);
  });

  // @ts-ignore
  it("С сервера приходят единообразная информация товара по id", async ({
    browser,
  }) => {
    // тут по хорошему перехватить ответ запроса
    await browser.url(`${url}/catalog/11${bug_id}`); 
    let application = await browser.$(".Application");

    const data = {
      name: await application.$(".ProductDetails-Name").getText(),
      description: await application.$(".ProductDetails-Description").getText(),
      color: await application.$(".ProductDetails-Color").getText(),
      material: await application.$(".ProductDetails-Material").getText(),
    };

    // как то перезагрузить браузер
    await browser.url(`${url}/catalog/11${bug_id}`); 
    application = await browser.$(".Application");

    const newData = {
      name: await application.$(".ProductDetails-Name").getText(),
      description: await application.$(".ProductDetails-Description").getText(),
      color: await application.$(".ProductDetails-Color").getText(),
      material: await application.$(".ProductDetails-Material").getText(),
    };

    expect(data.name).toStrictEqual(newData.name);
    expect(data.description).toStrictEqual(newData.description);
    expect(data.color).toStrictEqual(newData.color);
    expect(data.material).toStrictEqual(newData.material);
  });
});
