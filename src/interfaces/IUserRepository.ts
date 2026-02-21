import { CreateUserDTO, CreateUserResponseDTO, GenericUserFindResponseDTO, LoginUserDTO, LoginUserResponseDTO } from "@dto/UserDTO";

export default interface IUserRepository {
    create(body: CreateUserDTO): Promise<CreateUserResponseDTO>;
    login (body: LoginUserDTO): Promise <LoginUserResponseDTO>;
    findByUsername(username: string): Promise<GenericUserFindResponseDTO>;
    findByEmail(email: string): Promise<GenericUserFindResponseDTO>;
    findById(id: string): Promise<GenericUserFindResponseDTO>;
    checkExistence(username: string, email: string): Promise<CreateUserResponseDTO>;
}