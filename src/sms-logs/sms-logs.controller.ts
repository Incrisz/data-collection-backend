import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiHeader,
} from '@nestjs/swagger';
import { SmsLogsService } from './sms-logs.service';
import {
  CreateSmsLogDto,
  BatchCreateSmsLogDto,
} from './dto/create-sms-log.dto';
import { SmsLog } from './entities/sms-log.entity';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('sms-logs')
@ApiHeader({
  name: 'x-api-key',
  description: 'API key for authentication',
  required: true,
})
@UseGuards(ApiKeyGuard)
@Controller('sms-logs')
export class SmsLogsController {
  constructor(private readonly smsLogsService: SmsLogsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a single SMS log' })
  @ApiResponse({
    status: 201,
    description: 'The log has been successfully created.',
    type: SmsLog,
  })
  create(@Body(ValidationPipe) createSmsLogDto: CreateSmsLogDto) {
    return this.smsLogsService.create(createSmsLogDto);
  }

  @Post('batch')
  @ApiOperation({ summary: 'Batch upload multiple SMS logs' })
  @ApiResponse({
    status: 201,
    description: 'The logs have been successfully created.',
    type: [SmsLog],
  })
  batchCreate(@Body(ValidationPipe) batchCreateDto: BatchCreateSmsLogDto) {
    return this.smsLogsService.batchCreate(batchCreateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all SMS logs' })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filter logs by userId',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all logs.',
    type: [SmsLog],
  })
  findAll(@Query('userId') userId?: string) {
    return this.smsLogsService.findAll(userId);
  }

  @Get(':userId/:id')
  @ApiOperation({ summary: 'Get a single SMS log by user ID and device ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the log.',
    type: SmsLog,
  })
  @ApiResponse({ status: 404, description: 'Log not found.' })
  findOne(@Param('userId') userId: string, @Param('id') id: number) {
    return this.smsLogsService.findOne(userId, id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all SMS logs for a specific user' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit the number of results',
  })
  @ApiResponse({
    status: 200,
    description: 'Return filtered logs.',
    type: [SmsLog],
  })
  findByUser(@Param('userId') userId: string, @Query('limit') limit?: number) {
    return this.smsLogsService.findByUser(userId, limit);
  }
}
