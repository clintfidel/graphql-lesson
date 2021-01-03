import { MikroORM } from "@mikro-orm/core";
import express from 'express';
import winston from 'winston';
import bodyParser from 'body-parser';
import mikroOrmConfig from './mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  orm.getMigrator().up();

  //initialize express
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get('*', (_, res) => {
    res.send('welcome to 2021');
  });

  const port = process.env.PORT || 5050;

  app.listen(port, () => {
    winston.info('app running on port 4000')
  })
  
};

main();
