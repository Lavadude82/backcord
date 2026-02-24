import ITokenRepository from "src/interfaces/ITokenRepository";
import { randomBytes } from "crypto";
import { CreateTokenDTO, CreateTokenResponseDTO } from "@dto/TokenDTO";
import { TokenModel } from "@models/Token";
import { HashPass } from "@utils/Hashing";
import {v4 as UUIDv4} from "uuid";

export default class MongooseTokenRepository implements ITokenRepository {
  async create(data: CreateTokenDTO): Promise<CreateTokenResponseDTO> {
    return new Promise((resolve, reject) => {
      let pretoken = randomBytes(64).toString("hex");

      let token = new TokenModel({
        token: HashPass(
          pretoken.slice(0, 32) + data.hashed_password + pretoken.slice(32),
        ).hash,
        id: UUIDv4(),
        userId: data.id,
      });
      token
        .save()
        .then((token_bson) => {
          resolve({ success: true, token: token_bson.token });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async findByUserIdByToken(id: string) {}
}
