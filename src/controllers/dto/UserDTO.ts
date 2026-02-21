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
    totp?:string;
}

export type LoginUserResponseDTO = {
    success: boolean;
    error?:AuthErrorType;
    token?: string;
}

export type CreateUserResponseDTO = {
    success: boolean;
    error?:AuthErrorType;
    token?: string;
}

export type GenericUserSuccessResponse = {
    success: boolean;
    error?:AuthErrorType;
}