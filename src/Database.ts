import mongoose, { ConnectOptions, Mongoose } from 'mongoose';
import logger from './helpers/logger';

class Database {
  private user: string;

  private password: string;

  private host: string;

  private dbName: string;

  private options: ConnectOptions;

  private db: Mongoose;

  constructor(options: ConnectOptions = {}) {
    this.user = process.env.DB_USER || '';
    this.password = process.env.DB_PASSWORD || '';
    this.host = process.env.DB_HOST || 'mongo:27017';
    this.dbName = process.env.DB_NAME || 'database';
    this.options = options;
    this.db = mongoose;
  }

  private getConnectionString() {
    const env = process.env.NODE_ENV;
    if (env === 'test') this.dbName += '_test';
    return `mongodb://${this.host}/${this.dbName}`;
  }

  public async connect(): Promise<void> {
    try {
      logger.debug(`Database connection string: ${this.getConnectionString()}`);
      await this.db.connect(this.getConnectionString(), this.options);
      logger.info('Connected with database host');
    } catch (error) {
      logger.error('Error connecting to database:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.db.disconnect();
      logger.info('Database disconnected');
    } catch (error) {
      logger.error('Error disconnecting from database:', error);
      throw error;
    }
  }
}

const db = new Database();

export default db;
