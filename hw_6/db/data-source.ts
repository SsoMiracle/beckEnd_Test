import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { NewsPost } from "./entities/NewsPost";
import path from "path";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "news_db",
  synchronize: false,
  logging: true,
  entities: [User, NewsPost],
  migrations: [path.join(__dirname, "migrations/*.{ts,js}")],
  subscribers: [],
});
