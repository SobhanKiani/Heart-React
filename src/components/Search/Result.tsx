import { useAuth, useSocket } from "misc/hooks";
import { FC } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { ResultProps } from "./types";

export const Result: FC<ResultProps> = ({ data, show, setShow }) => {
  const { authState } = useAuth();
  const {
    socketState: { socket },
  } = useSocket();

  return (
    <div className="search-result">
      <div className="search-result__header">
        <div
          className="search-result__header-icon"
          onClick={() => setShow(false)}
        >
          <IoCloseOutline size={"3rem"} color="#fff" />
        </div>
      </div>

      <div className="search-result__list">
        {data &&
          data.map((user: { username: string; id: string }, index) => (
            <div
              className="search-result__item"
              key={index}
              onClick={() => {
                if (socket) {
                  socket.emit("create_room", {
                    name: `${authState.info.username}-${user.username}`,
                    users: [authState.info.id, user.id],
                  });
                  setShow(false);
                }
              }}
            >
              @{user.username}
            </div>
          ))}
      </div>
    </div>
  );
};
