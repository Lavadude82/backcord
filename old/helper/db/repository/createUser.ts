import { UserDBS } from "@src/database/models/User";
import { RegistrationBody } from "@examples/type/RegistrationBody";
import { sha256 } from "@helper/encrypt/sha256";
import { Response } from "@node_modules/@types/express";
import { err, yay } from "@src/utils/c-log";
import { randomBytes } from "crypto";

export default function CreateUser(body: RegistrationBody, res: Response) {
  let password = sha256(body!.password);
  let pre_token = sha256(randomBytes(64).toString("hex"), false).hash;
  let token = pre_token.slice(0, 32) + password.hash + pre_token.slice(32, 64);
  const createdUser = new UserDBS({
    displayName: body?.displayName,
    username: body?.username,
    password: password.hash,
    salt: password.salt,
    email: {
      address: body?.email || "",
      verified: false,
    },
    timestamp: Date.now(),
  });

  createdUser
    .save()
    .then(() => {
      yay("Created User | ", body?.username);
      res.status(200).json({ status: "success" });
    })
    .catch((e: string) => {
      err("Failed to Create User | ", e);
      return res.status(500).json({
        code: 10000,
        reason: {
          code: 2,
          message: "Failed to Create Account! (Database Error)",
        },
      });
    });
}
