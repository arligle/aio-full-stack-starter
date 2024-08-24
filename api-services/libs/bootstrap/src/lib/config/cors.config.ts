import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BooleanType } from '@ifckit/validation';
/**
 * @description 用于配置跨域资源共享（CORS）设置
 */
export class CorsConfig {
  @IsArray()
  @IsString({
    each: true,
  })
  @IsOptional()
  origin?: string[]; // 表示允许访问资源的源

  @IsArray()
  @IsString({
    each: true,
  })
  @IsOptional()
  methods?: string[]; // 表示允许的 HTTP 请求方法

  @IsArray()
  @IsString({
    each: true,
  })
  @IsOptional()
  allowedHeaders?: string[]; // 表示允许的 HTTP 请求头

  @IsArray()
  @IsString({
    each: true,
  })
  @IsOptional()
  exposedHeaders?: string[]; // 表示可以暴露给浏览器的响应头

  @IsBoolean()
  @BooleanType
  @IsOptional()
  credentials?: boolean;  // 表示是否允许发送凭据（如 Cookie）

  @IsOptional()
  @IsNumber()
  maxAge?: number; // 表示预检请求的有效期（单位：秒）

  @IsBoolean()
  @BooleanType
  @IsOptional()
  preflightContinue?: boolean; // 表示是否继续处理预检请求

  @IsOptional()
  @IsNumber()
  optionsSuccessStatus?: number; // 表示预检请求成功的状态码
}
