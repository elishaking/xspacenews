import { channels } from "../data/channel";
import axios from "axios";
// import { logInfo } from "../utils/logger";

export const runJobs = () => {
  //   channels.forEach((channel) => {
  //     getUpdatesFromChannel(channel);
  //   });

  getUpdatesFromChannel(channels[0]);
};

const getUpdatesFromChannel = (channel: Channel) => {
  axios.get(channel.searchURL).then((res) => {});
};
