import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ApiKeyService } from './api-key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext<{ req: Request }>().req;

    const keyId = req.headers['x-api-id'] as string | undefined;
    const secretKey = req.headers['x-api-secret'] as string | undefined;

    if (!keyId || !secretKey) {
      throw new UnauthorizedException('Missing x-api-id or x-api-secret');
    }

    const keyInfo = await this.apiKeyService.validateKey(keyId, secretKey);

    req['shopId'] = keyInfo.shopId;

    return true;
  }
}
