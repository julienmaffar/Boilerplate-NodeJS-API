import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import logger from './helpers/logger';

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Running Node.js version ${process.version}`);
  logger.info(`App environment: ${process.env.NODE_ENV}`);
  logger.info(`App is running on port ${PORT}`);
});

export default app;
