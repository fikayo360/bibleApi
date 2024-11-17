import { Request, Response, NextFunction } from 'express';
import {BadRequestError,ForbidenError,InternalServerError,unAuthorizedError} from '../utilities/error/index'

const ErrorHandler = (err:any,req:Request,res:Response,next:NextFunction) => {
    
    if (err instanceof BadRequestError) {
      res.status(err.statusCode).json({msg:err.message});
    }

    else if (err instanceof ForbidenError) {
        res.status(err.statusCode).json({msg:err.message});
    }

    else if (err instanceof InternalServerError) {
         res.status(err.statusCode).json({msg:err.message});
    }

    else if (err instanceof unAuthorizedError) {
         res.status(err.statusCode).json({msg:err.message});
    }

    else{
         res.status(500).send({msg:"Something went wrong we cant seem to figure it out"});
    }
}

export default ErrorHandler