import { CollectionReference } from '@google-cloud/firestore';
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
  private readonly collection: CollectionReference<Customer, Customer>;

  constructor(private readonly firestoreService: FirestoreService) {
    this.collection = this.firestoreService.collection('members');
  }

  @Query(() => Customer, { name: 'customer' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    const customer = await this.collection.doc(id).get();

    return customer.data();
  }

  @Query(() => [Customer], { name: 'customers' })
  async findMany() {
    const snapshot = await this.collection.limit(10).get();
    return snapshot.docs.map((doc) => doc.data());
  }

  @ResolveField(() => String, { description: 'The full name of the customer' })
  fullName(@Parent() customer: Customer): string {
    return `${customer.firstName} ${customer.lastName}`;
  }
}
