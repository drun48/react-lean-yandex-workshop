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
    try {
      const accessToken = localStorage.getItem(Token.accessToken);
      const authOptions = {
        ...options,
        headers: { ...options?.headers, Authorization: accessToken ?? "" },
      };
      return request(url, authOptions);
    } catch (e) {
      const errorMessage = e as string;
      if (errorMessage.includes("401") || errorMessage.includes("403")) {
        await callBackRefreshToken();
        return request(url, options);
      }
      throw e;
    }
  };
  return refreshToken;
};
