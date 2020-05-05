import Sequelize from "sequelize";

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

/**
 * Finds and returns an `article` with the specified `id` from the database
 */
export function getArticleByID(id: number): Promise<ArticleModelAttributes> {
  return new Promise((resolve, reject) => {
    ArticleModel.findByPk(id)
      .then((article) => {
        if (article) resolve(article);
        else {
          logError(`Article with id: ${id} does not exist`);
          reject(`Article with id: ${id} does not exist`);
        }
      })
      .catch((err) => {
        logError(err);
        reject(err);
      });
  });
}

/**
 * Finds and returns all `articles` that match the specified `query` from the database
 */
export function getArticlesBySearchQuery(
  query: string
): Promise<ArticleModelAttributes[]> {
  return new Promise((resolve, reject) => {
    ArticleModel.findAll({
      where: Sequelize.or(
        { title: { contains: query } },
        { description: { contains: query } },
        { source: { contains: query } }
      ),
    })
      .then((articles) => {
        resolve(articles);
      })
      .catch((err) => {
        logError(err);
        reject(err);
      });
  });
}
