import { Schema, model } from "mongoose";

export const Token = new Schema({
    token: {type: String, required: true},
    userId: {type: String, required: true},
    createdAt: {type: Number, required: true, default: Date.now()},
})  

export const TokenDBS = model("tokens", Token);
