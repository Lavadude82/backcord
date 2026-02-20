import { err, yay, log } from "@src/utils/c-log";
import error from "@src/maps/errors.map";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*_\-+=?]).{8,}$/;

export default function ValidatePassword(password: string): {
  valid: boolean;
  reason?: number[];
} {
  if (password.length < 8) {
    err("Invalid Password | Must be 8 or more characters");
    return {
      valid: false,
      reason: error.auth.register.password.invalid.length,
    };
  }
  if (!passwordRegex.test(password)) {
    err("Invalid Password | Must Follow ", passwordRegex.toString());
    return {
      valid: false,
      reason: error.auth.register.password.invalid.characters,
    };
  }
  return { valid: true };
}
