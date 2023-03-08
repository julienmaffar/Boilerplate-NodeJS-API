import cors from 'cors';
import express from 'express';
import logger from './helpers/logger';
import routes from './routes/routes';
import app from './server';
import db from './Database';
import errorHandler from './errors/error.handler';
import { AppConfig } from './contants';

const bootstrap = async () => {
  app.disable('x-powered-by');

  /**
   * Configure cors
   */
  app.use(cors());

  /**
   * Configure mongoose
   **/
  await db.connect();

  /**
   * Configure body parser
   */
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  /**
   * Host static uploads directory
   */
  app.use('/', express.static(AppConfig.MULTER_FOLDER));

  /**
   * Configure routes
   */
  app.use(AppConfig.API_PATH, routes);

  /**
   * Configure error handler
   */
  errorHandler(app);
};

bootstrap()
  .then(() => {
    logger.info('Server is up');
  })
  .catch((error) => {
    logger.error('Unknown error. ' + error.message);
  });

export default app;
