import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder as createOrderApi } from "../../api/order/index";
import { RootState } from "..";
import { CreateOrder } from "../../api/order/type";

export const createOrder = createAsyncThunk<
  CreateOrder | undefined,
  undefined,
  {
    state: RootState;
  }
>("order/createOrder", (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const ingredients = [...state.constructorIngredient.list];
  if (state.constructorIngredient.bun) {
    ingredients.push(state.constructorIngredient.bun);
    ingredients.push(state.constructorIngredient.bun);
  }
  return createOrderApi(ingredients);
});
