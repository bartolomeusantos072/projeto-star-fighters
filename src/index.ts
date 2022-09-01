import express, { json } from "express";
import cors from 'cors';
import "express-async-errors";
import router from "./routers/index"
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";
dotenv.config();

const app = express();
app.use(json(), cors(), router, errorHandler);

const port: number = Number(process.env.PORT) || 4000;

app.listen(process.env.PORT, () => {
    console.log(`Server up and running on port ${port}`)
});