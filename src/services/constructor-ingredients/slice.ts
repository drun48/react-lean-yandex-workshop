import { createSlice } from "@reduxjs/toolkit";
import { Ingredients } from "../../api/ingredients/types";

type InitialState = {
  bun: Ingredients | null;
  list: Ingredients[];
};

type ActionSortIngredient = {
  payload: {
    currentIndex: number;
    newIndex: number;
  };
};

const initialState: InitialState = {
  bun: null,
  list: [],
};

export const sliceConstructorIngredient = createSlice({
  name: "constructorIngredient",
  initialState,
  reducers: {
    addIngredient(state, action: { payload: Ingredients }) {
      if (action.payload.type === "bun") {
        state.bun = action.payload;
        return;
      }
      state.list.push(action.payload);
    },
    deleteIngredient(state, action) {
      state.list.splice(action.payload, 1);
    },
    sortIngredient(state, action: ActionSortIngredient) {
      const element = state.list[action.payload.currentIndex];
      state.list.splice(action.payload.currentIndex, 1);
      state.list.splice(action.payload.newIndex, 0, element);
    },
  },
  selectors: {
    getConstructorIngredient: (state) => state,
  },
});

export const { addIngredient, deleteIngredient, sortIngredient } =
  sliceConstructorIngredient.actions;
export const { getConstructorIngredient } =
  sliceConstructorIngredient.selectors;
