import { CollectionReference } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { decodeCursor, encodeCursor } from 'src/common/encodeCursor';
import {
  RelayConnectionShape,
  RelayPaginationArgs,
} from 'src/common/graphql/relay-connection.factory';
import { FirestoreService } from 'src/firestore/firestore.service';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  private readonly collection: CollectionReference<Customer, Customer>;

  constructor(private readonly firestoreService: FirestoreService) {
    this.collection = this.firestoreService.collection('customers');
  }

  async findById(id: string, shopId: string) {
    const doc = await this.collection.doc(id).get();
    const customer = doc.data();
    if (customer?.shopId !== shopId) {
      return null;
    }
    return customer;
  }

  async findMany(
    pagination: RelayPaginationArgs,
    shopId: string,
  ): Promise<RelayConnectionShape<Customer>> {
    const { after, first } = pagination;

    let query = this.collection.where('shopId', '==', shopId).limit(first + 1);

    if (after) {
      const { last_id } = decodeCursor(after);
      const afterSnapshot = await this.collection.doc(last_id).get();

      if (afterSnapshot.exists) {
        query = query.startAfter(afterSnapshot);
      }
    }

    const [snapshot, countSnapshot] = await Promise.all([
      query.get(),
      this.collection.where('shopId', '==', shopId).count().get(),
    ]);

    const docs = snapshot.docs;
    const edges = docs.slice(0, first).map((doc) => ({
      cursor: encodeCursor(doc.id, doc.data().createdAt),
      node: doc.data(),
    }));
    const nodes = docs.slice(0, first).map((doc) => doc.data());
    const hasNextPage = docs.length > first;
    const totalCount = countSnapshot.data().count ?? 0;
    const totalPage =
      first > 0 ? Math.max(1, Math.ceil(totalCount / first)) : 0;

    return {
      edges,
      nodes,
      pageInfo: {
        hasNextPage,
        startCursor: edges[0]?.cursor ?? null,
        totalPage,
      },
    };
  }
}
