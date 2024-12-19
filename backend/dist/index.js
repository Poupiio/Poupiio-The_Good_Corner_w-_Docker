"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const type_graphql_1 = require("type-graphql");
const db_1 = require("./config/db");
const AdResolver_1 = require("./resolvers/AdResolver");
const CategoryResolver_1 = require("./resolvers/CategoryResolver");
const PictureResolver_1 = require("./resolvers/PictureResolver");
const TagResolver_1 = require("./resolvers/TagResolver");
const start = async () => {
    await db_1.dataSourceGoodCorner.initialize();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [AdResolver_1.AdResolver, CategoryResolver_1.CategoryResolver, PictureResolver_1.PictureResolver, TagResolver_1.TagResolver],
    });
    const server = new server_1.ApolloServer({ schema });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
};
start();
//# sourceMappingURL=index.js.map