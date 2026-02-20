import { AuthErrorType } from "./ErrorDTO";

export type CreateUserDTO = {
    displayName: string;
    username: string;
    password: string;
    email?: string;
}

export type LoginUserDTO = {
    username?: string;
    login?: string;
    password: string;
}

export type CreateUserResponseDTO = {
    success: boolean;
    error?:AuthErrorType;
    token?: string;
}