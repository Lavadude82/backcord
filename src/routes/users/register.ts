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
    UserRepository.create(req.body)
      .then((response) => {
        if (!response.success) {
          err("Failed to Create User | ", response.error?.type);
          return res.status(400).json(response.error);
        }
        yay("User Created Successfully | ", req.body.username);
        return res.status(201).json(response);
      })
      .catch((error) => {
        err("Error Creating User", error);
        return res.status(500).json({ type: "INTERNAL_SERVER_ERROR" });
      });
  });
}
