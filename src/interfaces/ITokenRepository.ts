
import { CreateTokenDTO, CreateTokenResponseDTO, GetUserByTokenDTO,GetUserByTokenResponseDTO } from "@dto/TokenDTO";

export default interface ITokenRepository {
    create(body: CreateTokenDTO): Promise<CreateTokenResponseDTO>;
    findUserByToken(token: string): Promise<GetUserByTokenResponseDTO>;
}