import { err, yay, log } from "@src/utils/c-log";
import error from "@src/maps/errors.map";
import { UserDBS } from "@src/database/models/User";

const emailRegex = /^[^\s@]+@[^\s@]+$/;

export default function ValidateEmail(email: string): {
  valid: boolean;
  reason?: number[];
} {
  if (!emailRegex.test(email)) {
    err("Invalid Email | Must contain an @ symbol and a domain");
    return {
      valid: false,
      reason: error.auth.register.email.invalid.format,
    };
  }
  return { valid: true };
}

export async function ValidateEmailExistence(email: string): Promise<{
  valid: boolean;
  reason?: number[];
}> {
  return new Promise((resolve, reject) => {
    UserDBS.findOne({ email:{address:email} }).then((existingUser) => {
      if (existingUser) {
        resolve({
          valid: true,
          reason: error.auth.register.email.taken,
        });
      } else {
        resolve({ valid: false });
      }
    });
  });
}
