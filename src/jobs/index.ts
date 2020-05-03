import { channels } from "../data/channel";
import { getArticlesFromCNN } from "./cnn";

import { loadingBrowser } from "./browser";
import { Channel } from "../models/channel";
import { Article, ArticleModel } from "../models/article";

import puppeteer from "puppeteer";
import { Model } from "sequelize/types";

export const runJobs = () => {
  //   channels.forEach((channel) => {
  //     getUpdatesFromChannel(channel);
  //   });

  getUpdatesFromChannel(channels[0]);
};

const getUpdatesFromChannel = async (channel: Channel) => {
  const browser = await loadingBrowser;
  const page = await browser.newPage();

  await page.goto(channel.searchURL, {
    waitUntil: "networkidle2",
    timeout: 1000000000,
  });
  const articles = (await getArticlesFromCNN(page)) as Article[];

  articles?.forEach((article) => {
    ArticleModel.create(article).then((articleCreated) => {
      console.log(
        `${new Date().toDateString()} Created article: from ${channel.name}`
      );
      // console.log(articleCreated);
    });
  });
};
