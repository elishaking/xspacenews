import { Sequelize } from "sequelize";
import { vars } from "./vars.config";

export const db =
  process.env.NODE_ENV === "production"
    ? new Sequelize(process.env.DATABASE_URL || "", {
        ssl: true,
      })
    : new Sequelize(vars.DB_NAME, "postgres", vars.DB_PASSWORD, {
        host: "localhost",
        dialect: "postgres",
      });
