import { CreateDMChannelDTO, CreateDMChannelResponseDTO } from "@controllers/dto/DMChannelDTO";


export default interface IDMChannelRepository {
    create(body: CreateDMChannelDTO): Promise<CreateDMChannelResponseDTO>;
    //findByUserIdByToken(id: string): Promise<any>;
}