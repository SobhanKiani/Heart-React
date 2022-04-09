import { useState, FC } from "react";
import "./EmojiChooser.scss";
import { Emoji, EmojiChooserProps } from "../../misc/interfaces";
import { cloneDeep } from "lodash";

export const EmojiChooser: FC<EmojiChooserProps> = ({
  onClick,
  currentEmoji,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [emojiList, setEmojiList] = useState<Emoji[]>([
    {
      name: "heart",
      icon: "❤️",
      size: 70,
    },
    {
      name: "happySmile",
      icon: "☺️",
      size: 70,
    },
  ]);

  const onEmojiClick = (emoji: Emoji) => {
    setIsOpen(false);

    const emojiListCopy = cloneDeep(emojiList);
    const currIndex = emojiListCopy.findIndex((em) => em.name === emoji.name);
    emojiListCopy.splice(currIndex, 1);
    emojiListCopy.unshift(emoji);
    setEmojiList(emojiListCopy);

    onClick(emoji);
  };

  return (
    <div
      className={`emojis-box ${isOpen && "open"}`}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(true);
      }}
    >
      {isOpen ? (
        <div className={`emojis-list`}>
          {emojiList.map((emoji, index) => (
            <div
              className="emoji"
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                onEmojiClick(emoji);
              }}
            >
              {emoji.icon}
            </div>
          ))}
        </div>
      ) : (
        <div className="emoji">{currentEmoji.icon}</div>
      )}
    </div>
  );
};
