import {bind, inject, BindingScope} from '@loopback/core';
import {UsersRepository} from '../repositories/users.repository'
import { repository } from '@loopback/repository';
import {UserService} from '@loopback/authentication'
import {Users} from '../models/users.model'
import{Credentials} from '../types/user.types' 
import { HttpErrors } from '@loopback/rest';
import {HasherBindings} from '../keys'
import {HashPassword} from './hash.password'
import {securityId,UserProfile} from '@loopback/security'
@bind({scope: BindingScope.TRANSIENT})
export class MyUserService implements UserService<Users,Credentials>{
  constructor(
    @repository(UsersRepository)
    protected userRepo: UsersRepository,
    @inject(HasherBindings.hasherService)
    protected hasher: HashPassword
  ) {}
  async verifyCredentials(credentials:Credentials ): Promise<Users> {
    const user=await this.userRepo.findOne({
      where:{
        username:credentials.username
      }
    })
    if(!user){
      throw new HttpErrors.NotFound("user not found")
    }
    const pswdMatch=await this.hasher.comparePswd(credentials.password,user.password);
    if(!pswdMatch){
      throw new HttpErrors.Unauthorized("password did not match")
    }
    return user;

  }
  convertToUserProfile(user: Users): UserProfile{
   return{
     [securityId]:`${user.id}`,
      name:user.username,
      email:user.email,
      roleId:user.rolesId,
      id:user.id
   }
  }

}
