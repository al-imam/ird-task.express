import { NextFunction, Request, Response } from "express";

/* eslint-disable @typescript-eslint/no-unused-vars */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error!"
        : err.stack,
  });
}
