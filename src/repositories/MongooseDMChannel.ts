import { CreateDMChannelDTO, CreateDMChannelResponseDTO } from "@controllers/dto/DMChannelDTO";
import {
  CreateTokenDTO,
  CreateTokenResponseDTO,
} from "@controllers/dto/TokenDTO";
import IDMChannelRepository from "@interface/IDMChannelRepository";
import { DMChannelModel } from "@models/DMChannel";
import { MongooseToken } from "./MongooseToken";
import { v4 as UUIDv4 } from "uuid";

class MongooseDMChannelRepository implements IDMChannelRepository {
  create(body: CreateDMChannelDTO): Promise<CreateDMChannelResponseDTO> {
    return new Promise((resolve, reject) => {
      if (!body.token)
        return resolve({ success: false, error: { type: "NO_AUTHORIZATION" } });
      if (!body.users)
        return resolve({ success: false, error: { type: "EMPTY_USERS_LIST" } });
      MongooseToken.findUserByToken(body.token).then(
        ({ success, user: user }) => {
          if (!success)
            return resolve({
              success: false,
              error: { type: "USER_NOT_FOUND" },
            });
          let channel = new DMChannelModel({
            id: UUIDv4(),
            users: body.users,
            ownerId: user?.id,
            createdAt: Date.now(),
          });
          channel.save().then((res) => {
            if (!res)
              return resolve({
                success: false,
                error: { type: "DATABASE_ERROR" },
              });
            resolve({ success: true, dmChannel: res });
          });
        },
      );
    });
  }
}
export const MongooseDMChannel = new MongooseDMChannelRepository();
