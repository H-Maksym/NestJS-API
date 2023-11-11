import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

// @ApiTags('💂‍♂️ users')
@ApiTags('🧶 common service')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/live')
  @ApiOperation({ summary: '✔ check live server' })
  @ApiResponse({
    status: 200,
    description: '✔ check live server',
  })
  live(): { status: boolean } {
    return this.appService.live();
  }
}
