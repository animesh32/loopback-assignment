import {genSalt,hash,compare} from 'bcryptjs'
import { inject, bind, BindingScope } from '@loopback/core';

interface PasswordHasher<T=string>{
    hashPswd(password:T):Promise<T>,
    comparePswd(storedPswd:T,originalPswd:T):Promise<boolean>
}

@bind({scope: BindingScope.TRANSIENT})
export class HashPassword implements PasswordHasher{
    @inject('rounds')
    public readonly rounds:number
    
    async hashPswd(password:string){
        const salt= await genSalt(this.rounds);
        return  hash(password,salt)
    }

    async comparePswd(
        originalPswd:string,
        storedPswd:string)
    {
        return  compare(originalPswd,storedPswd);
    }
}