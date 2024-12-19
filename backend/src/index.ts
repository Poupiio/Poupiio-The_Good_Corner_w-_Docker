import "reflect-metadata";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';

import { dataSourceGoodCorner } from "./config/db";
import { AdResolver } from "./resolvers/AdResolver";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import { PictureResolver } from "./resolvers/PictureResolver";
import { TagResolver } from "./resolvers/TagResolver";


const start = async () => {
  await dataSourceGoodCorner.initialize();
  
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, PictureResolver, TagResolver],
  });
  
  const server = new ApolloServer({ schema });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
}

start();