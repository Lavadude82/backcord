import { CreateUserDTO, CreateUserResponseDTO, GenericUserSuccessResponse, LoginUserDTO, LoginUserResponseDTO } from "@dto/UserDTO";

export default interface IUserRepository {
    create(body: CreateUserDTO): Promise<CreateUserResponseDTO>;
    login (body: LoginUserDTO): Promise <LoginUserResponseDTO>;
    findByUsername(username: string): Promise<GenericUserSuccessResponse>;
    findByEmail(email: string): Promise<GenericUserSuccessResponse>;
    findById(id: string): Promise<GenericUserSuccessResponse>;
}