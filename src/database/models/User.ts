import { Schema, model } from "mongoose";

export const UserSchema = new Schema({
  id: { type: String, required: true },
  displayName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  email: {
    address: { type: String, required: false },
    verified: { type: Boolean, required: false, default: false },
  },
  createdAt: { type: Number, required: true, default: Date.now() },
  bot: { type: Boolean, required: true, default: false },
});
UserSchema.toJSONSchema();
export const UserModel = model("Users", UserSchema);
