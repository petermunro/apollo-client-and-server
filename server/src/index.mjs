import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

import { logger } from './logger.mjs';
import { ApolloServer } from 'apollo-server-express';

import { apolloServerConfig } from './apollo.mjs';
import { typeDefs } from './typeDefs.mjs';
import { resolvers } from './resolvers.mjs';

import express from 'express';
import httpProxy from 'http-proxy';
import path from 'path';

async function startApolloServer(typeDefs, resolvers) {
  const apolloServer = new ApolloServer(apolloServerConfig);
  await apolloServer.start();
  const app = express();
  apolloServer.applyMiddleware({ app });

  // middleware for the GraphQL
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  const proxy = httpProxy.createProxyServer({});

  // middleware for the reverse proxy for the React
  app.use('/', function app(req, res) {
    proxy.web(
      req,
      res,
      { target: 'http://localhost:3000' },
      function proxyWebErrorHandler(err) {
        logger.error(err.message);
        res.sendFile(path.resolve('./public/index.html'));
      },
    );
  });

  await new Promise((resolve) => app.listen({ port: 5000 }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:5000${apolloServer.graphqlPath}`,
  );
}

startApolloServer(typeDefs, resolvers);
