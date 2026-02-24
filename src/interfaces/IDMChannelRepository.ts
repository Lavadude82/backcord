import { CreateDMChannelDTO } from "@controllers/dto/DMChannelDTO";
import { CreateTokenDTO, CreateTokenResponseDTO } from "@dto/TokenDTO";

export default interface IDMChannelRepository {
    create(body: CreateDMChannelDTO): Promise<CreateTokenResponseDTO>;
    //findByUserIdByToken(id: string): Promise<any>;
}