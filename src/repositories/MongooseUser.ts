import IUserRepository from "src/interfaces/IUserRepository";
import MongooseTokenRepository from "./MongooseToken";
import {
  CreateUserDTO,
  CreateUserResponseDTO,
  GenericUserFindResponseDTO,
  LoginUserDTO,
  LoginUserResponseDTO
} from "@dto/UserDTO";
import { UserModel } from "@models/User";
import { ValidateCreateUserDTO } from "@utils/Validate";
import { UserExists } from "@utils/Exists";
import { HashPass } from "@utils/Hashing";

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
  async login(data: LoginUserDTO): Promise <LoginUserResponseDTO> {
    return new Promise((resolve,reject)=>{
      
    })
  }

  async findByUsername(username: string): Promise<GenericUserFindResponseDTO> {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ username: username })
        .then((user) => {
          if (!user)
            return resolve({
              success: false,
              error: { type: "USER_NOT_FOUND" },
            });
          resolve({ success: true, user: user });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async findByEmail(email: string): Promise<GenericUserFindResponseDTO> {
    return new Promise((resolve, reject) => {
      UserModel.findOne({ "email.address": email })
        .then((user) => {
          if (!user)
            return resolve({
              success: false,
              error: { type: "USER_NOT_FOUND" },
            });
          resolve({ success: true, user: user });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async findById(id: string): Promise<GenericUserFindResponseDTO> {
   return new Promise((resolve, reject) => {
      UserModel.findOne({ id: id })
        .then((user) => {
          if (!user)
            return resolve({
              success: false,
              error: { type: "USER_NOT_FOUND" },
            });
          resolve({ success: true, user: user });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
