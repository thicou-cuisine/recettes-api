import { promisify } from 'util';
import AppConfig from './../config';

const exec = promisify(require('child_process').exec);

const { DATABASE_NAME, DATABASE_PORT, DATABASE_URL, DATABASE_USER } = AppConfig;
const express = require('express');
const router = express.Router();

router.get('/api', (req, res) => {
  res.send('Hello').status(200);
});

router.get('/database', async (req, res) => {
  const healthCheck = await exec(
    `pg_isready -d ${DATABASE_NAME} -h ${DATABASE_URL} -U ${DATABASE_USER} -p ${DATABASE_PORT}`
  );
  console.log(healthCheck);
  if (healthCheck.stderr === '')
    return res.status(200).send('Database is fine');
  return res.status(501).send('Database error - please check logs');
});

export default router;
