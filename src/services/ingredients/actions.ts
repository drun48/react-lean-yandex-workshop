import { createAsyncThunk } from "@reduxjs/toolkit";
import { getListIngredients } from "../../api/ingredients";
import { Ingredients } from "../../types/ingredients";

export const getList = createAsyncThunk<Ingredients[], undefined>(
  "ingredients/getList",
  async () => {
    return (await getListIngredients()) ?? [];
  }
);
