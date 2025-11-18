import { Firestore } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from 'src/config/env.config';

@Injectable()
export class FirestoreService extends Firestore {
  constructor(private readonly configService: ConfigService<EnvSchema>) {
    super({
      projectId: configService.get('FIRESTORE_PROJECT_ID'),
      credentials: {
        client_email: configService.get('FIRESTORE_CLIENT_EMAIL'),
        private_key: configService
          .get<string>('FIRESTORE_PRIVATE_KEY')
          ?.replace(/\\n/g, '\n'),
      },
    });
  }
}
