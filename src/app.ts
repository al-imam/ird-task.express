import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import * as middlewares from "$middlewares";
import { router } from "$routes";

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


export { app };
