import { useQuery } from "react-query";
import { getMyDataAPI } from "misc/api";
import { AuthActionTypes } from "misc/context";
import { RoomInfo, UserInfo } from "misc/interfaces";
import { useAuth } from "../useAuth";

export const useUserData = (options?: { enabled?: boolean }) => {
  const { authDispatch } = useAuth();

  const query = useQuery(
    "get_my_data",
    async () => {
      const token = JSON.parse(localStorage.getItem("user-data")).token;
      const response = await getMyDataAPI(token);
      return response;
    },
    {
      enabled: options?.enabled || true,
      onSuccess(data) {
        if (data.status === 200) {
          const rooms: RoomInfo[] = data.data.rooms;
          authDispatch({
            type: AuthActionTypes.SetRooms,
            payload: rooms,
          });
        }
      },
    }
  );
  return query;
};
