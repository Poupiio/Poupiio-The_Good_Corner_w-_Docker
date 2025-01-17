import { Picture } from "../entities/Picture";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { TempUser } from "../entities/TempUser";
import { ForgotPassword } from "../entities/ForgotPassword";

export const dataSourceGoodCorner = new DataSource({
   type: "postgres",
   host: "db",
   username: "postgres",
   database: "postgres",
   password: "example",
   entities: [Ad, Category, Tag, Picture, User, TempUser, ForgotPassword],
   synchronize: true,
   logging: ["error", "query"]
});