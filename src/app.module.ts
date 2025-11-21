import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApiKeyGuard } from './apiKey/api-key.guard';
import { ApiKeyModule } from './apiKey/api-key.module';
import { EnvModule } from './config/env.config';
import { CustomersModule } from './customers/customers.module';
import { FirestoreModule } from './firestore/firestore.module';

@Module({
  imports: [
    EnvModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      graphiql: true,
    }),
    CustomersModule,
    FirestoreModule,
    ApiKeyModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule {}
