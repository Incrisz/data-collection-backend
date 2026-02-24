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
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './entities/location.entity';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('locations')
@ApiSecurity('x-api-key')
@UseGuards(ApiKeyGuard)
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create one or more location logs' })
  @ApiBody({
    type: [CreateLocationDto],
    examples: {
      single: {
        summary: 'A single location log',
        value: [
          {
            userId: 'user_123',
            id: 1106,
            latitude: 9.0272201,
            longitude: 7.4882057,
            accuracy: 45.6,
            source: 'gps',
            synced: 1,
            timestamp: '2026-02-09T06:01:01.935Z',
          },
        ],
      },
      multiple: {
        summary: 'Multiple location logs',
        value: [
          {
            userId: 'user_123',
            id: 1106,
            latitude: 9.0272201,
            longitude: 7.4882057,
            accuracy: 45.6,
            source: 'gps',
            synced: 1,
            timestamp: '2026-02-09T06:01:01.935Z',
          },
          {
            userId: 'user_123',
            id: 1107,
            latitude: 9.0273201,
            longitude: 7.4883057,
            accuracy: 30.2,
            source: 'gps',
            synced: 1,
            timestamp: '2026-02-09T06:05:01.935Z',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The locations have been successfully created.',
    type: [Location],
  })
  create(
    @Body(new ParseArrayPipe({ items: CreateLocationDto }))
    createLocationDtos: CreateLocationDto[],
  ) {
    return this.locationsService.create(createLocationDtos);
  }

  @Get()
  @ApiOperation({ summary: 'Get all location logs' })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filter locations by userId',
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
    description: 'Return all locations.',
    type: [Location],
  })
  findAll(
    @Query('userId') userId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.locationsService.findAll(
      userId,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }
}
