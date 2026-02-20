import * as mongoose from "mongoose";
import { log, err, yay } from "@src/utils/c-log";
import config from "@conf";

export function connect() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.MONGODB_URI,config.MONGODB_OPTIONS)
      .then((db) => {
        yay("Connected to MongoDB Database");
        resolve(db);
      })
      .catch((e) => {
        err("Failed to Connect to MongoDB Database | ", e);
      });
  });
}
