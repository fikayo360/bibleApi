import { User } from "../../../config/db/schema";

class UserDb{
    findUsername(username:string){
        return User.findOne({where:{username:username}})
    }

    findEmail(email:string){
        return User.findOne({where:{email:email}})
    }

    createUser(payload:{username:string,email:string,password:string}){
        const {username,email,password} = payload
        return User.create({
            username,email,password
          });
    }
    
    updateResetToken(reset:string,userId:string){
        return User.update({
            resettoken: reset
          }, {
            where: {
                id: userId
            }
          });
    }

    changePassword(newPassword:string,id:string){
        return User.update({
            resettoken: null,
            password:newPassword
          }, {
            where: {
              id:id
            }
          });
    }

    findId(userId:string){
        return User.findOne({where:{id:userId}})
    }

    updateRefreshTokenHash(id:string,hash:string){
        return User.update({
            hashedRt:hash
        },{
            where:{
                id:id
            }
        })
    }

    updateRefreshTokenToNull(userId:string){
        return User.update({
            hashedRt:null
        },{
            where:{
                id:userId
            }
        })
    }
}

export default new UserDb()