import { url, bug_id } from "../mockValue";

import { mockedProductValues } from "../mockValue";

describe("На странице корзины", function () {
  // @ts-ignore
  it("При отправке формы отрисовывается alert с уведомление", async ({
    browser,
  }) => {
    const mock = await browser.mock(
      `http://localhost:3000/hw/store/api/products/1${bug_id}`
    );
    mock.respondOnce(mockedProductValues, { fetchResponse: true });

    await browser.url(`${url}/catalog/1${bug_id}`); // /catalog/1?bug_id=2,  [/catalog/1?bug_id=7]
    const addButton = browser.$(".ProductDetails-AddToCart");
    await addButton.click();
    const cartLink = await browser.$$(".nav-link")[3];
    await cartLink.click();

    const cart = await browser.$(".Cart");
    const form = await browser.$(".Form");

    const nameInput = await form.$(".Form-Field_type_name");
    const phoneInput = await form.$(".Form-Field_type_phone");
    const addressInput = await form.$(".Form-Field_type_address");
    const submitButton = await form.$(".Form-Submit");

    await nameInput.addValue("Hello");
    await phoneInput.addValue("1234567890");
    await addressInput.addValue("world");
    await submitButton.click();

    // поменять на clear localStorage
    await cart.assertView("plain", { ignoreDiffPixelCount: "0.5%" });
  });
});
