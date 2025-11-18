import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FirestoreService } from 'src/firestore/firestore.service';
import { Customer } from './entities/customer.entity';

@Resolver(() => Customer)
export class CustomersResolver {
  private readonly customerCollection: FirebaseFirestore.CollectionReference<Customer>;

  constructor(private readonly firestoreService: FirestoreService) {
    this.customerCollection = this.firestoreService
      .collection('members')
      .withConverter({
        toFirestore: (customer: Customer) => customer,
        fromFirestore: (snap) => ({ id: snap.id, ...snap.data() }) as Customer,
      });
  }

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
  async findMany() {
    const snapshot = await this.customerCollection.limit(10).get();
    const test = snapshot.docs.map((doc) => doc.data());
    return test;
  }

  @ResolveField(() => String, { description: 'The full name of the customer' })
  fullName(@Parent() customer: Customer): string {
    return `${customer.firstName} ${customer.lastName}`;
  }
}
