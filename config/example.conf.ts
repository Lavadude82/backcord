import { DefaultConfiguration } from "@conf/type";

export default {
    //Log Level
    LOG:"DEBUG",

    //PORT
    //Default Testing: 6548
    PORT:6548,

    //MongoDB Connection URI
    // Ex. mongodb://username:password@ip_address:port
    // Ex. mongodb://ip_address:port
    // Default Port: 27017
    MONGODB_URI:"",

    MONGODB_OPTIONS:{}

} as DefaultConfiguration