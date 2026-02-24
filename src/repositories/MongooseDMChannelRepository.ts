import { CreateDMChannelDTO } from "@controllers/dto/DMChannelDTO";
import { CreateTokenDTO, CreateTokenResponseDTO } from "@controllers/dto/TokenDTO";
import IDMChannelRepository from "@interface/IDMChannelRepository";
import { DMChannelModel } from "@models/DMChannel";
import { MongooseToken } from "./MongooseToken";
import {v4 as UUIDv4} from "uuid";


class MongooseDMChannelRepository implements IDMChannelRepository{
    create(body: CreateDMChannelDTO): Promise<CreateTokenResponseDTO> {
        return new Promise((resolve, reject)=>{
             if(!body.token) resolve({success:false,error:{type:"NO_AUTHORIZATION"}})
            MongooseToken.findUserByToken(body.token).then(({success,user:user})=>{
                if(!success) resolve({success:false,error:{type:"USER_NOT_FOUND"}})
                let channel = new DMChannelModel({
                    id:UUIDv4(),
                    users:body.users,
                    ownerId:user?.id,
                    createdAt:Date.now()
                });
            })
            
        })
    }
}
export const MongooseDMChannel = new MongooseDMChannelRepository();