import IUserRepository from "@interface/IUserRepository";
import MongooseTokenRepository from "./MongooseToken";
import {
  CreateUserDTO,
  CreateUserResponseDTO,
} from "@src/controllers/dto/UserDTO";
import { UserModel } from "@src/database/models/User";
import { ValidateCreateUserDTO } from "@src/utils/Validate";
import { UserExists } from "@util/Exists";
import { HashPass } from "@util/Hashing";

const TokenRepository = new MongooseTokenRepository();

export default class MongooseUserRepository implements IUserRepository {
  async create(data: CreateUserDTO): Promise<CreateUserResponseDTO> {
    return new Promise((resolve, reject) => {
      ValidateCreateUserDTO(data).then((res) => {
        if (!res.success) return resolve(res);
        UserExists(data.username, data.email!).then((res) => {
          if (!res.success) return resolve(res);

          //Hash Password & Obtain Salt
          let { hash, salt } = HashPass(data.password);

          const user = new UserModel({
            displayName: data.displayName,
            username: data.username,
            password: hash,
            salt: salt,
            email: {
              address: data.email,
            },
          });
          user
            .save()
            .then((user_bson) => {
              TokenRepository.create({
                id: user_bson.id,
                hashed_password: hash,
              })
                .then((res) => {
                  if (!res.success)
                    return resolve({
                      success: false,
                      error: { type: "TOKEN_CREATION_FAILED" },
                    });

                  resolve({ success: true, token: res.token });
                })
                .catch((err) => {
                  reject(err);
                });
            })
            .catch((err) => {
              reject(err);
            });
        });
      });
    });
  }

  async findByUsername(username: string) {}

  async findByEmail(email: string) {}

  async findById(id: string) {}
}
