import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "./actions";
import { DTOAnswerUser } from "../../api/user/type";
import { act } from "react-dom/test-utils";

type InitialState = {
  user: null | DTOAnswerUser;
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
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload ?? null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload ?? null;
      });
  },
});
