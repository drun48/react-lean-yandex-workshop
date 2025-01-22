import { describe, it, expect } from "@jest/globals";
import {
  feedConnecting,
  feedOpen,
  feedClose,
  feedSetError,
  feedGetMessage,
  sliceFeed,
  initialState,
} from "./slice";
import { WebsocketStatus } from "../../constants";

import { Status } from "../../types/order";

describe("Reducer Feed", () => {
  it("should return the initial state", () => {
    expect(sliceFeed.reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should return state with state status connect", () => {
    expect(sliceFeed.reducer(undefined, feedConnecting())).toEqual({
      ...initialState,
      statusSocket: WebsocketStatus.CONNECTING,
    });
  });

  it("should return state with state status open", () => {
    expect(sliceFeed.reducer(undefined, feedOpen())).toEqual({
      ...initialState,
      error: null,
      statusSocket: WebsocketStatus.ONLINE,
    });
  });

  it("should return state with state status close", () => {
    expect(sliceFeed.reducer(undefined, feedClose())).toEqual({
      ...initialState,
      statusSocket: WebsocketStatus.OFFLINE,
    });
  });

  it("should return state with state error", () => {
    const error = "Error";
    expect(sliceFeed.reducer(undefined, feedSetError(error))).toEqual({
      ...initialState,
      error: error,
    });
  });

  it("should return state with state error", () => {
    const message = {
      ingredients: [],
      id: "1",
      status: Status.created,
      number: 10,
      createdAt: "2025-10-10",
      name: "name",
      _id: "1",
    };
    const total = 1;
    const totalToday = 100;

    expect(
      sliceFeed.reducer(
        undefined,
        feedGetMessage({ orders: [message], total, totalToday })
      )
    ).toEqual({ ...initialState, orders: [message], total, totalToday });
  });
});
