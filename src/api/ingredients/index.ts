import { apiURL } from "../../constants";
import { request } from "../../utils/request";
import { Ingredients } from "./types";

export async function getListIngredients() {
  try {
    const res = await request(`${apiURL}/api/ingredients`);
    const data = (await res.json()).data;
    return data.map((item: Ingredients & { _id: string }) => ({
      id: item._id,
      name: item.name,
      type: item.type,
      proteins: item.proteins,
      fat: item.fat,
      carbohydrates: item.carbohydrates,
      calories: item.calories,
      price: item.price,
      image: item.image,
      image_large: item.image_large,
    }));
  } catch (e) {
    console.error(e);
  }
}
