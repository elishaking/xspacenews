import { ArticleModel, ArticleModelAttributes } from "../models/article";
import { logError } from "../utils/logger";

/**
 * Finds and returns all `articles` from the database
 */
export function getArticles(): Promise<ArticleModelAttributes[]> {
  return new Promise((resolve, reject) => {
    ArticleModel.findAll()
      .then((articles) => {
        resolve(articles);
      })
      .catch((err) => {
        logError(err);
        reject(err);
      });
  });
}
