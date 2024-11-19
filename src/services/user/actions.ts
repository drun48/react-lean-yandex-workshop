import { createAsyncThunk } from "@reduxjs/toolkit";
import { DTOLogin, DTORegister } from "../../api/user/type";
import { login as userLogin, register as userRegister } from "../../api/user";

export const login = createAsyncThunk("user/login", async (data: DTOLogin) => {
  return await userLogin(data);
});

export const register = createAsyncThunk(
  "user/register",
  async (data: DTORegister) => {
    return await userRegister(data);
  }
);
