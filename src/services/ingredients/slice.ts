import { createSlice } from "@reduxjs/toolkit";
import { getList } from "./actions";
import { Ingredients } from "../../api/ingredients/types";

interface initialState {
  list: Ingredients[];
  loading: boolean;
}

const initialState: initialState = {
  list: [],
  loading: false,
};

export const sliceIngredients = createSlice({
  name: "currentIngredient",
  initialState,
  reducers: {},
  selectors: {
    getStateIngredients: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });
  },
});

export const { getStateIngredients } = sliceIngredients.selectors;
