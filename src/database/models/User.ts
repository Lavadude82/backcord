import { Schema, model } from "mongoose";

export const UserSchema = new Schema({
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
export const UserDBS = model("users", UserSchema);