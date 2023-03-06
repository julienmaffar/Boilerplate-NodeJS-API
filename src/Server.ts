import cors from 'cors';
import express, { Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import routes from './routes/routes';
import * as dotenv from 'dotenv';
dotenv.config();
import logger from './helpers/logger';

export default class Server {
  public app: Application;

  private port: number | string;

  private user: string;

  private password: string;

  private host: string;

  private dbName: string;

  private options: ConnectOptions;

  constructor() {
    this.port = process.env.PORT || 3000;
    this.user = process.env.DB_USER || '';
    this.password = process.env.DB_PASSWORD || '';
    this.host = process.env.DB_HOST || 'localhost:27017';
    this.dbName = process.env.DB_NAME || 'database';
    this.options = {
      connectTimeoutMS: 10 * 60 * 1000,
    };
    this.app = express();
    this.config();
    this.routes();
    this.connectToDatabase();
  }

  /**
   * Configuration of server
   */
  private config(): void {
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  /**
   * Apply routes to server
   */
  private routes(): void {
    this.app.use('/api', routes);
  }

  /**
   * Connect to mongoose
   */
  private connectToDatabase(): void {
    mongoose
      .connect(this.getConnectionString(), this.options)
      .then(() => logger.info('Connect to database'))
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Get connection string for mongoose database
   * @returns string
   */
  private getConnectionString() {
    return `mongodb://${this.host}/${this.dbName}`;
  }

  /**
   * Start server
   */
  public start(): void {
    this.app.listen(this.port, () => {
      logger.info(`Server is starting on port ${this.port}...`);
    });
  }
}
