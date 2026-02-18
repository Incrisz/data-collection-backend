import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiSecurity,
} from '@nestjs/swagger';
import { LocationsService } from '../locations/locations.service';
import { CallLogsService } from '../call-logs/call-logs.service';
import { SmsLogsService } from '../sms-logs/sms-logs.service';
import { Location } from '../locations/entities/location.entity';
import { CallLog } from '../call-logs/entities/call-log.entity';
import { SmsLog } from '../sms-logs/entities/sms-log.entity';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('external-tracking')
@Controller('external')
@UseGuards(ApiKeyGuard)
@ApiSecurity('x-api-key')
export class ExternalTrackingController {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly callLogsService: CallLogsService,
    private readonly smsLogsService: SmsLogsService,
  ) {}

  @Get('locations')
  @ApiOperation({ summary: 'Publicly fetch all location logs' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({
    name: 'date',
    required: false,
    type: String,
    description: 'ISO date string (YYYY-MM-DD)',
  })
  @ApiResponse({ status: 200, type: [Location] })
  findAllLocations(
    @Query('userId') userId?: string,
    @Query('date') date?: string,
  ) {
    return this.locationsService.findAll(
      userId,
      date ? new Date(date) : undefined,
    );
  }

  @Get('call-logs')
  @ApiOperation({ summary: 'Publicly fetch all call logs' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({
    name: 'date',
    required: false,
    type: String,
    description: 'ISO date string (YYYY-MM-DD)',
  })
  @ApiResponse({ status: 200, type: [CallLog] })
  findAllCallLogs(
    @Query('userId') userId?: string,
    @Query('date') date?: string,
  ) {
    return this.callLogsService.findAllCallLogs(
      userId,
      date ? new Date(date) : undefined,
    );
  }

  @Get('sms-logs')
  @ApiOperation({ summary: 'Publicly fetch all SMS logs' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({
    name: 'date',
    required: false,
    type: String,
    description: 'ISO date string (YYYY-MM-DD)',
  })
  @ApiResponse({ status: 200, type: [SmsLog] })
  findAllSmsLogs(
    @Query('userId') userId?: string,
    @Query('date') date?: string,
  ) {
    return this.smsLogsService.findAll(
      userId,
      date ? new Date(date) : undefined,
    );
  }
}
