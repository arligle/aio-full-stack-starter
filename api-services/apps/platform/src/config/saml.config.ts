import { Allow, IsBoolean, IsString } from 'class-validator';
/**
 * @description 用于配置 SAML 认证的配置项
 * SAML（Security Assertion Markup Language）是一种用于在不同安全域之间交换认证和授权数据的开放标准。
 * 它主要用于单点登录（SSO）场景，允许用户在多个应用程序之间无缝地进行身份验证，而无需在每个应用程序中单独登录。
 */
export class SamlConfig {
  @IsString()
  issuer!: string;

  @IsBoolean()
  wantAssertionsSigned!: boolean;

  @IsString()
  @Allow()
  frontendUrl?: string;

  @IsString()
  callbackUrl!: string;
}
