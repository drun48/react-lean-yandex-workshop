import { describe, it, expect } from "@jest/globals";
import { initialState, sliceIngredients } from "./slice";
import { getList } from "./actions";

describe("Reducer Ingredients", () => {
  it("should return the initial state", () => {
    expect(sliceIngredients.reducer(undefined, { type: "" })).toEqual(
      initialState
    );
  });

  it("should return state getList pending", () => {
    expect(
      sliceIngredients.reducer(undefined, { type: getList.pending.type })
    ).toEqual({ ...initialState, loading: true });
  });

  it("should return state getList fulfilled", () => {
    const ingredient = {
      id: "1",
      name: "test",
      image: "test_image",
      image_large: "test_image_large",
      type: "test_type",
      price: 1,
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
    };
    expect(
      sliceIngredients.reducer(undefined, {
        type: getList.fulfilled.type,
        payload: [ingredient],
      })
    ).toEqual({
      ...initialState,
      loading: false,
      list: { [ingredient.id]: ingredient },
    });
  });
});
