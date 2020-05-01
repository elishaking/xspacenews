import { Article } from "./article";
import { logError } from "../utils/logger";

export interface Channel {
  name: string;
  url: string;
  searchURL: string;
}

export interface Channels {
  [channel: string]: Channel;
}

const extrationError = (channelName: string, fieldName: string) =>
  `${channelName}: Error extracting ARTICLE_${fieldName.toUpperCase()}`;

export class CNN implements Channel {
  static ARTICLE_QUERY_STRING = ".cnn-search__result";
  static CONTENT_QUERY_STRING = ".cnn-search__result-contents";
  static BODY_QUERY_STRING = ".cnn-search__result-body";
  static DATE_QUERY_STRING = ".cnn-search__result-publish-date";

  name = "CNN";
  url = "https://edition.cnn.com/";
  searchURL =
    "https://edition.cnn.com/search?size=10&q=space%20exploration&type=article";

  getArticleURL(a: HTMLAnchorElement | null): string {
    const url = a?.href;

    if (url == undefined) logError(extrationError(this.name, "URL"));

    return url || "";
  }

  getArticleImageURL(a: HTMLAnchorElement | null): string {
    const imageURL = (a?.children[0] as HTMLImageElement | undefined)?.src;

    if (imageURL == undefined) logError(extrationError(this.name, "image_url"));

    return imageURL || "";
  }

  getArticleTitle(content: Element | null): string {
    const title = content?.querySelector("a")?.textContent;

    if (title == undefined) logError(extrationError(this.name, "title"));

    return title || "";
  }

  getArticleDescription(content: Element | null): string {
    const description = content
      ?.querySelector(".cnn-search__result-body")
      ?.textContent?.trim()
      .substring(0, 1000);

    if (description == undefined)
      logError(extrationError(this.name, "description"));

    return description || "";
  }

  getArticleDate(content: Element | null): number {
    const dateString = content?.querySelector(
      ".cnn-search__result-publish-date"
    )?.children[1].textContent;

    if (dateString == undefined) {
      logError(extrationError(this.name, "date"));
      return Date.now();
    }

    return new Date(dateString).getTime();
  }

  /**
   * Gets all articles from `CNN` channel. Call from browser context
   */
  getArticles(): Article[] {
    const articles: Article[] = [];
    const articleDivs = document.querySelectorAll(".cnn-search__result");

    articleDivs.forEach((articleDiv) => {
      const a = articleDiv.querySelector<HTMLAnchorElement>(
        ".cnn-search__result-thumbnail a"
      );
      const content = articleDiv.querySelector(".cnn-search__result-contents");

      const article: Article = {
        url: this.getArticleURL(a),
        imageURL: this.getArticleImageURL(a),
        source: this.name,
        title: this.getArticleTitle(content),
        description: this.getArticleDescription(content),
        date: this.getArticleDate(content),
      };

      articles.push(article);
    });

    return articles;
  }
}
