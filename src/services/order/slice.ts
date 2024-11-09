import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./actions";

type InitialState = {
  order: number | null;
  loading: boolean;
};

const initialState: InitialState = {
  order: null,
  loading: false,
};

export const sliceOrder = createSlice({
  name: "order",
  initialState,
  reducers: {},
  selectors: {
    getState: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload?.order.number ?? null;
        state.loading = false;
      });
  },
});

export const { getState } = sliceOrder.selectors;
