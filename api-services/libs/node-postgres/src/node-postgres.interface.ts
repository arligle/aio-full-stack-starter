import type { DrizzleConfig } from 'drizzle-orm';
import type { ClientConfig, PoolConfig } from 'pg';
export interface DrizzlePGConfig {
  pg: {
    connection: 'client' | 'pool';
    config: ClientConfig | PoolConfig;
  };
  config?: DrizzleConfig<any> | undefined;
}
