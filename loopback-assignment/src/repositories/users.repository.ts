import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {Users, UsersRelations, Customers, Roles} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CustomersRepository} from './customers.repository';
import {RolesRepository} from './roles.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly customers: HasManyRepositoryFactory<Customers, typeof Users.prototype.id>;

  public readonly roles: BelongsToAccessor<Roles, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CustomersRepository') protected customersRepositoryGetter: Getter<CustomersRepository>, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>,
  ) {
    super(Users, dataSource);
    this.roles = this.createBelongsToAccessorFor('roles', rolesRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
    this.customers = this.createHasManyRepositoryFactoryFor('customers', customersRepositoryGetter,);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
  }
}
