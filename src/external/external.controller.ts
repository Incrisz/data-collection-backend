import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { LocationsService } from '../locations/locations.service';
import { CallLogsService } from '../call-logs/call-logs.service';
import { SmsLogsService } from '../sms-logs/sms-logs.service';
import { Location } from '../locations/entities/location.entity';
import { CallLog } from '../call-logs/entities/call-log.entity';
import { SmsLog } from '../sms-logs/entities/sms-log.entity';

@ApiTags('external-tracking')
@Controller('external')
export class ExternalTrackingController {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly callLogsService: CallLogsService,
    private readonly smsLogsService: SmsLogsService,
  ) {}

  @Get('locations')
  @ApiOperation({ summary: 'Publicly fetch all location logs' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiResponse({ status: 200, type: [Location] })
  findAllLocations(@Query('userId') userId?: string) {
    return this.locationsService.findAll(userId);
  }

  @Get('locations/:userId/:id')
  @ApiOperation({ summary: 'Publicly fetch a single location log' })
  @ApiResponse({ status: 200, type: Location })
  findOneLocation(@Param('userId') userId: string, @Param('id') id: number) {
    return this.locationsService.findOne(userId, id);
  }

  @Get('call-logs/:userId/:id')
  @ApiOperation({ summary: 'Publicly fetch a single call log' })
  @ApiResponse({ status: 200, type: CallLog })
  findOneCallLog(@Param('userId') userId: string, @Param('id') id: number) {
    return this.callLogsService
      .findAllCallLogs(userId)
      .then((logs) => logs.find((l) => l.id === id));
  }

  @Get('sms-logs/:userId/:id')
  @ApiOperation({ summary: 'Publicly fetch a single SMS log' })
  @ApiResponse({ status: 200, type: SmsLog })
  findOneSmsLog(@Param('userId') userId: string, @Param('id') id: number) {
    return this.smsLogsService.findOne(userId, id);
  }

  @Get('call-logs')
  @ApiOperation({ summary: 'Publicly fetch all call logs' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiResponse({ status: 200, type: [CallLog] })
  findAllCallLogs(@Query('userId') userId?: string) {
    return this.callLogsService.findAllCallLogs(userId);
  }

  @Get('sms-logs')
  @ApiOperation({ summary: 'Publicly fetch all SMS logs' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiResponse({ status: 200, type: [SmsLog] })
  findAllSmsLogs(@Query('userId') userId?: string) {
    return this.smsLogsService.findAll(userId);
  }

  @Get('locations/:userId/range')
  @ApiOperation({
    summary: 'Publicly fetch locations for a user within a range',
  })
  @ApiQuery({ name: 'startDate' })
  @ApiQuery({ name: 'endDate' })
  findByUserAndDateRange(
    @Param('userId') userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.locationsService.findByUserAndDateRange(
      userId,
      new Date(startDate),
      new Date(endDate),
    );
  }
}
