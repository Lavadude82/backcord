import { Request } from "@node_modules/@types/express";
import error from "@src/maps/errors.map";
import { UserDBS } from "@src/database/models/User";
import { RegistrationBody } from "@examples/type/RegistrationBody";
import ValidateUsername from "@old/helper/Validation/ValidateUsername";
import ValidatePassword from "@old/helper/Validation/ValidatePassword";
import ValidateEmail from "@old/helper/Validation/ValidateEmail";
import { err } from "@src/utils/c-log";


export default function ValidateBody(req: Request): {
  valid: boolean;
  reason?: number[];
  hasEmail?: boolean;
  body?: RegistrationBody;
} {
  if (!req.body) {
    return {
      valid: false,
      reason: error.data.body.missing,
    };
  }
  let body = req.body as RegistrationBody;

  if (!body.username || !body.password || !body.displayName) {
    return {
      valid: false,
      reason: error.data.body.wrongFormat,
    };
  }

  let uValid = ValidateUsername(body.username);
  if (uValid.valid === false) {
    return uValid;
  }

  let pValid = ValidatePassword(body.password);
  if (pValid.valid === false) {
    return pValid;
  }


    if (body.email === "") {
        err("Email Not Provided | Skipping Email Validation");
      return {
        valid: true,
        hasEmail: false,
        body: body,
      };
    }


    let eValid = ValidateEmail(body.email);
    if (eValid.valid === false) {
      return eValid;
    }
    return {
      valid: true,
      hasEmail: true,
      body: body,
    };
}
