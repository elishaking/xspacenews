interface Channel {
  name: string;
  url: string;
  searchURL: string;
}

interface Channels {
  [channel: string]: Channel;
}
