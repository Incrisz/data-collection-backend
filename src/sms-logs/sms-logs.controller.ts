import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
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
import { SmsLogsService } from './sms-logs.service';
import { CreateSmsLogDto } from './dto/create-sms-log.dto';
import { SmsLog } from './entities/sms-log.entity';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('sms-logs')
@ApiSecurity('x-api-key')
@UseGuards(ApiKeyGuard)
@Controller('sms-logs')
export class SmsLogsController {
  constructor(private readonly smsLogsService: SmsLogsService) {}

  @Post()
  @ApiOperation({ summary: 'Create one or more SMS logs' })
  @ApiBody({
    type: [CreateSmsLogDto],
    examples: {
      single: {
        summary: 'A single SMS log',
        value: [
          {
            userId: 'user_123',
            id: 1,
            direction: 'sent',
            synced: 1,
            length: 6,
            contact_hash: '385201775',
            timestamp: '2026-02-08T19:41:00.000Z',
          },
        ],
      },
      multiple: {
        summary: 'Multiple SMS logs',
        value: [
          {
            userId: 'user_123',
            id: 1,
            direction: 'sent',
            synced: 1,
            length: 6,
            contact_hash: '385201775',
            timestamp: '2026-02-08T19:41:00.000Z',
          },
          {
            userId: 'user_123',
            id: 2,
            direction: 'received',
            synced: 1,
            length: 12,
            contact_hash: '999888777',
            timestamp: '2026-02-08T20:00:00.000Z',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The logs have been successfully created.',
    type: [SmsLog],
  })
  create(
    @Body(new ParseArrayPipe({ items: CreateSmsLogDto }))
    createSmsLogDtos: CreateSmsLogDto[],
  ) {
    return this.smsLogsService.create(createSmsLogDtos);
  }

  @Get()
  @ApiOperation({ summary: 'Get all SMS logs' })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filter logs by userId',
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
    description: 'Return all logs.',
    type: [SmsLog],
  })
  findAll(
    @Query('userId') userId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.smsLogsService.findAll(
      userId,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }
}
