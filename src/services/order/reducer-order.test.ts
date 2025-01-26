import { describe, it, expect } from "@jest/globals";
import { initialState, sliceOrder } from "./slice";
import { createOrder, getOrderById } from "./actions";
import { Status } from "../../types/order";

describe("Reducer Order", () => {
  it("should return the initial state", () => {
    expect(sliceOrder.reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should return state createOrder pending", () => {
    expect(
      sliceOrder.reducer(undefined, { type: createOrder.pending.type })
    ).toEqual({ ...initialState, loading: true, error: false, order: null });
  });

  it("should return state createOrder fulfilled", () => {
    const createOrderObj = {
      name: "test",
      succes: true,
      order: {
        number: 123,
      },
    };
    expect(
      sliceOrder.reducer(undefined, {
        type: createOrder.fulfilled.type,
        payload: createOrderObj,
      })
    ).toEqual({ ...initialState, order: createOrderObj.order.number, loading: false });
  });

  it("should return state createOrder reject", () => {
    expect(
      sliceOrder.reducer(undefined, { type: createOrder.rejected.type })
    ).toEqual({ ...initialState, loading: false, error: true });
  });

  it("should return state getOrderById pending", () => {
    expect(
      sliceOrder.reducer(undefined, { type: getOrderById.pending.type })
    ).toEqual({
      ...initialState,
      loading: true,
      error: false,
      currentOrder: null,
    });
  });

  it("should return state getOrderById fulfilled", () => {
    const order = {
      ingredients: ["test"],
      id: "1",
      status: Status.created,
      number: 1,
      createdAt: "2025-10-10",
      name: "test",
    };
    expect(
      sliceOrder.reducer(undefined, {
        type: getOrderById.fulfilled.type,
        payload: order,
      })
    ).toEqual({ ...initialState, currentOrder: order, loading: false });
  });

  it("should return state getOrderById reject", () => {
    expect(
      sliceOrder.reducer(undefined, { type: getOrderById.rejected.type })
    ).toEqual({ ...initialState, loading: false, error: true });
  });
});
