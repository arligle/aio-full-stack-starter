import { setSeederFactory } from 'typeorm-extension';
import { Tenant } from '../entities';
import { plainToInstance } from 'class-transformer';
import { TenantStatus } from '../entities/tenants/vo/tenant-status.enum';
import { isMeta } from './utils/functions';
import { faker } from '@faker-js/faker';
// import type { DEFAULT_CREATE_ENTITY_EXCLUDE_LIST } from '@ifckit/typeorm';
// import type { ExcludeKeys } from '@ifckit/common-types';
/*
调用了typeorm-extension的setSeederFactory方法
*/
export const tenantFactory = setSeederFactory(
  Tenant,
  (_, meta) => {
    // 定义一个普通租户对象
    const plainTenant = {
      tenantName: faker.company.name(),
      tenantStatus: TenantStatus.ACTIVE,
      tenantFriendlyIdentifier: faker.company.name(),
      ownerId: '',
    }
    // TODO: 原始代码中使用了ExcludeKeys，存在报错需要进一步修改
    // satisfies ExcludeKeys<
    //   Tenant,
    //   // 从Tenant中排除以下属性
    //   typeof DEFAULT_CREATE_ENTITY_EXCLUDE_LIST | 'id' | 'version'
    // >;

    if (isMeta(meta)) {
      plainTenant.ownerId = meta.ownerId;
    }

    return plainToInstance(Tenant, plainTenant);
  });
