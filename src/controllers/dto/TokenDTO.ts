import { AuthErrorType } from "./ErrorDTO";

export type CreateTokenDTO = {
    name: string ,
    id:string,
    hashed_password: string;
}

export type CreateTokenResponseDTO = {
    success: boolean;
    error?:AuthErrorType;
    token?: string;
}