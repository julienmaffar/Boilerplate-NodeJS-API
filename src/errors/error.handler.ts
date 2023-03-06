import {
  Application,
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import logger from '../helpers/logger';
import { ApplicationError } from './app.errors';

export default function (app: Application) {
  app.use(
    (
      err: ApplicationError,
      _req: ExpressRequest,
      res: ExpressResponse,
      next: NextFunction,
    ) => {
      if (err instanceof ApplicationError) {
        if (err.message) {
          logger.info(err.message);
          return res.status(err.code).send(err.message);
        } else {
          return res.sendStatus(err.code);
        }
      }
      next(err);
    },
  );
}
