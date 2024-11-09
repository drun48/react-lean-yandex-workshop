import { useDispatch, useSelector } from "react-redux";
import { sliceCurrentIngredient } from "./current-ingredient/slice";
import { sliceIngredients } from "./ingredients/slice";
import { sliceConstructorIngredient } from "./constructor-ingredients/slice";
import { sliceOrder } from "./order/slice";
import { configureStore, combineSlices } from "@reduxjs/toolkit";

const rootReducer = combineSlices(
  sliceCurrentIngredient,
  sliceIngredients,
  sliceConstructorIngredient,
  sliceOrder
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
