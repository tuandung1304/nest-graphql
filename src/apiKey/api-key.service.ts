import { CollectionReference } from '@google-cloud/firestore';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { FirestoreService } from 'src/firestore/firestore.service';
import { IApiKey } from './type';

@Injectable()
export class ApiKeyService {
  private readonly collection: CollectionReference<IApiKey, IApiKey>;
  constructor(private readonly firestoreService: FirestoreService) {
    this.collection = firestoreService.collection('apiKeys');
  }

  async validateKey(keyId: string, secretKey: string) {
    const key = await this.collection.doc(keyId).get();

    if (!key.exists) {
      throw new UnauthorizedException('Invalid secret key');
    }

    const keyData = key.data() as IApiKey;
    const isValid = await bcrypt.compare(secretKey, keyData.hashedSecret);
    if (!isValid) {
      throw new UnauthorizedException('Invalid secret key');
    }

    return keyData;
  }
}
