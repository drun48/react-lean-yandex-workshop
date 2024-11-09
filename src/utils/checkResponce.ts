export function checkResponse(res: Response) {
  if (!res.ok) return Promise.reject(`Ошибка ${res.status}`);
  return res
}
