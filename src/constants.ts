export const apiURL = "https://norma.nomoreparties.space";
export const wsURL = "wss://norma.nomoreparties.space/orders"
export const isActiveforgotPassword = 'isActiveforgotPassword'

export enum DragType {
  CardIngredient = "CardIngredient",
  CardIngredientConstructor = "CardIngredientConstructor",
}

export enum Token {
  refreshToken = "refreshToken",
  accessToken = "accessToken",
}

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}
