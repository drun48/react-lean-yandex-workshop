import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getList } from "./actions";
import { Ingredients } from "../../types/ingredients";

interface initialState {
  list: Record<string, Ingredients>;
  loading: boolean;
}

const initialState: initialState = {
  list: {},
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
        state.list = action.payload.reduce((res, item) => {
          res[item.id] = item;
          return res;
        }, {} as Record<string, Ingredients>);
      });
  },
});

export const { getStateIngredients } = sliceIngredients.selectors;

export const getIngredientsById = createSelector(
  [getStateIngredients, (idObj: { id: string }) => idObj.id],
  (state, id) => {
    return state.list[id];
  }
);

export const getIngredientsByArrayId = createSelector(
  [getStateIngredients, (idObj: { ids: string[] }) => idObj.ids],
  (state, ids) => {
    return ids.map((id) => state.list[id]).filter((el) => el);
  }
);
