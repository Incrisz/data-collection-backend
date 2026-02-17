import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiSecurity,
} from '@nestjs/swagger';
import { CallLogsService } from './call-logs.service';
import {
  CreateCallLogDto,
  BatchCreateCallLogDto,
} from './dto/create-call-log.dto';
import { CallLog } from './entities/call-log.entity';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('call-logs')
@ApiSecurity('x-api-key')
@UseGuards(ApiKeyGuard)
@Controller('call-logs')
export class CallLogsController {
  constructor(private readonly callLogsService: CallLogsService) {}

  // Call Log endpoints
  @Post()
  @ApiOperation({ summary: 'Create a single call log' })
  @ApiResponse({
    status: 201,
    description: 'The call log has been successfully created.',
    type: CallLog,
  })
  createCallLog(@Body(ValidationPipe) createCallLogDto: CreateCallLogDto) {
    return this.callLogsService.createCallLog(createCallLogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all call logs' })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filter call logs by userId',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all call logs.',
    type: [CallLog],
  })
  findAllCallLogs(@Query('userId') userId?: string) {
    return this.callLogsService.findAllCallLogs(userId);
  }

  // Batch upload endpoint
  @Post('batch')
  @ApiOperation({ summary: 'Batch upload multiple call logs' })
  @ApiResponse({
    status: 201,
    description: 'The logs have been successfully created.',
  })
  batchCreate(@Body(ValidationPipe) batchCreateDto: BatchCreateCallLogDto) {
    return this.callLogsService.batchCreate(batchCreateDto);
  }
}
