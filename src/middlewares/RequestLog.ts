import { Request, Response, NextFunction } from "express";
import { log } from "@utils/c-log";
export default async function RequestLog(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.method !== "POST" && req.method !== "PUT")
    return res.status(405).json({ error: "Method Not Allowed" });
  let p = req.path;
  log("API Request | ", p);
  next();
}
