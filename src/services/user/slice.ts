import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "./actions";

type InitialState = {
  user: null | unknown;
  loading: boolean;
  error: boolean;
};

const initialState: InitialState = {
  user: null,
  loading: false,
  error: false,
};

export const sliceOrder = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});
