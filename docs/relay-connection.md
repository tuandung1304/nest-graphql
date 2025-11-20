# Relay Connection Factory

Use `RelayConnection` to expose list queries that follow the Relay pagination
spec without hand-writing edge and page info types every time.

## Usage

```ts
import {
  RelayConnection,
  RelayPaginationArgs,
} from 'src/common/graphql/relay-connection.factory';

const CustomerConnection = RelayConnection(Customer);

@Query(() => CustomerConnection)
async customers(
  @Args() pagination: RelayPaginationArgs,
): Promise<RelayConnectionShape<Customer>> {
  return this.customerService.findMany(pagination);
}
```

The factory returns a concrete GraphQL type with the following shape:

```
{
  edges: [
    {
      cursor: string;
      node: Customer;
    },
    ...
  ];
  pageInfo: {
    hasNextPage: boolean;
    startCursor?: string;
    totalPage: number;
  };
}
```

`RelayPaginationArgs` exposes `first` (default `10`) and `after` cursor inputs
for queries that need cursor-based pagination.
