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
