import { createAsyncThunk } from "@reduxjs/toolkit";
import { getListIngredients } from "../../api/ingredients";
import { Ingredients } from "../../api/ingredients/types";

export const getList = createAsyncThunk<Ingredients[], undefined>(
  "ingredients/getList",
  async () => {
    return (await getListIngredients()) ?? [];
  }
);
