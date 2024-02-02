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

app.get("/", (_, res) => {
  res.json({
    visit: "https://ird-task-next.vercel.app/dua's-importance?cat=1",
    message: "Now you can visit the link above to see the frontend of this project.",
    "issue-with-render-free-plan": "https://docs.render.com/free#spinning-down-on-idle",
  });
});

app.use("/api/v1", router);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


export { app };
