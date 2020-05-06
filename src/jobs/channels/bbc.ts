import { Page } from "puppeteer";

import { Channel } from "../../models/channel";
import { logError } from "../../utils/logger";
import { Article } from "../../models/article";

export const getArticlesFromBBC = async (page: Page) => {
  return page
    .evaluate(() => {
      const logError = (error: any) => {
        console.error(error);
      };

      const extrationError = (channelName: string, fieldName: string) =>
        `${channelName}: Error extracting ARTICLE_${fieldName.toUpperCase()}`;

      class BBC implements Channel {
        static ARTICLE_QUERY_STRING = ".ett16tt11";
        // static CONTENT_QUERY_STRING = ".ett16tt9";
        // static BODY_QUERY_STRING = ".ett16tt7";
        // static DATE_QUERY_STRING = ".ecn1o5v0`";

        name = "BBC";
        url = "https://www.bbc.co.uk";
        searchURL = "https://www.bbc.co.uk/search?q=space+exploration";

        getArticleURL(a: HTMLAnchorElement | null): string {
          const url = a?.href;

          if (url == undefined) logError(extrationError(this.name, "URL"));

          return url || "";
        }

        getArticleImageURL(articleDiv: HTMLDivElement | null): string {
          const imageURL = articleDiv?.querySelector<HTMLImageElement>(
            ".ee0ct7c0"
          )?.src;

          if (imageURL == undefined)
            logError(extrationError(this.name, "image_url"));

          return imageURL || "";
        }

        getArticleTitle(a: HTMLAnchorElement | null): string {
          const title = a?.textContent;

          if (title == undefined) logError(extrationError(this.name, "title"));

          if ((title as string).length > 250)
            return `${(title as string).substring(0, 250)}...`;

          return title || "";
        }

        getArticleDescription(content: Element | null): string {
          const description = content
            ?.querySelectorAll("p")[1]
            ?.textContent?.trim()
            .substring(0, 1000);

          if (description == undefined)
            logError(extrationError(this.name, "description"));

          return description || "";
        }

        getArticleDate(content: Element | null): number {
          const dateString = content
            ?.querySelector(".ecn1o5v0")
            ?.children[1].textContent?.trim();

          if (dateString == undefined) {
            logError(extrationError(this.name, "date"));
            return Date.now();
          }

          return new Date(dateString).getTime();
        }

        /**
         * Gets all articles from `BBC` channel. Call from browser context
         */
        getArticles(): Article[] {
          const articles: Article[] = [];
          const articleDivs = document.querySelectorAll(
            BBC.ARTICLE_QUERY_STRING
          );

          articleDivs.forEach((articleDiv) => {
            const a = articleDiv.querySelector<HTMLAnchorElement>(
              ".ett16tt9 a"
            );
            const content = articleDiv.querySelector(".ett16tt9");

            const article: Article = {
              url: this.getArticleURL(a),
              imageURL: this.getArticleImageURL(articleDiv as HTMLDivElement),
              source: this.name,
              title: this.getArticleTitle(a),
              description: this.getArticleDescription(content),
              date: this.getArticleDate(content),
              clicks: 0,
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

      return new BBC().getArticles();
    })
    .catch((err) => logError(err));
};
