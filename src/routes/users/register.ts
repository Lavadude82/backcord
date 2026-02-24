import express, { response } from "express";
import mongoose from "mongoose";
import {MongooseUser} from "@repo/MongooseUser"

import { err, yay } from "@utils/c-log";
import { AuthErrorType } from "@controllers/dto/ErrorDTO";

export default function (
  app: express.Application,
  database: mongoose.Connection,
) {
  // Handle API User Creation Request
  app.post("/api/v1/user/register", async (req, res) => {
    if(!req.body) return res.status(400).json({type:"EMPTY_BODY"} as AuthErrorType)
    MongooseUser.create(req.body)
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
