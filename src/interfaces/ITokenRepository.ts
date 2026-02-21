import { CreateTokenDTO, CreateTokenResponseDTO } from "@src/controllers/dto/TokenDTO";

export default interface ITokenRepository {
    create(body: CreateTokenDTO): Promise<CreateTokenResponseDTO>;
    findById(id: string): Promise<any>;
}