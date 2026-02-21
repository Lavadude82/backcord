import { Schema, model } from "mongoose";

export const Token = new Schema({
    token: {type: String, required: true},
    userId: {type: String, required: true},
    lastUsed: {type: Number, required: true, default: Date.now()},
    createdAt: {type: Number, required: true, default: Date.now()},
    expiry: {type: Number, required: true, default: Date.now() + 1000 * 60 * 60 * 24 * 365} //7 Days
})  

export const TokenModel = model("tokens", Token);
