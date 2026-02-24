import { Schema, model } from "mongoose";
import {v4 as UUIDv4} from "uuid";
export const Token = new Schema({
  name: { type: String, required: true, default:"Unknown Device" },
  id: {type: String, required:true},
  token: { type: String, required: true },
  userId: { type: String, required: true },
  lastUsed: { type: Number, required: true, default: Date.now() },
  createdAt: { type: Number, required: true, default: Date.now() },
  expiry: {
    type: Number,
    required: true,
    default: Date.now() + 1000 * 60 * 60 * 24 * 365,
  }, //7 Days
});

export const TokenModel = model("tokens", Token);
