import { createSlice } from "@reduxjs/toolkit";
import { Ingredients } from "../../api/ingredients/types";

const initialState: { currentIngredient: Ingredients | null } = {
  currentIngredient: null,
};

export const sliceCurrentIngredient = createSlice({
  name: "currentIngredient",
  initialState,
  reducers: {
    set(state, action) {
      state.currentIngredient = action.payload;
    },
    clear(state) {
      state.currentIngredient = null;
    },
  },
  selectors: {
    getCurrentIngredient: (state) => state.currentIngredient,
  },
});

export const { set, clear } = sliceCurrentIngredient.actions;
export const { getCurrentIngredient } = sliceCurrentIngredient.selectors;
