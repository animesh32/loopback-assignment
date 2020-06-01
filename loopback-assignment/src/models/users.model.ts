import {model, property, hasMany, belongsTo} from '@loopback/repository';
import {BaseEntityModel} from './base.entity.model'
import {Customers} from './customers.model';
import {Roles} from './roles.model';

@model({
  name: "users"
})
export class Users extends BaseEntityModel {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    name: "first_name"
  })
  firstName?: string;

  @property({
    type: 'string',
    name: "last_name"
  })
  lastName?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    name: "phone_no"
  })
  phoneNo?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @hasMany(() => Customers,{keyTo:"usersId"})
  customers: Customers[];

  @belongsTo(() => Roles)
  rolesId: number;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
