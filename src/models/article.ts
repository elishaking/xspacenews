export interface Article {
  url: string;
  imageURL: string;
  title: string;
  description: string;
  source: string;
  date: number;
}

import Sequelize from "sequelize";
import { db } from "../config/db";

const Article = db.define("article", {
  url: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  imageURL: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  title: {
    allowNull: false,
    type: Sequelize.STRING,
  },

  description: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  source: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  date: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
});

Article.sync();
