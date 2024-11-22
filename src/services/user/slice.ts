import { createSlice } from "@reduxjs/toolkit";
import { edit, login, register } from "./actions";
import { DTOAnswerUser } from "../../api/user/type";

type InitialState = {
  user: null | DTOAnswerUser;
  loading: boolean;
  error: boolean;
  isAuthChecked: boolean;
  isActiveforgotPassword: boolean;
};

const initialState: InitialState = {
  user: null,
  loading: false,
  error: false,
  isAuthChecked: false,
  isActiveforgotPassword: false,
};

export const sliceUser = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthChecked(state, action) {
      state.isAuthChecked = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsActiveforgotPassword(state, action) {
      state.isActiveforgotPassword = action.payload;
    },
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getIsActiveforgotPassword: (state) => state.isActiveforgotPassword,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload ?? null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload ?? null;
      })
      .addCase(edit.pending, (state) => {
        state.loading = true;
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.user = action.payload ?? null;
      });
  },
});

export const { setIsAuthChecked, setUser, setIsActiveforgotPassword } =
  sliceUser.actions;
export const { getUser, getIsAuthChecked, getIsActiveforgotPassword } =
  sliceUser.selectors;
