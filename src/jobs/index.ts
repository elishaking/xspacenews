import { channels } from "../data/channel";

export const runJobs = () => {
  channels.forEach((channel) => {
    getUpdatesFromChannel(channel);
  });
};

const getUpdatesFromChannel = (channel: Channel) => {};
