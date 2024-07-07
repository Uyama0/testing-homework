import "@testing-library/jest-dom";

import events from "@testing-library/user-event";

import { mockedCartValues } from "../mockValue";
import { pageRender, createMockedStore } from "../helpers";

import { waitFor } from "@testing-library/react";

afterEach(() => {
  localStorage.clear();
});

describe("Страницы корзины", () => {
  it("В хедере отображается колличество уникальных товаров в корзине", async () => {
    const store = createMockedStore({}, mockedCartValues);
    const length = Object.keys(mockedCartValues).length;

    const screen = pageRender("/cart", store);

    await waitFor(async () => {
      const cartLink = screen.getByRole("link", { name: /Cart/ });
      const cartText = cartLink?.textContent || "";

      const uniqueProducts = cartText.match(/\((\d+)\)/);

      if (uniqueProducts && uniqueProducts.length > 1) {
        expect(uniqueProducts[1]).toBe(`${length}`);
      } else {
        expect(uniqueProducts).toBe(null);
      }
    });
  });

  it("Отображается список добавленных товаров ", async () => {
    const store = createMockedStore({}, mockedCartValues);

    const screen = pageRender("/cart", store);

    await waitFor(() => {
      Object.entries(mockedCartValues).forEach(([_, item], index) => {
        const row = screen.getByTestId(index);

        const indexElement = row.querySelector(".Cart-Index");
        const nameElement = row.querySelector(".Cart-Name");
        const priceElement = row.querySelector(".Cart-Price");
        const countElement = row.querySelector(".Cart-Count");
        const totalElement = row.querySelector(".Cart-Total");
        const fullTotalElement =
          screen.getByText(/Order price:/).nextElementSibling;

        expect(indexElement).toHaveTextContent(`${index + 1}`);
        expect(nameElement).toHaveTextContent(item.name);
        expect(priceElement).toHaveTextContent(`$${item.price}`);
        expect(countElement).toHaveTextContent(item.count.toString());
        expect(totalElement).toHaveTextContent(`$${item.count * item.price}`);
        expect(fullTotalElement).toHaveTextContent(`$1743`);
      });
    });
  });

  it("При клике на кнопку (clear shopping cart) корзина очищается", async () => {
    const store = createMockedStore({}, mockedCartValues);

    const screen = pageRender("/cart", store);

    await waitFor(async () => {
      expect(localStorage.getItem("example-store-cart")).not.toBe("{}");
      expect(screen.queryByText("Cart is empty")).not.toBeInTheDocument();

      const clearButton = screen.getByText("Clear shopping cart");
      await events.click(clearButton);

      expect(localStorage.getItem("example-store-cart")).toBe("{}");
    });
  });

  it("Если товаров в корзине нету, то отображается ссылка на (catalog)", async () => {
    const store = createMockedStore({});

    const screen = pageRender("/cart", store);

    await waitFor(async () => {
      const catalogLink = screen.getByRole("link", { name: "catalog" });
      expect(catalogLink).toBeInTheDocument();
    });
  });

  it("Отображается форма", async () => {
    const store = createMockedStore({}, mockedCartValues);
    const screen = pageRender("/cart", store);

    await waitFor(() => {
      const nameInputElement = screen.getByLabelText("Name");
      const phoneInputElement = screen.getByLabelText("Phone");
      const addressInputElement = screen.getByLabelText("Address");
      const submitButton = screen.getByRole("button", { name: "Checkout" });

      expect(nameInputElement).toBeInTheDocument();
      expect(phoneInputElement).toBeInTheDocument();
      expect(addressInputElement).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });
  });

  it("Форму можно заполнять", async () => {
    const store = createMockedStore({}, mockedCartValues);

    const screen = pageRender("/cart", store);

    await waitFor(async () => {
      const nameInputElement = screen.getByLabelText("Name");
      const phoneInputElement = screen.getByLabelText("Phone");
      const addressInputElement = screen.getByLabelText("Address");

      await events.type(nameInputElement, "Some name");
      await events.type(phoneInputElement, "89999999999");
      await events.type(addressInputElement, "Some address");

      expect(nameInputElement).toHaveValue("Some name");
      expect(phoneInputElement).toHaveValue("89999999999");
      expect(addressInputElement).toHaveValue("Some address");
    });
  });

  it("Форма обрабатывает верно введеную форму", async () => {
    const store = createMockedStore({}, mockedCartValues);

    const screen = pageRender("/cart", store);

    await waitFor(async () => {
      const nameInputElement = screen.getByLabelText("Name");
      const phoneInputElement = screen.getByLabelText("Phone");
      const addressInputElement = screen.getByLabelText("Address");
      const submitButton = screen.getByRole("button", { name: "Checkout" });

      await events.type(nameInputElement, "Some name");
      await events.type(phoneInputElement, "89999999999");
      await events.type(addressInputElement, "Some address");

      await events.click(submitButton);

      const alertMessage = screen.getByText("Well done!");
      expect(alertMessage).toBeInTheDocument();
    });
  });

  // классы при неверно введенных данных
});
