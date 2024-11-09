import { checkResponse } from "./checkResponce";

export type TypeRequest = typeof fetch;

export const request: TypeRequest = (url, options) => {
  return fetch(url, options).then(checkResponse);
};
