import express from "express";
import mongoose from "mongoose";
import ValidateBody from "@old/helper/Validation/ValidateBody";
import { ValidateUsernameExistence } from "@old/helper/Validation/ValidateUsername";
import { ValidateEmailExistence } from "@old/helper/Validation/ValidateEmail";
import { RegistrationBody } from "@examples/type/RegistrationBody";
import CreateUser from "@old/helper/db/repository/createUser";
import { err, yay } from "@src/utils/c-log";
import e from "express";


export default function (
  app: express.Application,
  database: mongoose.Connection,
) {
  // Handle API User Creation Request
  app.post("/api/v1/user/register", async (req, res) => {
    let validBody = ValidateBody(req);
    if (!validBody.valid) {
      return res.status(400).json(validBody.reason);
    }
    
    validBody.body = validBody.body as RegistrationBody;

    ValidateUsernameExistence(validBody.body!.username).then(
      (usernameExistence) => {
        if (usernameExistence.valid) {
          err(
                "Username in Use |",
                validBody.body!.username,
              );
          return res.status(400).json(usernameExistence.reason);
        }

        if (validBody.hasEmail) {
          ValidateEmailExistence(validBody.body!.email).then(
            (emailExistence) => {
              if (emailExistence.valid) {
                err(
                "Email in Use |",
                validBody.body!.email,
              );
                return res.status(400).json(emailExistence.reason);
              }
            yay("Creating User | Email Provided");
              CreateUser(validBody.body!, res);
            },
          );
        }else{
           yay("Creating User | No Email Provided");
              CreateUser(validBody.body!, res);
        }
      },
    );
  });
}
