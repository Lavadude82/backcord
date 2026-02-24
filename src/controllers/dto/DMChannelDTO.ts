import { AuthErrorType } from "@dto/ErrorDTO";
import { UserModel, UserSchema } from "@models/User";
import { HydratedDocument, InferSchemaType } from "mongoose";

export type CreateDMChannelDTO = {
  token: string;
  users: string[];
}

export type AddUsersDMChannelDTO = {
  token: string;
  channelId: string;
  users: string[];
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
