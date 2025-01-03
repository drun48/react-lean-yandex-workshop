import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createOrder, getOrderById } from "./actions";
import { Order } from "../../types/order";

type InitialState = {
  order: number | null;
  loading: boolean;
  error: boolean;
  currentOrder?: Order | null;
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
    getCurrentOrders: (s) => s.currentOrder,
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
      })
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.currentOrder = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
      })
      .addCase(getOrderById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { getOrder, getLoading, getError, getCurrentOrders } =
  sliceOrder.selectors;

export const getOrderCurrentOrderByNumber = createSelector(
  [getCurrentOrders, (number: {number: number}) => number.number],
  (order, number) => {
    return order?.number === number ? order : null;
  }
);
