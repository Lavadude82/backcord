import { UserModel } from "@models/User";
import { CreateUserResponseDTO } from "@dto/UserDTO";
import MongooseUserRepository from "@repo/MongooseUser";



export async function UsernameExists(
  username: string,
): Promise<CreateUserResponseDTO> {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ username })
      .exec()
      .then((user) => {
        if (user)
          return resolve({
            success: false,
            error: { type: "USERNAME_IN_USE" },
          });
        resolve({ success: true });
      });
  });
}

export async function EmailExists(
  email: string,
): Promise<CreateUserResponseDTO> {
  return new Promise((resolve, reject) => {
    if (email === "undefined") return resolve({ success: true });
    UserModel.findOne({ "email.address": email })
      .exec()
      .then((user) => {
        if (user)
          return resolve({
            success: false,
            error: { type: "EMAIL_IN_USE" },
          });
        resolve({ success: true });
      });
  });
}

