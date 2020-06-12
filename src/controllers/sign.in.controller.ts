import {repository} from '@loopback/repository';
import {post, requestBody} from '@loopback/rest';
import {UsersRepository} from '../repositories';
import {Credentials} from '../types/user.types';
import {credentialsRequestBody} from './specs/user.controller.specs';
import {MyUserService} from '../services/user.service';
import {UserBindings, jwtConfigs} from '../keys';
import {JWTService} from '../services/jwt.service';
import {inject} from '@loopback/context';

export class SignInController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @inject(UserBindings.userService)
    public userService: MyUserService,
    @inject(jwtConfigs.jwtService)
    public jwtService: JWTService,
  ) {}

  @post('/sign-in', {
    responses: {
      '200': {
        description: 'Get JWT token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async signin(
    @requestBody(credentialsRequestBody)
    credentials: Credentials,
  ): Promise<{token: string}> {
    const user = await this.userService.verifyCredentials(credentials);
    const userProfile = this.userService.convertToUserProfile(user);
    const token = await this.jwtService.generateToken(userProfile);
    return {token: token};
  }
}
