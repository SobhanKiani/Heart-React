import { AuthActionTypes } from "misc/context";
import { SocketActionTypes } from "misc/context/socket-context/types";
import { useAuth, useSocket, useToast, useUserData } from "misc/hooks";
import { RoomInfo } from "misc/interfaces";
import React, { FC, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketInitializer: FC<{ children: React.ReactChild }> = ({
  children,
}) => {
  const { authDispatch, authState } = useAuth();
  const { createToast } = useToast();
  const {
    socketDispatch,
    socketState: { socket },
  } = useSocket();

  const { data: userData } = useUserData();

  useEffect((): any => {
    const token: string = JSON.parse(localStorage.getItem("user-data"))?.token;

    if (token && userData && !socket) {
      const newSocket = io(`localhost:6111`, {
        auth: {
          token,
        },
      });
      console.log("new socket");
      socketDispatch({
        type: SocketActionTypes.SetSocket,
        payload: newSocket,
      });

      newSocket.connect();

      const userRoomIds: string[] = userData.data?.rooms?.map(
        (room: RoomInfo) => {
          return room.id;
        }
      );

      userRoomIds.forEach((roomId) => {
        newSocket.emit("join_room", { roomId });
      });

      newSocket?.on(
        "emoji",
        (data: { type: string; sender: string; roomId: string }) => {
          console.log("emoji recieved");
          if (data.type === "heart") {
            createToast({
              message: `From ${data.sender}`,
              emoji: {
                name: "heart",
                icon: "❤️",
                size: 70,
              },
            });
          } else if (data.type === "happySmile") {
            createToast({
              message: `From ${data.sender}`,
              emoji: {
                name: "happySmile",
                icon: "☺️",
                size: 70,
              },
            });
          }
        }
      );

      newSocket.on("create_room", (data: RoomInfo) => {
        authDispatch({
          type: AuthActionTypes.AddRoom,
          payload: data,
        });
      });

      newSocket.on("error", (data: { status: number; message: string }) => {
        createToast({
          message: data.message,
          emoji: {
            name: "!",
            icon: "❗️",
            size: 30,
          },
        });
      });

      window.addEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        newSocket.close();
      });
    }
  }, [userData]);

  return <>{children}</>;
};
