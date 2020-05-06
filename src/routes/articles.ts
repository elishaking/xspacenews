import { Router } from "express";
import {
  getArticles,
  getArticleByID,
  getArticlesBySearchQuery,
  updateArticleByID,
} from "../controllers/articles";

export const articles = Router();

// route: /api/v1/articles
articles.route("/").get(getArticles);

// route: /api/v1/articles/:id
articles.route("/:id").get(getArticleByID).put(updateArticleByID);

// route: /api/v1/articles/search/:query
articles.route("/search/:query").get(getArticlesBySearchQuery);
