import login from "@src/routes/users/login";

export type UserRegistrationDTO = {
    displayName: string;
    username: string;
    password: string;
    email: {
        address?: string;
        verified: boolean;
    }
}

export type GenericLoginField = {
    username?: string;
    login?: string;
    password: string;
}
