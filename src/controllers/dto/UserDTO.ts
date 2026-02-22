import { AuthErrorType } from "@dto/ErrorDTO";
import { UserModel, UserSchema } from "@models/User";
import { HydratedDocument, InferSchemaType } from "mongoose";

export type CreateUserDTO = {
  client?: string;
  displayName: string;
  username: string;
  password: string;
  email?: string;
};

export type LoginUserDTO = {
  client?:string;
  username?: string;
  login?: string;
  password: string;
  totp?: string;
};

export type LoginUserResponseDTO = {
  success: boolean;
  error?: AuthErrorType;
  token?: string;
};

export type CreateUserResponseDTO = {
  success: boolean;
  error?: AuthErrorType;
  token?: string;
};

export type GenericUserFindResponseDTO = {
  success: boolean;
  error?: AuthErrorType;
  user?: InferSchemaType<typeof UserSchema>;
};

export type GenericUserSuccessResponseDTO = {
  success: boolean;
  error?: AuthErrorType;
};
