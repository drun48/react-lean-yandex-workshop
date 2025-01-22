import { useDispatch, useSelector } from "react-redux";
import { sliceIngredients } from "./ingredients/slice";
import { sliceConstructorIngredient } from "./constructor-ingredients/slice";
import { sliceOrder } from "./order/slice";
import { sliceUser } from "./user/slice";
import { configureStore, combineSlices } from "@reduxjs/toolkit";
import {
  sliceFeed,
  feedConnecting,
  feedOpen,
  feedClose,
  feedSetError,
  feedGetMessage,
  DTOOrderMessage,
} from "./feed/slice";
import { middlewareSocket } from "./middleware/middleware-socket";
import { feedConnect, feedDisconnect } from "./feed/action";
import { wsURL } from "../constants";
import { profileOrderConnect, profileOrderDisconnect } from "./profile-order/action";
import { DTOProfileOrderMessage, profileOrderClose, profileOrderConnecting, profileOrderGetMessage, profileOrderOpen, profileOrderSetError, sliceProfileOrder } from "./profile-order/slice";

const rootReducer = combineSlices(
  sliceIngredients,
  sliceConstructorIngredient,
  sliceOrder,
  sliceUser,
  sliceFeed,
  sliceProfileOrder
);

const middlewareFeed = middlewareSocket<unknown, DTOOrderMessage>(
  {
    connect: feedConnect,
    disconnect: feedDisconnect,
    onConnecting: feedConnecting,
    onOpen: feedOpen,
    onClose: feedClose,
    onError: feedSetError,
    onMessage: feedGetMessage,
  },
  wsURL+'/all'
);

const middlewareProfileOrder = middlewareSocket<unknown, DTOProfileOrderMessage>(
  {
    connect: profileOrderConnect,
    disconnect: profileOrderDisconnect,
    onConnecting: profileOrderConnecting,
    onOpen: profileOrderOpen,
    onClose: profileOrderClose,
    onError: profileOrderSetError,
    onMessage: profileOrderGetMessage,
  },
  wsURL,
  true
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([middlewareFeed, middlewareProfileOrder]);
  },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
