import { apiURL } from "../../constants";
import { request } from "../../utils/request";
import { DTOLogin, DTORegister } from "./type";

export async function register(formData: DTORegister) {
  try {
    const res = await request(`${apiURL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
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
    const data = await res.json();
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
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function refreshToken(refreshToken: string) {
  try {
    const res = await request(`${apiURL}/api/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ tokem: refreshToken }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}
