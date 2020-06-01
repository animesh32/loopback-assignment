import {AuthenticationStrategy} from '@loopback/authentication';
import {Request, HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {JWTService} from '../services';
import {jwtConfigs} from '../keys';
import {inject, bind, BindingScope} from '@loopback/context';

@bind({scope: BindingScope.TRANSIENT})
export class JWTStrategy implements AuthenticationStrategy {
  constructor(
    @inject(jwtConfigs.jwtService)
    protected jwtService: JWTService,
  ) {
  }

  name = 'jwt';

  async authenticate(request: Request): Promise<UserProfile> {
    const token = this.extractCredentials(request);
    return this.jwtService.verifyToken(token);
  }

  extractCredentials(request: Request): string {
    const autHeader = request.headers.authorization;
    if (!autHeader) {
      throw new HttpErrors.NotFound('authorization header missing in request');
    }

    return autHeader.split('Bearer ')[1] ;
  }
}
