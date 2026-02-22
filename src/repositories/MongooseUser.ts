import IUserRepository from "src/interfaces/IUserRepository";
import MongooseTokenRepository from "./MongooseToken";
import {
  CreateUserDTO,
  CreateUserResponseDTO,
  GenericUserFindResponseDTO,
  LoginUserDTO,
  LoginUserResponseDTO,
} from "@dto/UserDTO";
import { UserModel } from "@models/User";
import { ValidateCreateUserDTO } from "@utils/Validate";
import { HashPass, HashPassSalt } from "@utils/Hashing";

const TokenRepository = new MongooseTokenRepository();

export default class MongooseUserRepository implements IUserRepository {
  async create(data: CreateUserDTO): Promise<CreateUserResponseDTO> {
    return new Promise((resolve, reject) => {
      ValidateCreateUserDTO(data).then((res) => {
        if (!res.success) return resolve(res);
        this.checkExistence(data.username, data.email!).then((res) => {
          if (!res.success)
            return resolve({
              success: false,
              error: { type: res.error!.type },
            }); //Should never Happen

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
                name: data.client || "Creation Client",
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
  async login(data: LoginUserDTO): Promise<LoginUserResponseDTO> {
    return new Promise((resolve, reject) => {
      if (!data.username && !data.login)
        return resolve({
          success: false,
          error: { type: "NO_CREDENTIALS_PROVIDED" },
        });
      if (data.username) {
        this.findByUsername(data.username).then((res) => {
          if (!res.success)
            return resolve({ success: false, error: res.error });
          const user = res.user!;
          const { hash } = HashPassSalt(data.password, user.salt);
          if (hash !== user.password)
            return resolve({
              success: false,
              error: { type: "INVALID_LOGIN_CREDENTIALS" },
            });
          TokenRepository.create({
            name: data.client || "Unknown Device",
            id: user.id,
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
        });
      }else if (data.login) {
        this.findByEmail(data.login).then((res) => {
          if (!res.success)
            return resolve({ success: false, error: res.error });
          const user = res.user!;
          const { hash } = HashPassSalt(data.password, user.salt);
          if (hash !== user.password)
            return resolve({
              success: false,
              error: { type: "INVALID_LOGIN_CREDENTIALS" },
            });
          TokenRepository.create({
            name: data.client || "Unknown Device",
            id: user.id,
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
        });
      }else{
        return resolve({
          success: false,
          error: { type: "NO_CREDENTIALS_PROVIDED" },
        });
      }
    });
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

  async checkExistence(
    username: string,
    email: string,
  ): Promise<CreateUserResponseDTO> {
    return new Promise((resolve, reject) => {
      this.findByUsername(username).then((res) => {
        if (res.success)
          return resolve({
            success: false,
            error: { type: "USERNAME_IN_USE" },
          }); //Should never Happen
        this.findByEmail(email).then((res) => {
          if (res.success)
            return resolve({ success: false, error: { type: "EMAIL_IN_USE" } }); //Should never Happen
          resolve({ success: true });
        });
      });
    });
  }
}
