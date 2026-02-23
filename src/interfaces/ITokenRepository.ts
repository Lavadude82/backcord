import { CreateTokenDTO, CreateTokenResponseDTO } from "@dto/TokenDTO";

export default interface ITokenRepository {
    create(body: CreateTokenDTO): Promise<CreateTokenResponseDTO>;
    findByUserIdByToken(id: string): Promise<any>;
}