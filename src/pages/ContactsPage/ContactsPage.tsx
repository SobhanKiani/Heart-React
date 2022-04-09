import { Toast } from "components";
import Loading from "components/Loading/Loading";
import { Search } from "components/Search";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "misc/hooks/useAuth";
import { RoomInfo } from "misc/interfaces";

const ContactsPage = () => {
  const { authState } = useAuth();
  const [rooms, setRooms] = useState<RoomInfo[]>();
  const navigate = useNavigate();

  const getHeartName = (room) => {
    const user = room.users.find((user) => user.id !== authState.info.id);
    if (user) {
      return user.username;
    } else {
      return authState.info.username;
    }
  };

  useEffect(() => {
    setRooms(authState.rooms);
  }, [authState.rooms]);

  return (
    <>
      <div className="contacts">
        <Search />
        {!authState.rooms ? (
          <Loading />
        ) : (
          <div className="contacts__list">
            {rooms?.map((room: RoomInfo, index) => (
              <div
                className="contacts__item"
                onClick={() => navigate(`/heart/${room.id}`)}
                key={index}
              >
                <div className="contacts__item__title">
                  {getHeartName(room)}
                </div>
                {room?.emojisCount > 0 && (
                  <div className="contacts__item__info">{room.emojisCount}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ContactsPage;
