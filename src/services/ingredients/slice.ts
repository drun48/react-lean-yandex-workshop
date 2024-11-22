import { createSelector, createSlice } from "@reduxjs/toolkit";
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
  name: "ingredients",
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

export const getIngredientsById = createSelector(
  [getStateIngredients, (idObj: { id: string }) => idObj.id],
  (state, id) => {
    return state.list.find((el) => el.id === id);
  }
);
