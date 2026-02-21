import { Schema, model } from "mongoose";
import {v4 as UUIDv4} from "uuid";

export const UserSchema = new Schema({
    id: {type: String, required: true, default:UUIDv4()},
    displayName: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    salt: {type: String, required: true},
    email: {
        address: {type: String, required: false},
        verified: {type: Boolean, required: false, default: false}
    },
    createdAt: {type: Number, required: true, default: Date.now()},
    bot: {type: Boolean, required: true, default: false}
})  
export const UserModel = model("users", UserSchema);