import type { IAccessTokenPayload } from './payload';
import type { TenantClsStore } from '@ifckit/persistence-api';

export interface UserClsStore<T extends IAccessTokenPayload>
  extends TenantClsStore {
  [x: string]: any;
  jwtPayload: T;
  reqId: string;
  userId: string;
  authHeader: string;
}
