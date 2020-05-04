import puppeteer from "puppeteer";

export const loadingBrowser = (async () =>
  await puppeteer.launch({ devtools: true }))();
