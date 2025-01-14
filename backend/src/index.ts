import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';
import { dataSourceGoodCorner } from "./config/db";
import { AdResolver } from "./resolvers/AdResolver";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import { PictureResolver } from "./resolvers/PictureResolver";
import { TagResolver } from "./resolvers/TagResolver";
import UserResolver from "./resolvers/UserResolver";
import jwt, { Secret } from "jsonwebtoken";

const start = async () => {
  if (process.env.JWT_SECRET_KEY === undefined || process.env.JWT_SECRET_KEY === null) {
    throw Error("No JWT secret key")
  }
  await dataSourceGoodCorner.initialize();
  
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, PictureResolver, TagResolver, UserResolver],
  });
  
  const server = new ApolloServer({ schema });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const token = req.headers.authorization?.split("Bearer ")[1];
      if (token) {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret);
        console.log("payload in context", payload);
        if (payload) {
          console.log("payload was found and returned to resolver");
          return payload;
        }
      }
      return {};
    },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
}

start();