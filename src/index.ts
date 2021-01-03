import { MikroORM } from "@mikro-orm/core";
import express from 'express';
import winston from 'winston';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import mikroOrmConfig from './mikro-orm.config';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  orm.getMigrator().up();

  //initialize express
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false
    }),
    context: () => ({ em: orm.em })
  });

  apolloServer.applyMiddleware({ app });

  const port = process.env.PORT || 5050;
  app.listen(port, () => {
    winston.info('app running on port 5050')
  })
  
};

main();
