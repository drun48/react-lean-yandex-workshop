import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const getOrderCurrentOrderByNumber = createSelector(
  [
    (store: { state: RootState }) => store.state,
    (number: { number: number }) => number.number,
  ],
  (state, number) => {
    let order = state.feed.orders.find((el) => el.number === number);
    if (order) return order;
    order = state.profileOrder.orders.find((el) => el.number === number);
    if (order) return order;
    return state.order.currentOrder?.number === number
      ? state.order.currentOrder
      : null;
  }
);
