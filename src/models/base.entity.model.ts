import {property} from '@loopback/repository';
import {Entity} from '@loopback/repository'

export abstract class BaseEntityModel extends Entity {
  @property({
    type: 'date',
    default: () => new Date(),
    name: 'created_on',
  })
  createdOn?: Date;

  @property({
    type: 'date',
    default: () => new Date(),
    name: 'modified_on',
  })
  modifiedOn?: Date;
}
