import { apiURL } from "../../constants";
import { Ingredients } from "../ingredients/types";
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
    const data = await res.json()
    return data;
  } catch (e) {
    console.error(e);
  }
}
