import { Middleware } from "redux";
import { RootState } from "..";
import { refreshToken } from "../../api/user";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { Token } from "../../constants";

export type TWsActionTypes<S = unknown, M = unknown> = {
  connect: ActionCreatorWithoutPayload;
  disconnect: ActionCreatorWithoutPayload;
  sendMessage?: ActionCreatorWithPayload<S>;
  onConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<M>;
};

export const middlewareSocket = <S, M>(
  wsActions: TWsActionTypes<S, M>,
  url: string,
  isAuth: boolean = false,
  withTokenRefresh: boolean = false,
  RECONNECT_PERIOD: number = 3000
): Middleware<object, RootState> => {
  let socket: WebSocket | null = null;
  const {
    connect,
    sendMessage,
    onOpen,
    onClose,
    onError,
    onMessage,
    onConnecting,
    disconnect,
  } = wsActions;
  let isConnected = false;
  let reconnectTimer = 0;
  let accessToken: string | null = null;
  return (store) => (next) => (action) => {
    if (isAuth) {
      accessToken = localStorage.getItem(Token.accessToken);
    }
    const { dispatch } = store;
    if (connect.match(action)) {
      socket = new WebSocket(accessToken ? `${url}?token=${accessToken}` : url);
      isConnected = true;
      dispatch(onConnecting());

      socket.onopen = () => {
        dispatch(onOpen());
      };

      socket.onerror = () => {
        dispatch(onError("Error"));
      };

      socket.onmessage = (event) => {
        const { data } = event;

        try {
          const parsedData = JSON.parse(data);

          if (
            isAuth &&
            withTokenRefresh &&
            parsedData.message === "Invalid or missing token"
          ) {
            refreshToken()
              .then(() => {
                dispatch(connect());
              })
              .catch((err) => {
                dispatch(onError((err as { message: string }).message));
              });
            dispatch(disconnect());

            return;
          }
          if (!parsedData.success) {
            throw new Error(parsedData.message);
          }
          dispatch(onMessage(parsedData));
        } catch (error) {
          dispatch(onError((error as { message: string }).message));
        }
      };

      socket.onclose = () => {
        dispatch(onClose());

        if (isConnected) {
          reconnectTimer = window.setTimeout(() => {
            dispatch(connect());
          }, RECONNECT_PERIOD);
        }
      };
    }

    if (socket && sendMessage?.match(action)) {
      try {
        socket.send(JSON.stringify(action.payload));
      } catch (error) {
        dispatch(onError((error as { message: string }).message));
      }
    }

    if (socket && disconnect?.match(action)) {
      clearTimeout(reconnectTimer);
      isConnected = false;
      reconnectTimer = 0;
      socket.close();
      socket = null;
    }

    next(action);
  };
};
