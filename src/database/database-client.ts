import config from './../config';
import { Sequelize } from 'sequelize';
import pino from 'pino';

const logger = pino({ prettyPrint: { colorize: true } });

const DatabaseClient = new Sequelize(config.DATABASE_URL, {
  logging: (msg) => {
    const isProd = process.env.NODE_ENV === 'production';
    const isTest = process.env.NODE_ENV === 'test';
    const isDebug = process.env.APP_DEBUG === 'true';
    if (isTest) return false;
    if (isProd) return false;
    if (isDebug) {
      return logger.debug(msg);
    }
    return logger.info(msg);
  },
});

export default DatabaseClient;
