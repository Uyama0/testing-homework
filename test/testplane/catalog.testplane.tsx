import { url, bug_id, mockedCatalogValues } from "../mockValue";

describe("На странице каталога товаров", function () {
  // @ts-ignore
  it("Верстка адаптируется под ширину экрана (550)", async ({ browser }) => {
    const mock = await browser.mock(
      `http://localhost:3000/hw/store/api/products${bug_id}`
    );
    mock.respondOnce(mockedCatalogValues, { fetchResponse: true });

    await browser.url(`${url}/catalog${bug_id}`);
    await browser.setWindowSize(550, 1000);

    const application = await browser.$(".Application");
    await application.waitForDisplayed();
    await application.assertView("plain", { ignoreDiffPixelCount: "0.05%" });
  });
  // @ts-ignore
  it("Верстка адаптируется под ширину экрана (1400)", async ({ browser }) => {
    const mock = await browser.mock(
      `http://localhost:3000/hw/store/api/products${bug_id}`
    );
    mock.respondOnce(mockedCatalogValues, { fetchResponse: true });

    await browser.url(`${url}/catalog${bug_id}`);
    await browser.setWindowSize(1400, 1000);
    const application = await browser.$(".Application");
    await application.waitForDisplayed();
    await application.assertView("plain", { ignoreDiffPixelCount: "0.05%" });
  });

  // @ts-ignore
  it("С сервера приходят валидные данные товаров", async ({ browser }) => {
    await browser.url(`${url}/catalog${bug_id}`);
    const products = await Promise.all(
      await browser.$$(".ProductItem").map(async (product) => {
        const productName = await product.$(".card-title").getText();
        const productPrice = await product.$(".card-text").getText();
        return { name: productName, price: productPrice };
      })
    );
    products.forEach((product) => {
      expect(product.name).toBeTruthy();
      expect(product.name).toMatch(/^[a-zA-Z0-9\s]+$/);
      expect(product.price).toBeTruthy();
      expect(product.price).toMatch(/^\$\d+$/);
    });
  });
});
