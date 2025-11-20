import { Type } from '@nestjs/common';
import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';

export interface RelayEdgeShape<T> {
  cursor: string;
  node: T;
}

export interface RelayConnectionShape<T> {
  edges: RelayEdgeShape<T>[];
  nodes: T[];
  pageInfo: RelayPageInfo;
}

@ObjectType('PageInfo')
export class RelayPageInfo {
  @Field(() => Boolean, {
    description:
      'Whether there are more pages to fetch following the current page.',
  })
  hasNextPage: boolean;

  @Field(() => String, {
    nullable: true,
    description: 'The cursor corresponding to the first node in edges.',
  })
  startCursor?: string | null;

  @Field(() => Int, {
    description: 'The total number of pages.',
  })
  totalPage: number;
}

@ArgsType()
export class RelayPaginationArgs {
  @Field(() => Int, {
    defaultValue: 10,
    description: 'The first n elements from the paginated list.',
  })
  first = 10;

  @Field(() => String, {
    nullable: true,
    description: 'The elements that come after the specified cursor.',
  })
  after?: string;
}

export function RelayConnection<T>(classRef: Type<T>) {
  @ObjectType(`${classRef.name}Edge`)
  class RelayEdge implements RelayEdgeShape<T> {
    @Field(() => String, {
      description: 'The position of each node in an array, used in pagination.',
    })
    cursor: string;

    @Field(() => classRef, {
      description: `The item at the end of ${classRef.name}Edge.`,
    })
    node: T;
  }

  @ObjectType(`${classRef.name}Connection`)
  class RelayConnectionObject implements RelayConnectionShape<T> {
    @Field(() => [RelayEdge], {
      description:
        "The connection between the node and its parent. Each edge contains a minimum of the edge's cursor and the node.",
    })
    edges: RelayEdge[];

    @Field(() => [classRef], {
      description: `A list of nodes that are contained in ${classRef.name}Edge.`,
    })
    nodes: T[];

    @Field(() => RelayPageInfo, {
      description:
        'An object that’s used to retrieve cursor information about the current page.',
    })
    pageInfo: RelayPageInfo;
  }

  return RelayConnectionObject;
}
