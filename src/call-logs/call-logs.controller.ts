import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  ValidationPipe,
  UseGuards,
  ParseArrayPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiSecurity,
  ApiBody,
} from '@nestjs/swagger';
import { CallLogsService } from './call-logs.service';
import { CreateCallLogDto } from './dto/create-call-log.dto';
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
  @ApiOperation({ summary: 'Create one or more call logs' })
  @ApiBody({
    type: [CreateCallLogDto],
    examples: {
      single: {
        summary: 'A single call log',
        value: [
          {
            userId: 'user_123',
            id: 1,
            timestamp: '2026-01-14T11:28:10.219Z',
            direction: 'INCOMING',
            status: 'INCOMING',
            duration: 23,
            contact_hash: '464472654',
            synced: 1,
          },
        ],
      },
      multiple: {
        summary: 'Multiple call logs',
        value: [
          {
            userId: 'user_123',
            id: 1,
            timestamp: '2026-01-14T11:28:10.219Z',
            direction: 'INCOMING',
            status: 'INCOMING',
            duration: 23,
            contact_hash: '464472654',
            synced: 1,
          },
          {
            userId: 'user_123',
            id: 2,
            timestamp: '2026-01-14T11:30:10.219Z',
            direction: 'OUTGOING',
            status: 'OUTGOING',
            duration: 45,
            contact_hash: '987654321',
            synced: 1,
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The call logs have been successfully created.',
    type: [CallLog],
  })
  createCallLog(
    @Body(new ParseArrayPipe({ items: CreateCallLogDto }))
    createCallLogDtos: CreateCallLogDto[],
  ) {
    return this.callLogsService.createCallLog(createCallLogDtos);
  }

  @Get()
  @ApiOperation({ summary: 'Get all call logs' })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filter call logs by userId',
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'Start date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    description: 'End date (YYYY-MM-DD)',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all call logs.',
    type: [CallLog],
  })
  findAllCallLogs(
    @Query('userId') userId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.callLogsService.findAllCallLogs(
      userId,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }
}
