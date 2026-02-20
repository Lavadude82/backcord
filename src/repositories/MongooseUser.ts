import IUserRepository from "@interface/IUserRepository";
import {
  CreateUserDTO,
  CreateUserResponseDTO,
} from "@src/controllers/dto/UserDTO";
import { UserModel } from "@src/database/models/User";
import {
  ValidateCreateUserDTO,
  ValidateLength,
  ValidateRegex,
} from "@src/utils/Validate";
import { UserExists } from "@util/Exists";
import regex from "@util/Regexes";

export default class MongooseUserRepository implements IUserRepository {
  async create(data: CreateUserDTO): Promise<CreateUserResponseDTO> {
    return new Promise((resolve, reject) => {
      ValidateCreateUserDTO(data).then((res) => {
        if (!res.success) return resolve(res);
          UserExists(data.username, data.email ?? "").then((res) => {
            if (!res.success) return resolve(res);
            const user = new UserModel({
              displayName: data.displayName,
              username: data.username,
              password: data.password,
              email: data.email,
            });
            user
              .save()
              .then(() => {
                resolve({ success: true });
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
