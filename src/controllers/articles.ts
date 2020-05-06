import { Request, Response } from "express";
import * as ArticleService from "../services/articles";
import { ArticleResponse, ErrorResponse } from "../models/response";
import { Article } from "../models/article";

/**
 * Responds with `articles`
 *
 * **route**: /api/v1/articles
 */
export const getArticles = (req: Request, res: Response) => {
  ArticleService.getArticles()
    .then((articles) => {
      const response: ArticleResponse = {
        success: true,
        message: `Retrieved ${articles.length} articles`,
        statusCode: 200,
        data: articles,
      };

      res.json(response);
    })
    .catch((err) => {
      const response: ErrorResponse = {
        success: false,
        message: err.message,
        statusCode: 400,
        error: process.env.NODE_ENV === "development" ? err : {},
      };

      res.json(response);
    });
};

/**
 * Responds with `article` at a given `id`
 *
 * **route**: /api/v1/articles/:id
 */
export const getArticleByID = (req: Request, res: Response) => {
  const { id } = req.params;

  ArticleService.getArticleByID(parseInt(id))
    .then((article) => {
      const response: ArticleResponse = {
        success: true,
        message: `Retrieved article with id: ${id}`,
        statusCode: 200,
        data: article,
      };

      res.json(response);
    })
    .catch((err) => {
      const response: ErrorResponse = {
        success: false,
        message: err.message,
        statusCode: 400,
        error: process.env.NODE_ENV === "development" ? err : {},
      };

      res.json(response);
    });
};

/**
 * Responds with `articles` that match the specified `query`
 *
 * **route**: /api/v1/articles/search/:query
 */
export const getArticlesBySearchQuery = (req: Request, res: Response) => {
  const { query } = req.params;

  ArticleService.getArticlesBySearchQuery(query)
    .then((articles) => {
      const response: ArticleResponse = {
        success: true,
        message: `Retrieved ${articles.length} articles with query: ${query}`,
        statusCode: 200,
        data: articles,
      };

      res.json(response);
    })
    .catch((err) => {
      const response: ErrorResponse = {
        success: false,
        message: err.message,
        statusCode: 400,
        error: process.env.NODE_ENV === "development" ? err : {},
      };

      res.json(response);
    });
};

/**
 * Updates `article` with specified `id` in the database
 */
export function updateArticleByID(req: Request, res: Response) {
  const article: Article = req.body;
  console.log(article);

  ArticleService.updateArticle(article)
    .then((updatedArticle) => {
      const response: ArticleResponse = {
        success: true,
        message: `Updated article at id: ${updatedArticle.id}`,
        statusCode: 200,
        data: updatedArticle,
      };

      res.json(response);
    })
    .catch((err) => {
      const response: ErrorResponse = {
        success: false,
        message: err.message,
        statusCode: 400,
        error: process.env.NODE_ENV === "development" ? err : {},
      };

      res.json(response);
    });
}
