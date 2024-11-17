import { Request, Response, NextFunction } from 'express';
import {BadRequestError,ForbidenError,InternalServerError,unAuthorizedError} from '../utilities/error/index'

const ErrorHandler = (err:any,req:Request,res:Response,next:NextFunction) => {
    
    if (err instanceof BadRequestError) {
      return res.status(err.statusCode).json({msg:err.message});
    }

    else if (err instanceof ForbidenError) {
        return res.status(err.statusCode).json({msg:err.message});
    }

    else if (err instanceof InternalServerError) {
        return res.status(err.statusCode).json({msg:err.message});
    }

    else if (err instanceof unAuthorizedError) {
        return res.status(err.statusCode).json({msg:err.message});
    }

    else{
        return res.status(500).send({msg:"Something went wrong we cant seem to figure it out"});
    }
}

export default ErrorHandler