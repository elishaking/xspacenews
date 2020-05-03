import { channels } from "../data/channel";
import { getArticlesFromCNN } from "./cnn";
import { getArticlesFromBBC } from "./bbc";

import { loadingBrowser } from "./browser";
import { Channel } from "../models/channel";
import { Article, ArticleModel } from "../models/article";

import puppeteer from "puppeteer";
import { Model } from "sequelize/types";

enum Channels {
  CNN = "CNN",
  BBC = "BBC",
  NYT = "New York Times",
  PUNCH = "Punch",
}

export const runJobs = () => {
  //   channels.forEach((channel) => {
  //     getUpdatesFromChannel(channel);
  //   });

  getUpdatesFromChannel(channels[1]);
};

const getChannelArticleFunction = (name: string) => {
  if (name === Channels.CNN) return getArticlesFromCNN;
  else if (name === Channels.BBC) return getArticlesFromBBC;
  else return getArticlesFromBBC;
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

  console.log(articles);

  // articles?.forEach((article) => {
  //   ArticleModel.create(article).then((articleCreated) => {
  //     console.log(
  //       `${new Date().toDateString()} Created article: from ${channel.name}`
  //     );
  //     // console.log(articleCreated);
  //   });
  // });
};
