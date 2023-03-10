import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";

export async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    
app.get('/', (req, res) => res.send("Welcome to my GraphQL"))


  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000/`);
}
