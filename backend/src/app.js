import "dotenv/config";
import * as Sentry from "@sentry/node";
import express from "express";
import Youch from "youch";
import path from "path";
import cors from "cors";
import routes from "./routes";
import "./database";
import sentryConfig from "./config/sentry";

import "express-async-errors";

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "tmp", "upload"))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const erros = await new Youch(err, req).toJSON();

      console.log(erros);
    });
  }
}

export default new App().server;
