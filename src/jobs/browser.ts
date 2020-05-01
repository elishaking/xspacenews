import puppeteer from "puppeteer";

export const browser = (async () => await puppeteer.launch())();
