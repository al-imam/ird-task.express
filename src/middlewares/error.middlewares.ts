import { NextFunction, Request, Response } from "express";

/* eslint-disable @typescript-eslint/no-unused-vars */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({ message: "Internal Server Error", code: "server" });
}
