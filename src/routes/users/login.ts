import express from "express";
import mongoose from "mongoose";
import {MongooseUser} from "@repo/MongooseUser"
import { err, yay } from "@utils/c-log";



export default function (
  app: express.Application,
  database: mongoose.Connection,
) {
  // Handle API User Creation Request
  app.post("/api/v1/user/login", async (req, res) => {
    MongooseUser.login(req.body)
      .then((response) => {
        if (!response.success) {
          err("Failed to Login User | ", response.error?.type);
          return res.status(400).json(response.error);
        }
        yay("User Logged In Successfully | ", req.body.username);
        return res.status(200).json(response);
      })
      .catch((error) => {
        err("Error Logging In User", error);
        return res.status(500).json({ type: "INTERNAL_SERVER_ERROR" });
      });
  });
}
