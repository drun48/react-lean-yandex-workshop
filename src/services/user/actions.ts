import { createAsyncThunk } from "@reduxjs/toolkit";
import { DTOLogin, DTORegister } from "../../api/user/type";
import {
  getUser,
  login as userLogin,
  register as userRegister,
} from "../../api/user";
import { setIsAuthChecked, setUser } from "./slice";
import { RootState } from "..";

export const register = createAsyncThunk(
  "user/register",
  async (data: DTORegister) => {
    const res = await userRegister(data);
    return res?.user;
  }
);

export const login = createAsyncThunk("user/login", async (data: DTOLogin) => {
  const res = await userLogin(data);
  return res?.user;
});

export const checAuth = createAsyncThunk<
  void,
  undefined,
  {
    state: RootState;
  }
>("user/checAuth", async (_, { dispatch }) => {
  if (localStorage.getItem("accessToken")) {
    getUser()
      .then((user) => dispatch(setUser(user)))
      .finally(() => dispatch(setIsAuthChecked(true)));
  } else {
    dispatch(setIsAuthChecked(true));
  }
});
