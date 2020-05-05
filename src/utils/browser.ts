import puppeteer from "puppeteer";

export const loadingBrowser = (async () =>
  await puppeteer.launch({ headless: true, args: ["--no-sandbox"] }))();
