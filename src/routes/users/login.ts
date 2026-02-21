import express from "express";
import mongoose from "mongoose";
import MongooseUserRepository from "@repo/MongooseUser";

import { err, yay } from "@utils/c-log";

const UserRepository = new MongooseUserRepository();

export default function (
  app: express.Application,
  database: mongoose.Connection,
) {
  // Handle API User Creation Request
  app.post("/api/v1/user/register", async (req, res) => {
    UserRepository
  });
}
