import { Article } from "./article";
import { logError } from "../utils/logger";

export interface Channel {
  name: string;
  url: string;
  searchURL: string;
}

export interface Channels {
  [channel: string]: Channel;
}
