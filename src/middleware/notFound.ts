import { Request, Response, NextFunction } from "express";

interface ResponseError extends Error {
  status?: number;
}

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not found") as ResponseError;
  error.status = 404;
  return next(error);
};

export default notFound;
