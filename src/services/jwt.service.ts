import * as jwt from "jsonwebtoken"
import{ UserProfile} from '@loopback/security'
import {promisify} from 'util'
import { HttpErrors } from '@loopback/rest'
import {jwtConfigs} from '../keys'
import { BindingScope, bind } from '@loopback/core'
const signAsync=jwt.sign
const verifyAsync=promisify(jwt.verify)

@bind({scope: BindingScope.TRANSIENT})
export class JWTService{
    async generateToken(userProfile:UserProfile):Promise<string>{
        if(!userProfile){
            throw new HttpErrors.NotFound('user profile not found')
        }
        let token="";
        try{
            token=signAsync(userProfile, jwtConfigs.secretKey, {
                expiresIn: jwtConfigs.expiresIn
            }) as string
        }catch(err){
            throw new HttpErrors.NotFound('error in generatin jwt token')
        }
        return token;
    }
    
    async verifyToken(token:string):Promise<UserProfile>{
        const decryptedUser=await verifyAsync(token,jwtConfigs.secretKey) as UserProfile
        return decryptedUser;
    }   
}