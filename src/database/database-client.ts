import config from './../config';
import { Sequelize } from 'sequelize';
import pino from 'pino';

const logger = pino({ prettyPrint: { colorize: true } });
const URL = process.env.NODE_ENV === 'test' ? config.DATABASE_TEST_URL : config.DATABASE_URL
// console.log(`connecting DB to ${URL}`)
const DatabaseClient = new Sequelize(URL, {
  logging: (msg) => {
    const isProd = process.env.NODE_ENV === 'production';
    const isTest = process.env.NODE_ENV === 'test';
    const isDebug = process.env.APP_DEBUG === 'true';
    if (isDebug) {
      return logger.info(msg);
    }
    if (isTest) return false;
    if (isProd) return false;
    return logger.info(msg);
  },
});

export default DatabaseClient;
