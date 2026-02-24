import { AuthErrorType, ServerErrorType } from "./ErrorDTO";
import { InferSchemaType } from "mongoose";
import { UserSchema } from "@models/User";

export type CreateTokenDTO = {
  name: string,
  id: string,
  hashed_password: string;
}

export type CreateTokenResponseDTO = {
  success: boolean;
  error?: AuthErrorType;
  token?: string;
}
export type GetUserByTokenDTO = {
  token: string;
}
export type GetUserByTokenResponseDTO = {
  success: boolean;
  error?: AuthErrorType;
  user?: InferSchemaType<typeof UserSchema>;
}
