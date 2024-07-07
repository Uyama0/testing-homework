import "@testing-library/jest-dom";

import React from "react";

import { render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { Store } from "redux";
import { Provider } from "react-redux";

import { AxiosResponse } from "axios";

import { ExampleApi, CartApi } from "../src/client/api";
import { initStore } from "../src/client/store";
import { Application } from "../src/client/Application";

import { mockedCheckout } from "./mockValue";

import {
  ProductShortInfo,
  Product,
  CheckoutResponse,
} from "../src/common/types";

export const pageRender = (page: string, store?: Store) => {
  store = store ?? initStore(new ExampleApi("/hw/store"), new CartApi());

  const application = (
    <MemoryRouter initialEntries={[`${page}`]} initialIndex={0}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  return {
    ...render(application),
  };
};

interface IMockedData {
  products?: ProductShortInfo[];
  productDetails?: Product;
}

export const createMockedStore = (
  apiMocks: IMockedData,
  cartMocks: any = {}
) => {
  const { products = [], productDetails = {} } = apiMocks;

  const api = new ExampleApi("http://example.com");
  const cart = new CartApi();

  api.getProducts = jest.fn().mockResolvedValue({
    data: products,
    status: 200,
    statusText: "OK",
    headers: {},
    config: {},
  } as AxiosResponse<ProductShortInfo[]>);

  api.getProductById = jest.fn().mockResolvedValue({
    data: productDetails,
    status: 200,
    statusText: "OK",
    headers: {},
    config: {},
  } as AxiosResponse<Product>);

  api.checkout = jest.fn().mockResolvedValue({
    data: mockedCheckout,
    status: 200,
    statusText: "OK",
    headers: {},
    config: {},
  } as AxiosResponse<CheckoutResponse>);

  if (Object.keys(cartMocks).length > 0) {
    cart.setState(cartMocks);
  }

  const store = initStore(api, cart);

  return store;
};

export const getLocalStorage = () => {
  const stringStorage = localStorage.getItem("example-store-cart");
  const parsed = stringStorage ? JSON.parse(stringStorage) : null;

  return parsed;
};
