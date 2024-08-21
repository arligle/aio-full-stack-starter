import { NormalException } from '@/master/exception';
import { Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { toSwaggerError } from '@/master/utils/helper';

// biome-ignore lint/style/useImportType: <explanation>
import { AppService } from './app.service';
import { VersionRes } from './dto';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    description: 'Get the app version',
    summary: AppController.prototype.getVersion.name,
  })
  @ApiOkResponse({
    description: 'Return current version',
    type: VersionRes,
  })
  @ApiBadRequestResponse(toSwaggerError(NormalException.UNEXPECTED()))
  @Get('version')
  getVersion(): VersionRes {
    return this.appService.getVersion();
  }

  @ApiOperation({
    description: 'For metrics server health checking',
    summary: AppController.prototype.healthz.name,
  })
  @ApiOkResponse({
    // 因为这里只返回字符串，没有schema，所以直接写例子
    content: {
      'application/json': {
        example: {
          data: 'OK',
        },
      },
    },
    description: 'Return OK',
  })
  @Get(AppController.prototype.healthz.name)
  healthz(): string {
    return this.appService.healthz();
  }
}
