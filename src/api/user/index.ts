import { apiURL, Token } from "../../constants";
import { debounce } from "../../utils/debounce";
import { request, requestAuth } from "../../utils/request";
import {
  DTOAnswerLogin,
  DTOAnswerRegister,
  DTOAnswerToken,
  DTOAnswerUser,
  DTOLogin,
  DTORegister,
} from "./type";

export const requestAuthToken = requestAuth(debounce(refreshToken));

export async function register(formData: DTORegister) {
  try {
    const res = await request(`${apiURL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formData),
    });
    const data = (await res.json()) as DTOAnswerRegister;
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function login(formData: DTOLogin) {
  try {
    const res = await request(`${apiURL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formData),
    });
    const data = (await res.json()) as DTOAnswerLogin;
    localStorage.setItem(Token.accessToken, data.accessToken);
    localStorage.setItem(Token.refreshToken, data.refreshToken);
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function logout(refreshToken: string) {
  try {
    const res = await request(`${apiURL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ tokem: refreshToken }),
    });
    const data = await res.json();
    localStorage.removeItem(Token.accessToken);
    localStorage.removeItem(Token.refreshToken);
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function refreshToken() {
  try {
    const refreshToken = localStorage.getItem(Token.refreshToken);
    const res = await request(`${apiURL}/api/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ tokem: refreshToken }),
    });
    const data = (await res.json()) as DTOAnswerToken;
    localStorage.setItem(Token.accessToken, data.accessToken);
    localStorage.setItem(Token.refreshToken, data.refreshToken);
  } catch (e) {
    localStorage.removeItem(Token.accessToken);
    localStorage.removeItem(Token.refreshToken);
    console.error(e);
  }
}

export async function getUser() {
  try {
    const res = await requestAuthToken(`${apiURL}/api/auth/user`);
    const data = (await res.json()) as { user: DTOAnswerUser };
    return data;
  } catch (e) {
    localStorage.removeItem(Token.accessToken);
    localStorage.removeItem(Token.refreshToken);
    console.error(e);
  }
}
