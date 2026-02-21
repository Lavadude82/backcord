import { connect as db_connect } from "@src/database/connect";
import mongoose from "mongoose";
import { err, log, yay } from "@util/c-log";

db_connect()
  .then(async (database) => {
    log("Dropping Database...");
    await mongoose.connection.dropDatabase();
    yay("Database Dropped Successfully");
    mongoose.connection.close();
  })
  .catch((e) => {
    err("Failed to Drop Database | ", e);
  });
