export interface IApiKey {
  id: string;
  hashedSecret: string;
  shopId: string;
  isActive: boolean;
  createdAt: Date;
}
