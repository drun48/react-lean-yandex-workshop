import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder as createOrderApi, getOrderById as getOrderByIdApi } from "../../api/order/index";
import { RootState } from "..";
import { CreateOrder } from "../../api/order/type";
import {
  clearConstructor,
  ConstructorItem,
} from "../constructor-ingredients/slice";
import { Order } from "../../types/order";

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
    ingredients.unshift(state.constructorIngredient.bun as ConstructorItem);
    ingredients.push(state.constructorIngredient.bun as ConstructorItem);
  }
  const data = await createOrderApi(ingredients);
  if (!data) {
    return thunkAPI.rejectWithValue("problem");
  }
  thunkAPI.dispatch(clearConstructor());
  return data;
});

export const getOrderById = createAsyncThunk<Order | undefined, string>(
  "order/getOrderById",
  async (id) => {
    return await getOrderByIdApi(id);
  }
);
