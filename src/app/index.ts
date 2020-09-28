import express from "express";
import helmet from "helmet"
import ServiceLogger from "./../utils/service-logger"
import ApiStatus from "./../routes/ApiStatus"
import userController from "./../controllers/UserController"

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
app.use("/user", userController)

export default app
