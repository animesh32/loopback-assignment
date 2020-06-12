import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Users,
  Customers,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersCustomersController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/customers', {
    responses: {
      '200': {
        description: 'Array of Users has many Customers',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customers)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Customers>,
  ): Promise<Customers[]> {
    return this.usersRepository.customers(id).find(filter);
  }

  @post('/users/{id}/customers', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Customers)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customers, {
            title: 'NewCustomersInUsers',
            exclude: ['id'],
            optional: ['usersId']
          }),
        },
      },
    }) customers: Omit<Customers, 'id'>,
  ): Promise<Customers> {
    return this.usersRepository.customers(id).create(customers);
  }

  @patch('/users/{id}/customers', {
    responses: {
      '200': {
        description: 'Users.Customers PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customers, {partial: true}),
        },
      },
    })
    customers: Partial<Customers>,
    @param.query.object('where', getWhereSchemaFor(Customers)) where?: Where<Customers>,
  ): Promise<Count> {
    return this.usersRepository.customers(id).patch(customers, where);
  }

  @del('/users/{id}/customers', {
    responses: {
      '200': {
        description: 'Users.Customers DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Customers)) where?: Where<Customers>,
  ): Promise<Count> {
    return this.usersRepository.customers(id).delete(where);
  }
}
