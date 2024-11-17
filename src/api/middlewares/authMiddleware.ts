
import {Request, Response,NextFunction} from 'express'
const isTokenValid = require('../services/isTokenValid')

export interface TokenPayload {
    username: string,
    email: string,
}

export const authUser = async (req:Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(400).json("no token! access denied");
    }
  
    const tokenData = authHeader.split(" ");
    const token = tokenData[1]; 
    try {
      const { email,username } =  isTokenValid(token) as TokenPayload;
      console.log({email,username } );
      req.user = {email,username} 
      next();
    } catch (error) {
        res.status(401).json("Token expired");
    }
};