import { channels } from "../data/channel";

// import { loadingBrowser } from "./browser";
import { Channel, CNN } from "../models/channel";
import { Article } from "../models/article";
// import { logInfo } from "../utils/logger";

import puppeteer from "puppeteer";

export const runJobs = () => {
  //   channels.forEach((channel) => {
  //     getUpdatesFromChannel(channel);
  //   });

  getUpdatesFromChannel(channels[0]);
};

const getUpdatesFromChannel = async (channel: Channel) => {
  const browser = await puppeteer.launch({ devtools: true });
  const page = await browser.newPage();

  await page.goto(channel.searchURL, { waitUntil: "networkidle2" });
  await page.evaluate(() => {
    const articles: Article[] = new CNN().getArticles();

    console.log(articles);
  });
};
