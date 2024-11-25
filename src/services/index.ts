import { useDispatch, useSelector } from "react-redux";
import { sliceIngredients } from "./ingredients/slice";
import { sliceConstructorIngredient } from "./constructor-ingredients/slice";
import { sliceOrder } from "./order/slice";
import { sliceUser } from "./user/slice";
import { configureStore, combineSlices } from "@reduxjs/toolkit";

const rootReducer = combineSlices(
  sliceIngredients,
  sliceConstructorIngredient,
  sliceOrder,
  sliceUser
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
