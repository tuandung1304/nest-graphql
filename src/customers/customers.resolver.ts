import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { ShopId } from 'src/common/decorators/shopId.decorator';
import {
  RelayConnection,
  RelayPaginationArgs,
} from 'src/common/graphql/relay-connection.factory';
import { CustomersService } from './customers.service';
import { Customer } from './entities/customer.entity';

const CustomerConnection = RelayConnection(Customer);

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}

  @Query(() => Customer, { name: 'customer', nullable: true })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
    @ShopId() shopId: string,
  ) {
    return this.customersService.findById(id, shopId);
  }

  @Query(() => CustomerConnection, { name: 'customers' })
  async findMany(
    @Args() pagination: RelayPaginationArgs,
    @ShopId() shopId: string,
  ) {
    return this.customersService.findMany(pagination, shopId);
  }
}
