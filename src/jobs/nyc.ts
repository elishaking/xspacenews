import { Page } from "puppeteer";

import { Channel } from "../models/channel";
import { logError } from "../utils/logger";
import { Article } from "../models/article";

export const getArticlesFromNYC = async (page: Page) => {
  return page
    .evaluate(() => {
      const logError = (error: any) => {
        console.error(error);
      };

      const extrationError = (channelName: string, fieldName: string) =>
        `${channelName}: Error extracting ARTICLE_${fieldName.toUpperCase()}`;

      class NYC implements Channel {
        static ARTICLE_QUERY_STRING = ".River__riverItem___3huWr";
        static CONTENT_QUERY_STRING = ".River__riverItemBody___347sz";

        name = "New York Times";
        url = "https://www.nytimes.com";
        searchURL = "https://www.nytimes.com/search?query=space+exploration";

        getArticleURL(a: HTMLAnchorElement | null): string {
          const url = a?.href;

          if (url == undefined) logError(extrationError(this.name, "URL"));

          return url || "";
        }

        getArticleImageURL(articleDiv: HTMLDivElement | null): string {
          const imageURL = articleDiv
            ?.querySelector("img")
            ?.src.replace(/w_[0-9]+/, "w_500");

          if (imageURL == undefined)
            logError(extrationError(this.name, "image_url"));

          return imageURL || "";
        }

        getArticleTitle(a: HTMLAnchorElement | null): string {
          const title = a?.querySelector("h4")?.textContent;

          if (title == undefined) logError(extrationError(this.name, "title"));

          if ((title as string).length > 250)
            return `${(title as string).substring(0, 250)}...`;

          return title || "";
        }

        getArticleDescription(content: Element | null): string {
          const description = content
            ?.querySelector(".River__dek___CayIg")
            ?.textContent?.trim()
            .substring(0, 1000);

          if (description == undefined)
            logError(extrationError(this.name, "description"));

          return description || "";
        }

        getArticleDate(content: Element | null): number {
          const dateString = content?.querySelector("h6")?.textContent;

          if (dateString == undefined) {
            logError(extrationError(this.name, "date"));
            return Date.now();
          }

          return new Date(dateString).getTime();
        }

        /**
         * Gets all articles from `NYC` channel. Call from browser context
         */
        getArticles(): Article[] {
          const articles: Article[] = [];
          const articleDivs = document.querySelectorAll(
            NYC.ARTICLE_QUERY_STRING
          );

          articleDivs.forEach((articleDiv) => {
            const a = articleDiv.querySelector(".River__hed___re6RP")
              ?.parentElement as HTMLAnchorElement | null;
            const content = articleDiv.querySelector(NYC.CONTENT_QUERY_STRING);

            const article: Article = {
              url: this.getArticleURL(a),
              imageURL: this.getArticleImageURL(articleDiv as HTMLDivElement),
              source: this.name,
              title: this.getArticleTitle(a),
              description: this.getArticleDescription(content),
              date: this.getArticleDate(content),
            };

            if (
              article.url !== "" &&
              article.imageURL !== "" &&
              article.title !== "" &&
              article.description !== ""
            )
              articles.push(article);
          });

          return articles;
        }
      }

      return new NYC().getArticles();
    })
    .catch((err) => logError(err));
};
