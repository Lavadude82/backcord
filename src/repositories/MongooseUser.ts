import IUserRepository from "@interface/IUserRepository";
import {
  CreateUserDTO,
  CreateUserResponseDTO,
} from "@src/controllers/dto/UserDTO";
import {
  ValidateCreateUserDTO,
  ValidateLength,
  ValidateRegex,
} from "@src/utils/Validate";
import regex from "@util/Regexes";

export default class MongooseUserRepository implements IUserRepository {
  async create(data: CreateUserDTO): Promise<CreateUserResponseDTO> {
    return new Promise((resolve, reject) => {
      ValidateCreateUserDTO(data).then((res) => {
        if (!res.success) return resolve(res);
        
      });
    });
  }

  async findByUsername(username: string) {}

  async findByEmail(email: string) {}

  async findById(id: string) {}
}
