import { apiURL } from "../../constants";
import { Ingredients } from "../../types/ingredients";
import { request } from "../../utils/request";

export async function getListIngredients() {
  try {
    const res = await request<{ data: Array<Ingredients & { _id: string }> }>(
      `${apiURL}/api/ingredients`
    );
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
