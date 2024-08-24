import { Allow, IsInt, IsString, Max, Min } from 'class-validator';
import { CorsConfig } from './cors.config';
import { ValidateNestedProperty } from '@ifckit/validation';
/**
 * @description 用于配置应用程序的相关设置。
 * 这个类使用了多个装饰器来验证和约束其属性，确保它们符合预期的格式和范围。
 */
export class AppConfig {
  @IsInt()
  @Min(0)
  @Max(65_535)
  port!: number;

  @IsString()
  @Allow()
  prefix?: string;

  @ValidateNestedProperty({ classType: CorsConfig })
  public readonly cors!: CorsConfig;
}
