import { Schema, model } from "mongoose";
export const DirectMessageChannel = new Schema({
  name: { type: String, required: true, default:"New DM" },
  id: {type: String, required:true},
  users: {type:[String], required:true},
  ownerId: { type: String, required: true },
  createdAt: { type: Number, required: true, default: Date.now() },
});

export const DMChannelModel = model("DMChannels", DirectMessageChannel);
