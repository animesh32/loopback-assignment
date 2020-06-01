import {bind,BindingScope} from '@loopback/core';
import {validate} from 'isemail'
import { HttpErrors } from '@loopback/rest';
type Credentials ={
  email:string,
  password:string
}

@bind({scope: BindingScope.TRANSIENT})
export class ValidatorService {
  constructor(/* Add @inject to inject parameters */) {}

  isValidPswd(password:string):boolean{
    if(password.length<8){
      return false;
    }
    const count=[0,0,0,0];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i=0;i<password.length;i++){
      if(password[i]>='0' && password[i]<='9'){
        count[0]=1;
      }
      else if(password[i]>='A' && password[i]<='Z'){
        count[1]=1;
      }
      else if(password[i]>='a' && password[i]<='z'){
        count[2]=1;
      }
      else{
        count[3]=1;
      }
    }
    for(const i in count){
      if(count[i]!==1){
        return false;
      }
    }
    return true;
  }
  async validateCredentials(credentials:Credentials){
    if(!validate(credentials.email)){
      throw new HttpErrors.UnprocessableEntity('invalid email')
    }
    if(!this.isValidPswd(credentials.password)){
      throw new HttpErrors.UnprocessableEntity('password validations failed')
    }
    
  }
}
