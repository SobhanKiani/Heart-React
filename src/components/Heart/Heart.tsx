import { useState, FC, useEffect } from "react";
import "./Heart.scss";
import Lottie from "react-lottie";
import * as heartAnim from "../../assets/lottie/heart.json";
import * as smileAnim from "../../assets/lottie/happySmile.json";

import { HeartProps } from "../../misc/interfaces";

const heartOptions = {
  loop: true,
  autoplay: true,
  animationData: heartAnim,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const happySmileOptions = {
  loop: true,
  autoplay: true,
  animationData: smileAnim,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const Heart: FC<HeartProps> = ({ onClick, emoji }) => {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [emojiOptions, setEmojiOptions] = useState<any>(heartOptions);
  const [color, setColor] = useState("red");

  useEffect(() => {
    const getEmoji = () => {
      switch (emoji.name) {
        case "heart":
          return heartOptions;
        case "happySmile":
          return happySmileOptions;
      }
    };
    const emojiOptions = getEmoji();
    setColor(emoji.name === "heart" ? "red" : "yellow");
    setEmojiOptions(emojiOptions);
  }, [emoji]);


  return (
    <div className="heart-radar">

      <div
        className="heart"
        onClick={() => {
          setIsPaused(false);
          onClick();
        }}
      >
        <Lottie
          options={emojiOptions}
          width={emoji.size + "%"}
          height={emoji.size + "%"}
          isPaused={isPaused}
          eventListeners={[
            {
              eventName: "loopComplete",
              callback: () => {
                setIsPaused(true);
              },
            },
          ]}
        />
      </div>
      
      <div className={`radar ${color} xs`}></div>
      <div className={`radar ${color} s`}></div>
      <div className={`radar ${color} m`}></div>
      <div className={`radar ${color} b`}></div>
      <div className={`radar ${color} xb`}></div>
      <div className={`radar ${color} xxb`}></div>
      <div className={`radar ${color} xxxb`}></div>
    </div>
  );
};
