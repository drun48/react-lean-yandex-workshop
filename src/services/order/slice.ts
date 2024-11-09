import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./actions";

type InitialState = {
  order: number | null;
  loading: boolean;
  error: boolean;
};

const initialState: InitialState = {
  order: null,
  loading: false,
  error: false,
};

export const sliceOrder = createSlice({
  name: "order",
  initialState,
  reducers: {},
  selectors: {
    getOrder: (state) => state.order,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.order = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload?.order.number ?? null;
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { getOrder, getLoading, getError } = sliceOrder.selectors;