import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../../constants";
import { Order } from "../../types/order";

type TInitialState = {
  orders: Order[];
  error?: string | null;
  statusSocket: WebsocketStatus;
};

export type DTOProfileOrderMessage = {
  orders: (Order & { _id: string })[];
};

const initialState: TInitialState = {
  orders: [],
  statusSocket: WebsocketStatus.OFFLINE,
};

export const sliceProfileOrder = createSlice({
  name: "profileOrder",
  initialState,
  selectors:{
    profileOrders:(s)=>s.orders,
    profileOrderStatus:(s)=>s.statusSocket,
    profileOrderError:(s)=>s.error
  },
  reducers: {
    profileOrderConnecting(store) {
      store.statusSocket = WebsocketStatus.CONNECTING;
    },
    profileOrderOpen(store) {
      store.error = null;
      store.statusSocket = WebsocketStatus.ONLINE;
    },
    profileOrderClose(store) {
      store.statusSocket = WebsocketStatus.OFFLINE;
    },
    profileOrderSetError(store, action: PayloadAction<string>) {
      store.error = action.payload;
    },
    profileOrderGetMessage(store, action: PayloadAction<DTOProfileOrderMessage>) {
      store.orders = action.payload.orders.map((el) => ({ ...el, id: el._id }));
    },
  },
});

export const {profileOrderConnecting, profileOrderOpen, profileOrderClose, profileOrderSetError, profileOrderGetMessage} = sliceProfileOrder.actions
export const {profileOrders, profileOrderStatus, profileOrderError} = sliceProfileOrder.selectors
