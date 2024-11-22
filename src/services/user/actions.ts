import { createAsyncThunk } from "@reduxjs/toolkit";
import { DTOEditUser, DTOLogin, DTORegister } from "../../api/user/type";
import {
  getUser,
  login as userLogin,
  register as userRegister,
  logout as userLogout,
  editUser,
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
      .then((user) => dispatch(setUser(user?.user)))
      .finally(() => dispatch(setIsAuthChecked(true)));
  } else {
    dispatch(setIsAuthChecked(true));
  }
});

export const logout = createAsyncThunk<
  void,
  undefined,
  {
    state: RootState;
  }
>("user/logout", async (_, { dispatch }) => {
  userLogout().then(() => {
    dispatch(setUser(null));
  });
});

export const edit = createAsyncThunk("user/edit", async (form: DTOEditUser) => {
  return (await editUser(form))?.user;
});
