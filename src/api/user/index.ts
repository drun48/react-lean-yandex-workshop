import { apiURL, Token } from "../../constants";
import { debounce } from "../../utils/debounce";
import { request, requestAuth } from "../../utils/request";
import {
  DTOAnswerForogotPassword,
  DTOAnswerLogin,
  DTOAnswerRegister,
  DTOAnswerToken,
  DTOAnswerUser,
  DTOEditUser,
  DTOLogin,
  DTORegister,
  DTOResetPassword,
} from "./type";

export const requestAuthToken = requestAuth(debounce(refreshToken));

export async function register(formData: DTORegister) {
  try {
    const res = await request<DTOAnswerRegister>(
      `${apiURL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function login(formData: DTOLogin) {
  try {
    const res = await request<DTOAnswerLogin>(`${apiURL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    localStorage.setItem(Token.accessToken, data.accessToken);
    localStorage.setItem(Token.refreshToken, data.refreshToken);
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function logout() {
  try {
    const refreshToken = localStorage.getItem(Token.refreshToken);
    const res = await requestAuthToken(`${apiURL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token: refreshToken }),
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
    const res = await request<DTOAnswerToken>(`${apiURL}/api/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token: refreshToken }),
    });
    const data = await res.json();
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
    const res = await requestAuthToken<{ user: DTOAnswerUser }>(
      `${apiURL}/api/auth/user`
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function editUser(formData: DTOEditUser) {
  try {
    const res = await requestAuthToken<{ user: DTOAnswerUser }>(
      `${apiURL}/api/auth/user`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(formData),
      }
    );
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}

export async function forgotPassword(email: string) {
  try {
    const res = await request<DTOAnswerForogotPassword>(
      `${apiURL}/api/password-reset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ email }),
      }
    );
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}

export async function resetPassword(formData: DTOResetPassword) {
  try {
    const res = await request<DTOAnswerForogotPassword>(
      `${apiURL}/api/password-reset/reset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(formData),
      }
    );
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}
