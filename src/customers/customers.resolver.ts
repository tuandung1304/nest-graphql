import {
  Args,
  Float,
  ID,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ShopId } from 'src/common/decorators/shopId.decorator';
import {
  RelayConnection,
  RelayPaginationArgs,
} from 'src/common/graphql/relay-connection.factory';
import { CustomersService } from './customers.service';
import { Channel, Customer, CustomerType } from './entities/customer.entity';

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

  @ResolveField(() => String, { name: 'firstName' })
  getFirstName(@Parent() customer: Customer) {
    return customer.firstName ?? '';
  }

  @ResolveField(() => String, { name: 'fullName' })
  getFullName(@Parent() customer: Customer) {
    return `${customer.firstName ?? ''} ${customer.lastName ?? ''}`.trim();
  }

  @ResolveField(() => CustomerType, { name: 'type' })
  getType(@Parent() customer: Customer) {
    return customer.type ?? CustomerType.CUSTOMER;
  }

  @ResolveField(() => [Channel], { name: 'channels' })
  getChannels(@Parent() customer: Customer) {
    return customer.channels ?? [Channel.ONLINE_STORE];
  }

  @ResolveField(() => Int, { name: 'ordersCount' })
  getOrdersCount(@Parent() customer: Customer) {
    return customer.ordersCount ?? 0;
  }

  @ResolveField(() => Float, { name: 'totalSpent' })
  getTotalSpent(@Parent() customer: Customer) {
    return customer.totalSpent ?? 0;
  }
}
