import express from 'express'
import { Request, Response, NextFunction } from 'express'

const router = express.Router()

router.post('/register', (req: Request, res: Response, next : NextFunction) => {
  // validate against a schema
  // register user
  // return response with jwt
  return res.status(401).send()
})

export default router
