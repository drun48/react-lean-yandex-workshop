import { apiURL } from "../../constants";
import { Ingredients } from "../ingredients/types";
import { CreateOrder } from "./type";

export async function createOrder(ingredients: Ingredients[]) {
  try {
    const res = await fetch(`${apiURL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ingredients: ingredients.map((el) => el.id) }),
    });
    const data = (await res.json()) as CreateOrder;
    return data;
  } catch (e) {
    console.log(e);
  }
}
