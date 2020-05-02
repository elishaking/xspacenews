import { channels } from "../data/channel";
import { getArticlesFromCNN } from "./cnn";

// import { loadingBrowser } from "./browser";
import { Channel } from "../models/channel";
import { Article } from "../models/article";
import path from "path";
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

  await page.goto(channel.searchURL, {
    waitUntil: "networkidle2",
    timeout: 1000000000,
  });
  const articles = await getArticlesFromCNN(page);
};
