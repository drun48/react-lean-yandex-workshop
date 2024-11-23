import { Token } from "../constants";
import { checkResponse, ErrorRequest } from "./checkResponce";

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
      const authOptions = formAuthOptions(options);
      return await request(url, authOptions);
    } catch (e) {
      const error = e as ErrorRequest;
      if (error.errorBody.message === "jwt expired") {
        await callBackRefreshToken();
        const authOptions = formAuthOptions(options);
        return await request(url, authOptions);
      }
      throw e;
    }
  };
  return refreshToken;
};

function formAuthOptions(options?: RequestInit) {
  const accessToken = localStorage.getItem(Token.accessToken);
  return {
    ...options,
    headers: { ...options?.headers, Authorization: accessToken ?? "" },
  };
}
