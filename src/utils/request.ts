import { Token } from "../constants";
import { checkResponse } from "./checkResponce";

export type TypeRequest = typeof fetch;

export const request: TypeRequest = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requestAuth = <T extends (...args: any[]) => any>(
  callBackRefreshToken: T
) => {
  const refreshToken: TypeRequest = async (url, options) => {
    const accessToken = localStorage.getItem(Token.accessToken);
    const authOptions = {
      ...options,
      headers: { ...options?.headers, Authorization: accessToken ?? '' },
    };
    const res = await request(url, authOptions);
    if (res.status === 401) {
      await callBackRefreshToken();
      return await request(url, options);
    } else {
      return res;
    }
  };
  return refreshToken;
};
