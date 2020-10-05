import { promisify } from 'util';
import AppConfig from './../config';
import express from 'express'

const exec = promisify(require('child_process').exec);

const { DATABASE_TEST_NAME, DATABASE_PORT, DATABASE_ADDRESS, DATABASE_USER } = AppConfig;
const router = express.Router();

router.get('/api', (req: any, res: any) => {
  res.send('Hello').status(200);
});

router.get('/database', async (req: any, res: any) => {
  const { stderr } = await exec(
    `pg_isready -d ${DATABASE_TEST_NAME } -h ${DATABASE_ADDRESS} -U ${DATABASE_USER} -p ${DATABASE_PORT}`
  );
  if (!stderr) return res.status(200).send('Database is fine');
  return res.status(501).send('Database error - please check logs');
});

export default router;
