import express from "express";
import helmet from "helmet"
import ServiceLogger from "./../utils/service-logger"
import ApiStatus from "./../routes/ApiStatus"
import userController from "./../controllers/UserController"
import AuthController from "./../controllers/AuthController"
import { NextFunction, Response, Request, Errback } from 'express'

const app = express();

// Logger declaration
app.use(ServiceLogger)

// Format support
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Security enhancements
app.use(helmet())
app.disable('x-powered-by')

// status routes
app.use("/status", ApiStatus)

// Controllers
app.use("/users", userController)
app.use("/auth", AuthController)

// Uncaught errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  req.log.error(err)
  res.status(500).send('Oops')
})

export default app
