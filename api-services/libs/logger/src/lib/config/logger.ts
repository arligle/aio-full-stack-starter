import { IsString, IsBoolean } from 'class-validator';
import { BooleanType } from '@ifckit/validation';
/**
 * @description 用于配置日志记录器的行为
 */
export class LoggerConfig {
  @IsBoolean() // 检查值是否为布尔值。
  @BooleanType
  colorize = false;

  @IsBoolean()
  @BooleanType
  prettyLogs = false;

  @IsString()
  defaultLevel = 'info';
}
