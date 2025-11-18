import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Customer {
  @Field(() => ID, { description: 'The id of the customer' })
  id: string;

  @Field(() => String, { description: 'The first name of the customer' })
  firstName: string;

  @Field(() => String, { description: 'The last name of the customer' })
  lastName: string;

  @Field(() => String, { description: 'The email of the customer' })
  email: string;

  @Field(() => String, { description: 'The phone of the customer' })
  phone: string;
}
