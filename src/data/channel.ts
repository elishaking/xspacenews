import { Channel } from "../models/channel";

export const channels: Channel[] = [
  {
    name: "CNN",
    url: "https://edition.cnn.com/",
    searchURL:
      "https://edition.cnn.com/search?size=10&q=space%20exploration&type=article",
  },
  {
    name: "BBC",
    url: "https://www.bbc.co.uk",
    searchURL: "https://www.bbc.co.uk/search?q=space+exploration",
  },
  {
    name: "The New Yorker",
    url: "https://www.newyorker.com",
    searchURL: "https://www.newyorker.com/search/q/space%20exploration",
  },
  {
    name: "New York Times",
    url: "https://www.nytimes.com",
    searchURL: "https://www.nytimes.com/search?query=space+exploration",
  },
  {
    name: "Punch",
    url: "https://punchng.com",
    searchURL: "https://punchng.com/search/space+exploration",
  },
];

/*
export const channels: Channels = {
  CNN: {
    name: "CNN",
    url: "",
    searchURL: "",
  },
  BBC: {
    name: "BBC",
    url: "",
    searchURL: "",
  },
  NYT: {
    name: "",
    url: "",
    searchURL: "",
  },
  WAP: {
    name: "",
    url: "",
    searchURL: "",
  },
  TNY: {
    name: "",
    url: "",
    searchURL: "",
  },
};
*/
