import { Controller, Get } from '@nestjs/common';
import { ServerService } from './server.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LiveServerDTO } from './dto/live-server.dto';

// @ApiTags('💂‍♂️ users')
@ApiTags('🧶 server service')
@Controller('server')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}
  @Get('/live')
  @ApiOperation({ summary: '✔ check live server' })
  @ApiOkResponse({
    description: '✔ check live server',
    type: LiveServerDTO,
  })
  live(): LiveServerDTO {
    return { status: this.serverService.live() };
  }
}
