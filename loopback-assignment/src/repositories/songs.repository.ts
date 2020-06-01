import {DefaultCrudRepository} from '@loopback/repository';
import {Songs, SongsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SongsRepository extends DefaultCrudRepository<
  Songs,
  typeof Songs.prototype.id,
  SongsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Songs, dataSource);
  }
}
