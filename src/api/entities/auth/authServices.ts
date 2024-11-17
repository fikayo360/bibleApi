import * as bcrypt from 'bcryptjs'
import jwt, {  Secret } from 'jsonwebtoken';
import { response,Response} from 'express';
import UserDb from '../auth/authDB'


export interface TokenPayload {
username: string,
email: string,
}

export type Tokens = {
access_token: string,
refresh_token: string,
}

export type jwtPayload = {
username: string,
email: string,
}

const auth = UserDb

class authService {
    async userExists(username:string,email:string){
        const userExists = await auth.findUsername(username)
        const emailExists = await auth.findEmail(email)
        if(userExists && emailExists){
            return true
        }
        return false
    }

    hashPassword(password:string,salt:number){
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword
    }

    async createUser(payload:{username:string,email:string,password:string}){
        auth.createUser(payload)
        return this.getTokens(payload.email,payload.username)
    }

     getTokens(username: string, email: string):Secret{
        const jwtPayload: jwtPayload = {
          username,
          email
        };
        const at = jwt.sign(jwtPayload,process.env.JWT_SECRET as Secret,{
            expiresIn:process.env.JWT_LIFETIME
        })
        return at
      }

      async findUsername(username: string):Promise<any>{
        return auth.findUsername(username) 
     }

     async findEmail(email: string):Promise<any>{
        return auth.findEmail(email) 
     }

     comparePasswords(current:string,old:string){
        return bcrypt.compareSync(current,old)
     }

     compareRt(current:string,old:string){
        return current === old
     }

     async updateToken(reset:string,userId:string){
         return auth.updateResetToken(reset,userId)
     }

     async changePassword(newPassword:string,id:string){
          return auth.changePassword(newPassword,id)
     }

     async findId(id:string){
        return auth.findId(id)
     }
}

export default new authService()