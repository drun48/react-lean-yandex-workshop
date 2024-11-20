import { createAsyncThunk } from "@reduxjs/toolkit";
import { DTOLogin, DTORegister } from "../../api/user/type";
import { login as userLogin, register as userRegister } from "../../api/user";

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
