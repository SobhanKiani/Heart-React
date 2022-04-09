import { info } from "console";
import moment from "moment";
import { useState, FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth, useSocket, useToast } from "misc/hooks";
import { EmojiChooser, Heart } from "../../components";
import { Emoji, UserMiniInfo } from "../../misc/interfaces";

const HeartPage: FC = () => {
  const { id: roomId } = useParams();
  const [lastSeen, setlastSeen] = useState<string>("");
  const [contactInfo, setContactInfo] = useState<UserMiniInfo>();
  const {
    authState: { rooms, info: userInfo },
  } = useAuth();

  const [currentEmoji, setCurrentEmoji] = useState<Emoji>({
    name: "heart",
    icon: "❤️",
    size: 70,
  });

  const {
    socketState: { socket },
  } = useSocket();

  useEffect(() => {
    if (rooms && !contactInfo) {
      const thisRoom = rooms.find((room) => room.id === roomId);
      const contact = thisRoom.users.find((user) => user.id !== userInfo.id);
      setContactInfo(contact);
      setlastSeen(getLastSeen(contact));
    }
  }, [rooms]);

  useEffect(() => {
    if (socket && contactInfo) {
      socket.emit("is_online", contactInfo.id);

      socket.on("is_online", (user: UserMiniInfo) => {
        if (user.id === contactInfo.id) {
          console.log("online trigger");
          setlastSeen(getLastSeen(contactInfo, true));
        }
      });

      socket.on("is_offline", (user: UserMiniInfo) => {
        if (user.id === contactInfo.id) {
          console.log("offline trigger");
          setlastSeen(getLastSeen(contactInfo, false));
        }
      });
    }
  }, [socket]);

  const getLastSeen = (contact: UserMiniInfo, isOnline?: boolean) => {
    if (isOnline) {
      return "online";
    }

    if (!isOnline === false) {
      return moment().fromNow();
    }

    if (contact?.lastSeen) {
      return moment(contact.lastSeen).fromNow();
    }

    return "not defined";
  };

  return (
    <div className="main-page">
      <div className="main-page__info">
        <div className="main-page__emoji-wrapper">
          <EmojiChooser
            currentEmoji={currentEmoji}
            onClick={(selectedEmoji) => setCurrentEmoji(selectedEmoji)}
          />
        </div>
        <div className="main-page__contact">{contactInfo?.username}</div>
      </div>
      <div className="send-heart-wrapper">
        <div className="send-heart">
          <Heart
            onClick={() => {
              socket.emit("emoji", {
                type: currentEmoji.name,
                roomId: roomId,
                reciever: contactInfo.id,
              });
            }}
            emoji={currentEmoji}
          />
        </div>
      </div>
      <div className="main-page__contact last-seen">{lastSeen}</div>
    </div>
  );
};

export default HeartPage;
