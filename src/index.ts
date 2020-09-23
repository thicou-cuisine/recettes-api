import express from "express";
import helmet from "helmet"
import ServiceLogger from "./utils/service-logger"
import ApiStatus from "./routes/ApiStatus"
import userController from "./controllers/UserController"
import AppConfig from "./config"

const app = express();
const { APP_PORT } = AppConfig; // default port to listen

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

app.listen( APP_PORT, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ APP_PORT }` );
});
