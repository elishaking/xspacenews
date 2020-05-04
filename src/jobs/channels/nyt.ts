import { Page } from "puppeteer";

import { Channel } from "../../models/channel";
import { Channels } from "../../data/channel";
import { logError } from "../../utils/logger";
import { Article } from "../../models/article";

export const getArticlesFromNYT = async (page: Page) => {
  return page
    .evaluate(() => {
      const logError = (error: any) => {
        console.error(error);
      };

      const extrationError = (channelName: string, fieldName: string) =>
        `${channelName}: Error extracting ARTICLE_${fieldName.toUpperCase()}`;

      class NYT implements Channel {
        static ARTICLE_QUERY_STRING = ".css-1kl114x";

        name = "New York Times";
        url = "https://www.nytimes.com";
        searchURL = "https://www.nytimes.com/search?query=space+exploration";

        getArticleURL(a: HTMLAnchorElement | null): string {
          const url = a?.href.trim();

          if (url == undefined) logError(extrationError(this.name, "URL"));

          return url || "";
        }

        getArticleImageURL(articleDiv: Element | null): string {
          const imageURL = articleDiv?.querySelector<HTMLImageElement>(
            "figure img"
          )?.src;

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

        getArticleDescription(a: Element | null): string {
          const description = a
            ?.querySelector("p")
            ?.textContent?.trim()
            .substring(0, 1000);

          if (description == undefined)
            logError(extrationError(this.name, "description"));

          return description || "";
        }

        getArticleDate(content: Element | null): number {
          const dateString = content?.querySelector("time")?.textContent;

          if (dateString == undefined) {
            logError(extrationError(this.name, "date"));
            return Date.now();
          }

          const dateStringArr = (dateString as string).split(",");
          if (dateStringArr[1] == undefined) dateStringArr[1] = "2020";

          return new Date(dateStringArr.join(", ")).getTime();
        }

        /**
         * Gets all articles from `NYT` channel. Call from browser context
         */
        getArticles(): Article[] {
          const articles: Article[] = [];
          const articleDivs = document.querySelectorAll(
            NYT.ARTICLE_QUERY_STRING
          );

          articleDivs.forEach((articleDiv) => {
            const a = articleDiv.querySelector<HTMLAnchorElement>(
              ".css-e1lvw9 a"
            );

            const article: Article = {
              url: this.getArticleURL(a),
              imageURL: this.getArticleImageURL(articleDiv),
              source: this.name,
              title: this.getArticleTitle(a),
              description: this.getArticleDescription(a),
              date: this.getArticleDate(articleDiv),
            };

            // console.log(article);

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

      return new NYT().getArticles();
    })
    .catch((err) => logError(err));
};
