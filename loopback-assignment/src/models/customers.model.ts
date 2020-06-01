import {model, property} from '@loopback/repository';
import {BaseEntityModel} from './base.entity.model'
import {Users} from './users.model'
@model()
export class Customers extends BaseEntityModel {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  website: string;

  @property({
    type: 'string',
  })
  address: string;

  @property({
    type: 'number',
  })
  usersId?: number;

  constructor(data?: Partial<Customers>) {
    super(data);
  }
}

export interface CustomersRelations {
  userId:Users
}

export type CustomerWithRelations = Customers & CustomersRelations;
