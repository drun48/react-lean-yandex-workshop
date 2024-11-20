import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "./actions";
import { DTOAnswerUser } from "../../api/user/type";

type InitialState = {
  user: null | DTOAnswerUser;
  loading: boolean;
  error: boolean;
  isAuthChecked: boolean;
};

const initialState: InitialState = {
  user: null,
  loading: false,
  error: false,
  isAuthChecked: false,
};

export const sliceUser= createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthChecked(state, action) {
      state.isAuthChecked = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
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
      });
  },
});

export const { setIsAuthChecked, setUser } = sliceUser.actions;
export const { getUser, getIsAuthChecked } = sliceUser.selectors;
