import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum CustomerType {
  CUSTOMER = 'customer',
  GUEST = 'guest',
  ANONYMOUS = 'anonymous',
}

export enum Channel {
  ONLINE_STORE = 'online store',
  EMAIL = 'email',
  WHATSAPP = 'whatsapp',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
}

@ObjectType()
export class Customer {
  @Field(() => ID)
  id: string;

  @Field()
  shopId: string;

  @Field({ nullable: true })
  shopifyCustomerId?: string;

  @Field()
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  ipLocation?: string;

  @Field({ nullable: true })
  ipAddress?: string;

  @Field(() => CustomerType)
  type?: CustomerType;

  @Field(() => [Channel])
  channels?: Channel[];

  @Field(() => Int)
  ordersCount?: number;

  @Field()
  totalSpent?: number;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  lastChatAt?: Date;
}

registerEnumType(CustomerType, {
  name: 'CustomerType',
});

registerEnumType(Channel, {
  name: 'Channel',
});
