import tryCatch from "../../utilities/tryCatch"
import {loginSchema,signUpSchema} from "../auth/validations/index" 
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestError,ForbidenError,InternalServerError,unAuthorizedError } from "../../utilities/error/index";
import authServices from "./authServices";

const auth = authServices
class authController{
    signUp = tryCatch(async(req:Request,res:Response) => {
        console.log('hi');
        const userId = uuidv4()
        const validationResult = signUpSchema.validate(req.body)

        if (validationResult.error) {
            throw new BadRequestError(validationResult.error.details[0].message)
        }

        const {email,username,password} = validationResult.value;

        const isExisting = await auth.userExists(email,username)
        if(isExisting){
            throw new BadRequestError('User already exists')
        } 
        const hashPassword = auth.hashPassword(password,10)
        const user = {id:userId,email,username,password:hashPassword}
        const tokens = await auth.createUser(user)
        let accesstoken = tokens
        return res.status(201).json({msg:'user created successfully',accesstoken})
    })

    login = tryCatch(async(req:Request,res:Response) => {
        const validationResult = signUpSchema.validate(req.body)

        if (validationResult.error) {
            throw new BadRequestError(validationResult.error.details[0].message)
        }

        const {username,password} = validationResult.value;

        const foundUser = await auth.findUsername(username)

        if(!foundUser){
            throw new BadRequestError('that user does not exist')
        }

        const currentPassword = foundUser.password as unknown as string
        if(!auth.comparePasswords(password,currentPassword)){
            throw new BadRequestError('wrong password')
        }
        const { password:foundUserPassword, ...others } = foundUser;
        const userRest = others
        const token = auth.getTokens(userRest.username,userRest.email)
        return res.status(200).json(token)
    })
}



export default new authController()