import { err, yay, log } from "@src/utils/c-log";
import error from "@src/maps/errors.map";
import { UserDBS } from "@src/database/models/User";

const usernameRegex = /^[a-z0-9_]+$/;

export default function ValidateUsername(username: string): {
  valid: boolean;
  reason?: number[];
} {
  if (username.length < 2 || username.length > 32) {
    err(
      "Invalid Username | ",
      username,
      " | Must be between 2 and 32 characters",
    );
    return {
      valid: false,
      reason: error.auth.register.username.invalid.length,
    };
  }
  if (!usernameRegex.test(username)) {
    err(
      "Invalid Username | ",
      username,
      " | Must only contain letters, numbers, and underscores",
    );
    return {
      valid: false,
      reason: error.auth.register.username.invalid.characters,
    };
  }
  return { valid: true };
}

export async function ValidateUsernameExistence(username: string): Promise<{
  valid: boolean;
  reason?: number[];
}> {
  return new Promise((resolve, reject) => {
    UserDBS.findOne({ username: username }).then((existingUser) => {
      if (existingUser) {
        resolve({
          valid: true,
          reason: error.auth.register.username.taken,
        });
      } else {
        resolve({ valid: false });
      }
    });
  });
}
