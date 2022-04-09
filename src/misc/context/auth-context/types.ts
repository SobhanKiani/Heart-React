import { cloneDeep } from "lodash";
import { RoomInfo, UserInfo } from "misc/interfaces";

export const authInitialState: UserInfo = JSON.parse(
  localStorage.getItem("user-data")
)
  ? JSON.parse(localStorage.getItem("user-data"))
  : { token: null, info: null };

export enum AuthActionTypes {
  SetAuth = "SetAuth",
  RemoveAuth = "RemoveAuth",
  SetRooms = "SetRooms",
  AddRoom = "AddRoom",
}

export interface ISetAuth {
  type: AuthActionTypes.SetAuth;
  payload: UserInfo;
}

export interface IRemoveAuth {
  type: AuthActionTypes.RemoveAuth;
  payload: null;
}

export interface ISetRooms {
  type: AuthActionTypes.SetRooms;
  payload: RoomInfo[];
}

export interface IAddRoom {
  type: AuthActionTypes.AddRoom;
  payload: RoomInfo;
}

export type AuthAction = ISetAuth | IRemoveAuth | ISetRooms | IAddRoom;

export const authReducer = (state: UserInfo, action: AuthAction): UserInfo => {
  if (action.type === AuthActionTypes.SetAuth) {
    return {
      ...action.payload,
    };
  } else if (action.type === AuthActionTypes.RemoveAuth) {
    return {
      token: null,
      info: null,
    };
  } else if (action.type === AuthActionTypes.SetRooms) {
    return {
      ...state,
      rooms: action.payload,
    };
  } else if (action.type === AuthActionTypes.AddRoom) {
    const roomsCopy = cloneDeep(state.rooms);
    roomsCopy.push(action.payload);
    return {
      ...state,
      rooms: roomsCopy,
    };
  } else {
    return state;
  }

  // switch (action.type) {
  //   case AuthActionTypes.SetAuth:
  //     return {
  //       ...action.payload,
  //     };

  //   case AuthActionTypes.RemoveAuth:
  //     return {
  //       token: null,
  //       info: null,
  //     };

  //   case AuthActionTypes.SetRooms:
  //     return {
  //       ...state,
  //       rooms:action.payload
  //     }

  //   default:
  //     return {
  //       ...state,
  //     };
  // }
};
