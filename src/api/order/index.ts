import { apiURL } from "../../constants";
import { Ingredients } from "../../types/ingredients";
import { Order } from "../../types/order";
import { request } from "../../utils/request";

import { requestAuthToken } from "../user";
import { CreateOrder } from "./type";

export async function createOrder(ingredients: Ingredients[]) {
  try {
    const res = await requestAuthToken<CreateOrder>(`${apiURL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ingredients: ingredients.map((el) => el.id) }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function getOrderById(id: string) {
  try {
    const res = await request<{orders:[Order]}>(`${apiURL}/api/orders/${id}`);
    const data = await res.json();
    return data.orders[0];
  } catch (e) {
    console.error(e);
  }
}
