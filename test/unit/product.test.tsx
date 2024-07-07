import "@testing-library/jest-dom";

import { mockedProductValues, mockedCartValues } from "../mockValue";
import { pageRender, createMockedStore, getLocalStorage } from "../helpers";
import { waitFor, cleanup } from "@testing-library/react";

import events from "@testing-library/user-event";

afterEach(() => {
  localStorage.clear();
});

describe("Страница товара", () => {
  it("Данные о товаре отрисовываются", async () => {
    const mocks = {
      productDetails: mockedProductValues,
    };

    const store = createMockedStore(mocks);
    const screen = pageRender(`/catalog/${mockedProductValues.id}`, store);

    await waitFor(() => {
      const nameElement = screen.getByText(mockedProductValues.name);
      const descriptionElement = screen.getByText(
        mockedProductValues.description
      );
      const priceElement = screen.getByText(`$${mockedProductValues.price}`);
      const colorElement = screen.getByText(mockedProductValues.color);
      const materialElement = screen.getByText(mockedProductValues.material);
      const addButton = screen.getByText("Add to Cart");

      expect(nameElement).toBeInTheDocument();
      expect(descriptionElement).toBeInTheDocument();
      expect(priceElement).toBeInTheDocument();
      expect(colorElement).toBeInTheDocument();
      expect(materialElement).toBeInTheDocument();
      expect(addButton).toBeInTheDocument();
    });
  });

  it("Если товар находится в корзине, отображается бейдж нахождения в корзине", async () => {
    const mocks = {
      productDetails: mockedProductValues,
    };

    const store = createMockedStore(mocks, mockedCartValues);
    const screen = pageRender(`/catalog/${mockedProductValues.id}`, store);

    await waitFor(() => {
      const cartBadge = screen.getByText("Item in cart");

      expect(cartBadge).toBeInTheDocument();
    });
  });

  it("При повторном клике на (Add to Cart) увеличится колличество товаров (product count)", async () => {
    const mocks = {
      productDetails: mockedProductValues,
    };

    let count = mockedCartValues[1].count;

    const store = createMockedStore(mocks, mockedCartValues);
    const screen = pageRender(`/catalog/${mockedProductValues.id}`, store);

    await waitFor(async () => {
      const addButton = screen.getByText("Add to Cart");

      let storage = getLocalStorage();
      expect(storage[1].count).toBe(count);

      await events.click(addButton);

      storage = getLocalStorage();
      expect(storage[1].count).toBe(count + 1);
    });
  });

  it("При перезагрузке товары добавленные в корзину сохраняются", async () => {
    const mocks = {
      productDetails: mockedProductValues,
    };

    const store = createMockedStore(mocks);
    let screen = pageRender(`/catalog/${mockedProductValues.id}`, store);

    await waitFor(async () => {
      const addButton = screen.getByText("Add to Cart");
      await events.click(addButton);
    });

    cleanup();

    screen = pageRender(`/catalog/${mockedProductValues.id}`, store);

    await waitFor(async () => {
      const cartBadge = screen.getByText("Item in cart");
      expect(cartBadge).toBeInTheDocument();
    });
  });
});
