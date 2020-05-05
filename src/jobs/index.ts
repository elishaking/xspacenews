import { channels, Channels } from "../data/channel";

import { loadingBrowser } from "../utils/browser";
import { Channel } from "../models/channel";
import { Article, ArticleModel } from "../models/article";

import { getArticlesFromCNN } from "./channels/cnn";
import { getArticlesFromBBC } from "./channels/bbc";
import { getArticlesFromTNY } from "./channels/tny";
import { getArticlesFromNYT } from "./channels/nyt";
import { Intervals } from "../data/intervals";

export const runJobs = () => {
  channels.forEach((channel) => {
    getUpdatesFromChannel(channel);
  });

  setTimeout(runJobs, Intervals.DAY);
};

const getChannelArticleFunction = (name: string) => {
  if (name === Channels.CNN) return getArticlesFromCNN;
  else if (name === Channels.BBC) return getArticlesFromBBC;
  else if (name === Channels.TNY) return getArticlesFromTNY;
  else if (name === Channels.NYT) return getArticlesFromNYT;
  else return getArticlesFromNYT;
};

const getUpdatesFromChannel = async (channel: Channel) => {
  const browser = await loadingBrowser;
  const page = await browser.newPage();

  await page.goto(channel.searchURL, {
    waitUntil: "networkidle2",
    timeout: 1000000000,
  });
  const articles = (await getChannelArticleFunction(channel.name)(
    page
  )) as Article[];

  // console.log(articles);

  articles?.forEach((article) => {
    ArticleModel.create(article)
      .then((articleCreated) => {
        console.log(
          `${new Date().toDateString()} Created article: from ${channel.name}`
        );
        // console.log(articleCreated);
      })
      .catch((err) => console.error(err));
  });
};
