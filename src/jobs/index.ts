import { channels } from "../data/channel";
import axios from "axios";

export const runJobs = () => {
  channels.forEach((channel) => {
    getUpdatesFromChannel(channel);
  });
};

const getUpdatesFromChannel = (channel: Channel) => {
  axios.get(channel.searchURL).then((res) => {
    console.log(res.data);
  });
};
