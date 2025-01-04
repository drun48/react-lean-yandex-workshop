import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredients } from "../../api/ingredients/types";
import uuid4 from "uuid4";

export type ConstructorItem = Ingredients & { uniqueId: string };

type InitialState = {
  bun: Ingredients | null;
  list: ConstructorItem[];
};

const initialState: InitialState = {
  bun: null,
  list: [],
};

export const sliceConstructorIngredient = createSlice({
  name: "constructorIngredient",
  initialState,
  reducers: {
    addIngredient: {
      reducer: (
        state,
        action: PayloadAction<{ value: Ingredients; uniqueId: string }>
      ) => {
        if (action.payload.value.type === "bun") {
          state.bun = action.payload.value;
          return;
        }
        state.list.push({
          ...action.payload.value,
          uniqueId: action.payload.uniqueId,
        });
      },
      prepare: (ingredient: Ingredients) => {
        return { payload: { value: ingredient, uniqueId: uuid4() } };
      },
    },
    deleteIngredient(state, action: PayloadAction<ConstructorItem>) {
      state.list = state.list.filter(
        (el) => el.uniqueId !== action.payload.uniqueId
      );
    },
    sortIngredient(
      state,
      action: PayloadAction<{
        currentElement: ConstructorItem;
        offsetElement: ConstructorItem;
      }>
    ) {
      const currentIndex = state.list.findIndex(
        (el) => el.uniqueId === action.payload.currentElement.uniqueId
      );
      const newIndex = state.list.findIndex(
        (el) => el.uniqueId === action.payload.offsetElement.uniqueId
      );
      state.list.splice(currentIndex, 1);
      state.list.splice(newIndex, 0, action.payload.currentElement);
    },
    clearContructor(state) {
      state.bun = initialState.bun;
      state.list = initialState.list;
    },
  },
  selectors: {
    getConstructorIngredient: (state) => state,
  },
});

export const {
  addIngredient,
  deleteIngredient,
  sortIngredient,
  clearContructor,
} = sliceConstructorIngredient.actions;
export const { getConstructorIngredient } =
  sliceConstructorIngredient.selectors;
