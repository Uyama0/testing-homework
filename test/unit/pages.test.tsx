import "@testing-library/jest-dom";

import { pageRender } from "../helpers";

afterEach(() => {
  localStorage.clear();
});

describe("Страницы приложения", () => {
  it("Страница товаров (Catalog) отрисовывается", () => {
    const screen = pageRender("/catalog");

    const header = screen.getByRole("heading", { name: "Catalog" });

    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Catalog");
  });

  it("Страница доставки (Delivery) отрисовывается", () => {
    const screen = pageRender("/delivery");

    const header = screen.getByRole("heading", { name: "Delivery" });

    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Delivery");
  });

  it("Страница контактов (Contacts) отрисовывается", () => {
    const screen = pageRender("/contacts");

    const header = screen.getByRole("heading", { name: "Contacts" });

    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Contacts");
  });

  it("Страница заказов (Cart) отрисовывается", () => {
    const screen = pageRender("/cart");

    const header = screen.getByRole("heading", { name: "Shopping cart" });

    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Shopping cart");
  });

  it("Страница домашняя (Home) отрисовывается", () => {
    const screen = pageRender("/");

    const header = screen.getByText("Welcome to Kogtetochka store!", {
      exact: false,
    });

    expect(header).toBeInTheDocument();
  });
});
