import { Socket } from "socket.io-client";

export const socketInitialState: { socket: Socket | null } = {
  socket: null,
};

export enum SocketActionTypes {
  SetSocket = "SetSocket",
}

export interface ISetSocket {
  type: SocketActionTypes.SetSocket;
  payload: Socket;
}

export type SocketAction = ISetSocket;

export interface SocketStateType {
  socket: Socket | null;
}

export const socketReducer = (
  state: SocketStateType,
  action: SocketAction
): SocketStateType => {
  if (action.type === SocketActionTypes.SetSocket) {
    return {
      socket: action.payload,
    };
  }
};
