import { Request, Response } from "express";
import * as ArticleService from "../services/articles";
import { ArticleResponse, ErrorResponse } from "../models/response";

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
      // TODO: do not return error object
      const response: ErrorResponse = {
        success: false,
        message: err.message,
        statusCode: 400,
        error: err,
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
      // TODO: do not return error object
      const response: ErrorResponse = {
        success: false,
        message: err.message,
        statusCode: 400,
        error: err,
      };

      res.json(response);
    });
};
