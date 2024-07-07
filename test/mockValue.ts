export const mockedCatalogValues = [
  { id: 1, name: "Modern kogtetochka", price: 702 },
  { id: 2, name: "Oriental kogtetochka", price: 17 },
  { id: 3, name: "Pretty kogtetochka", price: 512 },
];

export const mockedProductValues = {
  id: 1,
  name: "Modern kogtetochka",
  description: "Really Small kogtetochka for Devon Rex",
  price: 702,
  color: "teal",
  material: "Steel",
};

export const mockedCartValues = {
  0: { name: "Modern kogtetochka", count: 1, price: 702 },
  1: { name: "Oriental kogtetochka", count: 1, price: 17 },
  2: { name: "Pretty kogtetochka", count: 2, price: 512 },
};

export const mockedCheckout = { id: 1 };

export const url = "http://localhost:3000/hw/store";

/**
 * Установите bug id который вы хотите проверить в интеграционных тестах.
 * Для запуска тестов без bug id оставьте bug_id = "".
 * Для запуска тестов c bug id впишите параметр который вы хотите протестировать.
 * Например: "?bug_id=2"
 */

export const bug_id = "?bug_id=10";
