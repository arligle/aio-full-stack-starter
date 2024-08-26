import { applyDecorators } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { ErrorResponse } from '@ifckit/exceptions';

/**
 * todo consider moving to the appropriate library
 * 自定义装饰器简化了在 NestJS 项目中处理和描述 HTTP 409 冲突响应的过程。
 * */
export const ApiConflictResponsePaginated = (description: string) =>
  applyDecorators(
    ApiExtraModels(ErrorResponse),
    ApiConflictResponse({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ErrorResponse) },
          {
            properties: {
              status: {
                type: 'number',
                default: 409,
              },
            },
          },
        ],
      },
    }),
  );
