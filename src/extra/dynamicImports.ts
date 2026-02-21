// This will only be used after building
import { readFileSync, writeFileSync } from "fs";
writeFileSync(

    "./src/routes/ActiveRoutes.js", readFileSync("./src/routes/ActiveRoutes.js", "utf8")
        .split("@routes/")
        .join("./src/routes/"))