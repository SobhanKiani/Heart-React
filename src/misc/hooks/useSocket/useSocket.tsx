import React, { useContext, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "misc/context/socket-context";
import { SocketActionTypes } from "misc/context/socket-context/types";
import { RoomInfo } from "misc/interfaces";
import { useToast, useUserData } from "..";

export const useSocket = () => {
  const { socketState, socketDispatch } = useContext(SocketContext);

  return {
    socketState: useMemo(() => socketState, [socketState]),
    socketDispatch,
  };
};
