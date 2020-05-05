export interface Article {
  url: string;
  imageURL: string;
  title: string;
  description: string;
  source: string;
  date: number;
}

import Sequelize, { Model, BuildOptions } from "sequelize";
import { db } from "../config/db";

export interface ArticleModelAttributes extends Model {
  readonly url: string;
  readonly imageURL: string;
  readonly title: string;
  readonly description: string;
  readonly source: string;
  readonly date: number;
}

type ArticleModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ArticleModelAttributes;
};

export const ArticleModel = <ArticleModelStatic>db.define(
  "article",
  {
    url: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    imageURL: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },

    description: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    source: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    date: {
      allowNull: false,
      type: Sequelize.BIGINT({
        unsigned: true,
      }),
    },
  },
  {
    timestamps: true,
  }
);

// ArticleModel.sync({alter: true});
