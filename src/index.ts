import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { PORT, SESSION_SECRET } from '@config/config';
import createSchema from '@config/create-schema';
import AppDataSource from '@config/data-source';
import redisStore from '@config/redis';
import { ApolloContext, RequestWithSession } from '@custom-types/common';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import 'reflect-metadata';

const main = async () => {
  await AppDataSource.initialize();

  const app: express.Express = express();

  app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:3000', 'https://sandbox.embed.apollographql.com'],
    }),
  );
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(
    session({
      store: redisStore,
      name: 'qid',
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 31, // 1 month
      },
    } as any),
  );

  const apolloServer = new ApolloServer<ApolloContext>({
    schema: await createSchema(),
  });
  await apolloServer.start();

  app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      context: async ({ req }: { req: RequestWithSession }) => ({
        req: req,
      }),
    }),
  );

  app.listen(PORT, () => {
    console.log(`finbot-server is running at PORT: ${PORT}`);
  });
};

main();
