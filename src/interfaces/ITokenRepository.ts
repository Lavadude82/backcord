import { CreateTokenDTO, CreateTokenResponseDTO } from "@dto/TokenDTO";

export default interface ITokenRepository {
    create(body: CreateTokenDTO): Promise<CreateTokenResponseDTO>;
    findById(id: string): Promise<any>;
}