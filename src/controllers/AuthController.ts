import express from 'express'
import { Request, Response, NextFunction } from 'express'
import Ajv from 'ajv'

const router = express.Router()

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  // validate against a schema with ajv
  // create user
  // return response with jwt
  return res.status(401).send()
})

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  // validate against a schema with ajv
  // read user
  // return response with jwt
  return res.status(401).send()
})

router.post('/refresh', (req: Request, res: Response, next: NextFunction) => {
  // validate against a schema with ajv
  // refresh user tokens 
  // return response with jwt
  return res.status(401).send()
})


export default router
