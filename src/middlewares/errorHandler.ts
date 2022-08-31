import {Request, Response, NextFunction} from "express";

export default function errorHandler (error:any, req: Request, res: Response, next: NextFunction) {
 
  if (error.response) {
    return res.sendStatus(error.response.status);
  }

  res.sendStatus(500);
}