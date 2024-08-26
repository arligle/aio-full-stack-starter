# Typeorm Utilities

这个库有一些有用的实用程序，用于类型、实体、存储库、有用的订阅者、拦截器。

它在 Softkit 生态系统之外也很有用

## Features

- 它提供了一个基本实体，其中包含一些有用的字段，例如“createdAt”、“updatedAt”、“deletedAt”、“version”、“id”
- 它覆盖了默认的 typeorm 存储库，并修复了默认 typeorm 存储库中的一些类型混淆
- 它提供了一个租户基础存储库，该存储库根据必须存在于“ClsStore”中的租户 ID 发出所有请求
- 有用的订阅者可自动填充 ClsStore 中的任何字段，例如“tenantId”、“userId”
- 乐观锁处理程序，如果您尝试更新由其他人更新的实体，则会抛出错误
- DB错误的通用拦截器，将DB错误转换为RFC7807错误
- 使用“@Transaction”装饰器简化事务管理

## Installation

```bash
yarn add @ifckit/typeorm
```

## Usage

### Add default configuration in your root config class

```typescript
import { DbConfig } from '@ifckit/typeorm';

export class RootConfig {
  @Type(() => DbConfig)
  @ValidateNested()
  public readonly db!: DbConfig;
}
```

### .env.yaml file

```yaml
db:
  type: 'postgres'
  host: 'localhost'
  port: 5432
  username: postgres
  password: postgres
  database: local-db
  synchronize: false
  dropSchema: false
  keepConnectionAlive: true
  logging: false
  ssl: false
```

### Add setup and entities to your main app module

```typescript
import { setupTypeormModule } from '@ifckit/typeorm';
import * as Entities from './database/entities';

@Module({
  imports: [TypeOrmModule.forFeature(Object.values(Entities)), setupTypeormModule()],
})
class YourAppModule {}
```

### Entities to extend from

- `EntityHelper` - with entity data for handling polymorphism
- `BaseEntityHelper` - with `id`, `createdAt`, `updatedAt`, `deletedAt`, `version` fields
- `BaseTenantEntityHelper` - useful for entities that belongs to specific tenant. It has `tenantId` field, that is auto populated for search operations on repository level

Note:

in your entity you can extend from `BaseEntityHelper` or `BaseTenantEntityHelper` or `EntityHelper` and add your fields
and also override `id` field decide what you want to use uuid or number or some other type

```typescript
class SampleEntity extends BaseEntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  name!: string;
}
```

### Repositories to extend from

- `BaseRepository` - extends default typeorm repository, and fixes some type confuses in the default typeorm repository
- `TenantBaseRepository` - extends `BaseRepository` and adds `tenantId` to all requests, that is taken from `ClsStore`

Note:

If your entity is Tenant Base but in some cases you want to get all data, you can just create another repository for this entity that extends `BaseRepository`.
That's ok to have multiple repositories for one entity.

#### Examples

- Plain repository

```typescript
@Injectable()
export class SampleRepository extends BaseRepository<SampleEntity> {
  constructor(
    @InjectDataSource()
    ds: DataSource,
  ) {
    super(SampleEntity, ds);
  }
}
```

- Tenant base repository (_it require to pass a ClsService_)

```typescript
@Injectable()
export class TenantUserRepository extends BaseTenantRepository<TenantUserEntity> {
  constructor(
    @InjectDataSource()
    ds: DataSource,
    clsService: ClsService<TenantClsStore>,
  ) {
    super(TenantUserEntity, ds, clsService);
  }
}
```

### Subscribers

- ClsPresetSubscriber - responsible for populating any fields from ClsStore to entity beforeInsert and beforeUpdate

`It configurable via ClsPreset decorator`

```typescript
export class BaseTenantEntityHelper extends BaseEntityHelper {
  @ClsPreset<TenantClsStore>({
    clsPropertyFieldName: 'tenantId',
  })
  @Column({ nullable: false })
  tenantId!: string;
}
```

- `OptimisticLockSubscriber` - responsible for handling optimistic lock errors. It's important to handle optimistic locks properly for many reasons.
  For example, if you have a frontend app, and some resource where users can collaborate and override each other, it's important to handle optimistic lock errors properly.
  Even if your entity can be changed by one user at a time, it's important to handle optimistic lock errors properly, because it can be changed by another service or by this user in another tab, and he just forgot about it.

### Filters

- `PostgresDbQueryFailedErrorFilter` this filter is responsible for handling low level postgres QueryFailedError, it's mapping codes to the appropriate RFC7807 errors
