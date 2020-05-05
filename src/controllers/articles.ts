import express from "express";

/**
 * Responds with `articles`
 *
 * **route**: /api/v1/articles
 */
export const getArticles = (req: express.Request, res: express.Response) => {
  res.json({
    success: true,
  });
};
