import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EnvModule } from './config/env.config';
import { CustomersModule } from './customers/customers.module';
import { FirestoreModule } from './firestore/firestore.module';

@Module({
  imports: [
    EnvModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.graphql',
      graphiql: true,
    }),
    CustomersModule,
    FirestoreModule,
  ],
})
export class AppModule {}
