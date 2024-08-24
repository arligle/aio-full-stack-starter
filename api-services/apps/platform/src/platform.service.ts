import { Injectable } from '@nestjs/common';
// import type RootConfig from './config/root.config';
// import type { SamlConfig } from './config/saml.config';

@Injectable()
export class PlatformService {
  // constructor(
  //   // private config: RootConfig,
  //   // private samlConfig: SamlConfig,
  // ) { }
  getHello(): string {
    return 'Hello Platform!';
  }
}
