import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../../constants";
import { Order } from "../../types/order";

export type DTOOrderMessage = {
  orders: (Order & { _id: string })[];
  total: number;
  totalToday: number;
};

type initialState = {
  total: number;
  totalToday: number;
  orders: Order[];
  error?: string | null;
  statusSocket: WebsocketStatus;
};

export const initialState: initialState = {
  total: 0,
  totalToday: 0,
  orders: [],
  statusSocket: WebsocketStatus.OFFLINE,
};

export const sliceFeed = createSlice({
  name: "feed",
  initialState,
  selectors: {
    feedOrders: (s) => s.orders,
    feedTotal: (s) => s.total,
    feedTotalToday: (s) => s.totalToday,
    feedError: (s) => s.error,
    feedStatus: (s) => s.statusSocket,
  },
  reducers: {
    feedConnecting(store) {
      store.statusSocket = WebsocketStatus.CONNECTING;
    },
    feedOpen(store) {
      store.error = null;
      store.statusSocket = WebsocketStatus.ONLINE;
    },
    feedClose(store) {
      store.statusSocket = WebsocketStatus.OFFLINE;
    },
    feedSetError(store, action: PayloadAction<string>) {
      store.error = action.payload;
    },
    feedGetMessage(store, action: PayloadAction<DTOOrderMessage>) {
      store.total = action.payload.total;
      store.totalToday = action.payload.totalToday;
      store.orders = action.payload.orders.map((el) => ({ ...el, id: el._id }));
    },
  },
});

export const {
  feedConnecting,
  feedOpen,
  feedClose,
  feedSetError,
  feedGetMessage,
} = sliceFeed.actions;
export const { feedOrders, feedTotal, feedTotalToday, feedError, feedStatus } =
  sliceFeed.selectors;
