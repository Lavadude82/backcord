import { AuthErrorType } from "./ErrorDTO";

export type CreateTokenDTO = {
    id:string,
    hashed_password: string;
}

export type CreateTokenResponseDTO = {
    success: boolean;
    error?:AuthErrorType;
    token?: string;
}