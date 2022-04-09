import { Socket } from "socket.io-client";

export interface HeartProps {
  onClick: () => void;
  emoji: Emoji;
}

export interface ToastProps {
  // show: boolean;
  // onToastFinish: () => void;
  // duration: number;
  // message: string | null;
  // emoji: Emoji | null;
}

export interface Emoji {
  name: string;
  icon: string;
  size: number;
}
export interface EmojiChooserProps {
  onClick: (emoji: Emoji) => void;
  currentEmoji: Emoji;
}

export interface Toast {
  message: string;
  emoji: Emoji;
  id?: string;
  show?: boolean;
}

export interface UserMiniInfo {
  id: string;
  username: string;
  lastSeen?: Date;
}

export interface UserInfo {
  token: string | null;
  info: UserMiniInfo | null;
  rooms?: RoomInfo[];
}

export interface SearchProps {}

export enum searchTypes {
  USER = "USER",
}

export interface RoomInfo {
  id: string;
  name: string;
  users: UserMiniInfo[];
  emojisCount: number;
}
