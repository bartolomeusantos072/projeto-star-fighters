import { Request, Response } from "express";
import * as serviceBattle from "../services/serviceBattle.js";

export async function ranking( req:Request, res: Response){
    const result= await serviceBattle.find();
    res.send(result);
}

export async function battle( req:Request, res:Response){

    const { userOne, userTwo } : {userOne: string, userTwo: string} = req.body;

  if (!userOne || !userTwo) {
    return res.sendStatus(422);
  }

  const result = await serviceBattle.battle(userOne, userTwo);
  res.send(result);
}