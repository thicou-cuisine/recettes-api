import express from "express";
import Hello from "./routes/hello"

const app = express();
const port = 8080; // default port to listen

// test routes
app.use("/api/public", Hello)

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
