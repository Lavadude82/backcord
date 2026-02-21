import mongoose from "mongoose";

export type DefaultConfiguration = {
LOG: "DEBUG" | "NOPE";
PORT: number;
MONGODB_URI: string;
MONGODB_OPTIONS:mongoose.ConnectOptions
}