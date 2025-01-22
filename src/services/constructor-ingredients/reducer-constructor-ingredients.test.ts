import { describe, it, expect, jest } from "@jest/globals";
import {
  sliceConstructorIngredient,
  initialState,
  addIngredient,
  deleteIngredient,
  sortIngredient,
  clearConstructor,
} from "./slice";
import uuid4 from "uuid4";

describe("Reducer Constructoe Ingredients", () => {
  const ingredientNonBun = {
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
    uniqueId: uuid4(),
  };
  it("should return the initial state", () => {
    expect(sliceConstructorIngredient.reducer(undefined, { type: "" })).toEqual(
      initialState
    );
  });

  it("should return state addIngredient bun", () => {
    const ingredient = {
      id: "1",
      name: "test",
      image: "test_image",
      image_large: "test_image_large",
      type: "bun",
      price: 1,
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
    };

    expect(
      sliceConstructorIngredient.reducer(undefined, {
        type: addIngredient.type,
        payload: { value: ingredient },
      })
    ).toEqual({ ...initialState, bun: ingredient });
  });

  it("should return state addIngredient to List", () => {
    expect(
      sliceConstructorIngredient.reducer(undefined, {
        type: addIngredient.type,
        payload: {
          value: { ...ingredientNonBun },
          uniqueId: ingredientNonBun.uniqueId,
        },
      })
    ).toEqual({ ...initialState, list: [ingredientNonBun] });
  });

  it("should return state delete ingredient", () => {
    const initialStateList = { ...initialState, list: [ingredientNonBun] };
    expect(
      sliceConstructorIngredient.reducer(initialStateList, {
        type: deleteIngredient.type,
        payload: ingredientNonBun,
      })
    ).toEqual({ ...initialState, list: [] });
  });

  it("should return state sort ingredient", () => {
    const list = [
      {
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
        uniqueId: uuid4(),
      },
      {
        id: "2",
        name: "test",
        image: "test_image",
        image_large: "test_image_large",
        type: "test_type",
        price: 1,
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        uniqueId: uuid4(),
      },
      {
        id: "3",
        name: "test",
        image: "test_image",
        image_large: "test_image_large",
        type: "test_type",
        price: 1,
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        uniqueId: uuid4(),
      },
    ];
    const initialStateList = {
      ...initialState,
      list,
    };

    expect(
      sliceConstructorIngredient.reducer(initialStateList, {
        type: sortIngredient.type,
        payload: { currentElement: list[2], offsetElement: list[0] },
      })
    ).toEqual({ ...initialStateList, list: [list[2], list[0], list[1]] });
  });

  it("should return initial state", () => {
    expect(
      sliceConstructorIngredient.reducer(undefined, clearConstructor())
    ).toEqual(initialState);
  });
});
