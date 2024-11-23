import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder as createOrderApi } from "../../api/order/index";
import { RootState } from "..";
import { CreateOrder } from "../../api/order/type";
import { clearContructor, ConstructorItem } from "../constructor-ingredients/slice";

export const createOrder = createAsyncThunk<
  CreateOrder | undefined,
  undefined,
  {
    state: RootState;
  }
>("order/createOrder", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const ingredients = [...state.constructorIngredient.list];
  if (state.constructorIngredient.bun) {
    ingredients.push(state.constructorIngredient.bun as ConstructorItem);
    ingredients.push(state.constructorIngredient.bun as ConstructorItem);
  }
  const data = await createOrderApi(ingredients);
  if (!data) {
    return thunkAPI.rejectWithValue("problem");
  }
  thunkAPI.dispatch(clearContructor());
  return data;
});
