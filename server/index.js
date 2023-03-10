import { startApolloServer } from "./app.js";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import "./db.js"; // ecmascript to imports


startApolloServer(typeDefs, resolvers);
