import { AuthErrorType } from "@src/controllers/dto/ErrorDTO";
import {
  CreateUserResponseDTO,
  CreateUserDTO,
} from "@src/controllers/dto/UserDTO";
import regex from "@util/Regexes";

export async function ValidateLength(
  max: number,
  min: number,
  value: string,
): Promise<boolean> {
  return new Promise((resolve) => {
    if (value.length > max || value.length < min) {
      resolve(false);
    }
    resolve(true);
  });
}

export async function ValidateRegex(
  regex: RegExp,
  value: string,
): Promise<boolean> {
  return regex.test(value);
}

export async function ValidateRegexEmpty(
  regex: RegExp,
  value: string,
): Promise<{ success: boolean; issue?: string }> {
  if (value.length === 0) return { success: false, issue: "EMPTY_STRING" };
  let r = regex.test(value);
  return { success: r };
}

export async function ValidateCreateUserDTO(
  data: CreateUserDTO,
): Promise<CreateUserResponseDTO> {
  return new Promise((resolve) => {
    ValidateLength(32, 0, data.username).then((res) => {
      if (!res)
        return resolve({
          success: false,
          error: { type: "USERNAME_INVALID_LENGTH" },
        });
      ValidateRegex(regex.UsernameCharacterRegex, data.username).then((res) => {
        if (!res)
          return resolve({
            success: false,
            error: { type: "USERNAME_CONTAINS_INVALID_CHARACTERS" },
          });

        ValidateLength(Infinity, 8, data.password).then((res) => {
          if (!res)
            return resolve({
              success: false,
              error: { type: "PASSWORD_TOO_SHORT" },
            });
          ValidateRegex(regex.PasswordRequirementRegex, data.password).then(
            (res) => {
              if (!res)
                return resolve({
                  success: false,
                  error: { type: "PASSWORD_REQUIREMENTS_NOT_MET" },
                });
              ValidateRegex(regex.EmailValidRegex, data.email ?? "").then(
                (res) => {
                  if (!res && data.email)
                    return resolve({
                      success: false,
                      error: { type: "EMAIL_INVALID" },
                    });

                  resolve({
                    success: true,
                  });
                },
              );
            },
          );
        });
      });
    });
  });
}
