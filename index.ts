import express from "express";
import { log, err, yay, rm } from "@src/utils/c-log";
import apiRoutes from "@src/routes/ActiveRoutes";
import { connect as db_connect } from "@src/database/connect";
import RequestLog from "@src/middlewares/RequestLog";
import config from "@conf";
rm();

db_connect().then((database) => {
  const app = express();

  app.use(RequestLog, express.json(), express.urlencoded({ extended: true }));

  // Load API Routes
  apiRoutes.forEach(async (request) => {
    log("Loading API Route | ", request);
    import(request)
      .then((module) => {
        yay("Added API Route | ", request);
        module.default(app, database);
      })
      .catch((e) => {
        err("Failed to Load API Route |", request, " | ", e);
      });
  });

  app.listen(config.PORT, (err) => {
    if (err) throw new Error("Failed to start API");
    yay("Running | Port: ", config.PORT);
  });
});
