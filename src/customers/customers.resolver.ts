import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Customer } from './entities/customer.entity';

@Resolver(() => Customer)
export class CustomersResolver {
  @Query(() => Customer, { name: 'customer' })
  findOne(@Args('id', { type: () => ID }) id: string): Customer {
    return {
      id,
      email: 'john@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '0123456789',
    };
  }

  @Query(() => [Customer], { name: 'customers' })
  findMany(): Customer[] {
    return [
      {
        id: '101',
        email: 'john@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '0123456789',
      },
      {
        id: '102',
        email: 'jane@gmail.com',
        firstName: 'Jane',
        lastName: 'Doe',
        phone: '0987654321',
      },
    ];
  }

  @ResolveField(() => String, { description: 'The full name of the customer' })
  fullName(@Parent() customer: Customer): string {
    return `${customer.firstName} ${customer.lastName}`;
  }
}
