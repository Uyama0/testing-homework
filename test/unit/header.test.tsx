import "@testing-library/jest-dom";

import events from "@testing-library/user-event";

import { pageRender, createMockedStore } from "../helpers";

afterEach(() => {
  localStorage.clear();
});

describe("Шапка приложения", () => {
  it("При клике на (Cart) страница меняется", async () => {
    const store = createMockedStore({});
    const screen = pageRender("/contacts", store);

    const link = screen.getByText("Kogtetochka store");
    expect(link).toBeInTheDocument();

    await events.click(link);

    const header = screen.getByText("Welcome to Kogtetochka store!", {
      exact: false,
    });

    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Welcome to Kogtetochka store!");
  });

  it("При клике на (Catalog) страница меняется", async () => {
    const store = createMockedStore({});
    const screen = pageRender("/", store);

    const link = screen.getByText("Catalog");
    expect(link).toBeInTheDocument();

    await events.click(link);

    const header = screen.getByRole("heading", { name: "Catalog" });

    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Catalog");
  });

  it("При клике на (Delivery) страница меняется", async () => {
    const store = createMockedStore({});
    const screen = pageRender("/", store);

    const link = screen.getByText("Delivery");
    expect(link).toBeInTheDocument();

    await events.click(link);
    const header = screen.getByRole("heading", { name: "Delivery" });

    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Delivery");
  });

  it("При клике на (Contacts) страница меняется", async () => {
    const store = createMockedStore({});
    const screen = pageRender("/", store);

    const link = screen.getByText("Contacts");
    expect(link).toBeInTheDocument();

    await events.click(link);

    const header = screen.getByRole("heading", { name: "Contacts" });

    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Contacts");
  });

  it("При клике на (Cart) страница меняется", async () => {
    const store = createMockedStore({});
    const screen = pageRender("/", store);

    const link = screen.getByText("Cart");
    expect(link).toBeInTheDocument();

    await events.click(link);

    const header = screen.getByRole("heading", { name: "Shopping cart" });

    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("Shopping cart");
  });
});
