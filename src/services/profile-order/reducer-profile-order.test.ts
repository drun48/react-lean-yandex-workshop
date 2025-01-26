import { describe, it, expect } from "@jest/globals";
import {
  sliceProfileOrder,
  initialState,
  profileOrderConnecting,
  profileOrderOpen,
  profileOrderClose,
  profileOrderSetError,
  profileOrderGetMessage,
} from "./slice";
import { WebsocketStatus } from "../../constants";

import { Status } from "../../types/order";

describe("Reducer Profile Order", () => {
  it("should return the initial state", () => {
    expect(sliceProfileOrder.reducer(undefined, { type: "" })).toEqual(
      initialState
    );
  });

  it("should return state with state status connect", () => {
    expect(
      sliceProfileOrder.reducer(undefined, profileOrderConnecting())
    ).toEqual({ ...initialState, statusSocket: WebsocketStatus.CONNECTING });
  });

  it("should return state with state status open", () => {
    expect(sliceProfileOrder.reducer(undefined, profileOrderOpen())).toEqual({
      ...initialState,
      error: null,
      statusSocket: WebsocketStatus.ONLINE,
    });
  });

  it("should return state with state status close", () => {
    expect(sliceProfileOrder.reducer(undefined, profileOrderClose())).toEqual({
      ...initialState,
      statusSocket: WebsocketStatus.OFFLINE,
    });
  });

  it("should return state with state error", () => {
    const error = "Error";
    expect(
      sliceProfileOrder.reducer(undefined, profileOrderSetError(error))
    ).toEqual({ ...initialState, error: error });
  });

  it("should return state with state error", () => {
    const message = {
      ingredients: [],
      id: '1',
      status: Status.created,
      number: 10,
      createdAt: '2025-10-10',
      name: 'name',
      _id:'1'
    };
    expect(
      sliceProfileOrder.reducer(undefined, profileOrderGetMessage({orders:[message]}))
    ).toEqual({ ...initialState, orders: [message] });
  });
});
