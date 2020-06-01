import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import {Users} from '../models';
import {UsersRepository} from '../repositories';
import {ValidatorService} from '../services/validator.service';
import {HashPassword} from '../services/hash.password';
import {inject, Getter} from '@loopback/context';
import {pick} from 'lodash';
import {MyUserService} from '../services';
import {UserBindings} from '../keys';
import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {permissionKeys} from '../enums/permission.keys';

export class UsersController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @inject('validator.service')
    protected validator: ValidatorService,
    @inject('hash.service')
    protected hashPswd: HashPassword,
    @inject(UserBindings.userService)
    protected userService: MyUserService,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    protected readonly getCurrentUser: Getter<Users | undefined>,
  ) {}

  @post('/users', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Users)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUsers',
            exclude: ['id'],
          }),
        },
      },
    })
    users: Omit<Users, 'id'>,
  ): Promise<Users> {
    await this.validator.validateCredentials(
      pick(users, ['email', 'password']),
    );
    users.password = await this.hashPswd.hashPswd(users.password);
    try {
      return await this.usersRepository.create(users);
    } catch (err) {
      throw new HttpErrors.BadRequest(err.message);
    }
  }

  @get('/users/count', {
    responses: {
      '200': {
        description: 'Users model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Users) where?: Where<Users>): Promise<Count> {
    return this.usersRepository.count(where);
  }

  @authenticate('jwt', {permissions: [permissionKeys.createCustomer]})
  @get('/users', {
    responses: {
      '200': {
        description: 'Array of Users model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Users, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Users) filter?: Filter<Users>): Promise<Users[]> {
    return this.usersRepository.find(filter);
  }

  @patch('/users', {
    responses: {
      '200': {
        description: 'Users PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Users,
    @param.where(Users) where?: Where<Users>,
  ): Promise<Count> {
    return this.usersRepository.updateAll(users, where);
  }

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users, {includeRelations: true}),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Users, {exclude: 'where'})
    filter?: FilterExcludingWhere<Users>,
  ): Promise<Users> {
    return this.usersRepository.findById(id, filter);
  }

  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'Users PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Users,
  ): Promise<void> {
    await this.usersRepository.updateById(id, users);
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'Users PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() users: Users,
  ): Promise<void> {
    await this.usersRepository.replaceById(id, users);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'Users DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usersRepository.deleteById(id);
  }

  @authenticate('jwt')
  @patch('/change-password', {
    responses: {
      '204': {
        description: 'Password Change success',
      },
    },
  })
  async changePswd(
    @requestBody()
    body: {
      old: string;
      new: string;
    },
  ): Promise<void> {
    const currUser = await this.getCurrentUser();
    let user: Users;
    if (currUser) {
      user = await this.usersRepository.findById(currUser.id);
      const isvalid = await this.hashPswd.comparePswd(body.old,user.password,);
      console.log(isvalid)
      if (!isvalid) {
        throw new HttpErrors.NotFound('password did not match');
      }
      await this.usersRepository.updateById(user.id, {
        password: await this.hashPswd.hashPswd(body.new),
      });
    } else {
      throw new HttpErrors.InternalServerError;
    }
  }
}
