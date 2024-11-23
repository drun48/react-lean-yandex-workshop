export type ErrorBodyFetch = {
  message: string;
  success:boolean
};

export type ErrorRequest = { errorBody: ErrorBodyFetch; status: number };

export function checkResponse(res: Response) {
  return res.ok
    ? res
    : res
        .json()
        .then((errorBody: ErrorBodyFetch) =>
          Promise.reject({ errorBody: errorBody, status: res.status })
        );
}
