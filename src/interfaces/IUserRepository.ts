import { CreateUserDTO, CreateUserResponseDTO } from "@src/controllers/dto/UserDTO";

export default interface IUserRepository {
    create(body: CreateUserDTO): Promise<CreateUserResponseDTO>;
    findByUsername(username: string): Promise<any>;
    findByEmail(email: string): Promise<any>;
    findById(id: string): Promise<any>;
}