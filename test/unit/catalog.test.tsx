import "@testing-library/jest-dom";

import { mockedCatalogValues, mockedCartValues } from "../mockValue";
import { pageRender, createMockedStore } from "../helpers";

import { waitFor } from "@testing-library/react";

afterEach(() => {
  localStorage.clear();
});

describe("Каталог товаров", () => {
  it("Отображается список товаров", async () => {
    const mocks = {
      products: mockedCatalogValues,
    };

    const store = createMockedStore(mocks);

    const screen = pageRender("/catalog", store);

    await waitFor(() => {
      const detailsElement = screen.getAllByText("Details");
      expect(detailsElement.length).toBeLessThanOrEqual(
        mockedCatalogValues.length
      );

      mockedCatalogValues.forEach((product) => {
        const productNameElement = screen.getByText(product.name);
        const productPriceElement = screen.getByText(`$${product.price}`);

        expect(productNameElement).toBeInTheDocument();
        expect(productPriceElement).toBeInTheDocument();
      });
    });
  });

  it("Отображается бейдж товара, если он уже находится в корзине", async () => {
    const mocks = {
      products: mockedCatalogValues,
    };

    const store = createMockedStore(mocks, mockedCartValues);

    const screen = pageRender("/catalog", store);

    await waitFor(() => {
      const itemBadgeElement = screen.queryAllByText("Item in cart");

      expect(itemBadgeElement.length).toBeLessThanOrEqual(3);
    });
  });
});
