import ITokenRepository from "@interface/ITokenRepository";
import { randomBytes } from "crypto";
import { CreateTokenDTO, CreateTokenResponseDTO } from "@dto/TokenDTO";
import { TokenModel } from "@src/database/models/Token";
import { HashPass } from "@util/Hashing";
import regex from "@util/Regexes";

export default class MongooseTokenRepository implements ITokenRepository {
  async create(data: CreateTokenDTO): Promise<CreateTokenResponseDTO> {
    return new Promise((resolve, reject) => {
      let pretoken = randomBytes(64).toString("hex");

      let token = new TokenModel({
        token: HashPass(
          pretoken.slice(0, 32) + data.hashed_password + pretoken.slice(32),
        ).hash,
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

  async findById(id: string) {}
}
