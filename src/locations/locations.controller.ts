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
import { LocationsService } from './locations.service';
import {
  CreateLocationDto,
  BatchCreateLocationDto,
} from './dto/create-location.dto';
import { Location } from './entities/location.entity';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('locations')
@ApiHeader({
  name: 'x-api-key',
  description: 'API key for authentication',
  required: true,
})
@UseGuards(ApiKeyGuard)
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a single location log' })
  @ApiResponse({
    status: 201,
    description: 'The location has been successfully created.',
    type: Location,
  })
  create(@Body(ValidationPipe) createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Post('batch')
  @ApiOperation({ summary: 'Batch upload multiple location logs' })
  @ApiResponse({
    status: 201,
    description: 'The locations have been successfully created.',
    type: [Location],
  })
  batchCreate(@Body(ValidationPipe) batchCreateDto: BatchCreateLocationDto) {
    return this.locationsService.batchCreate(batchCreateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all location logs' })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filter locations by userId',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all locations.',
    type: [Location],
  })
  findAll(@Query('userId') userId?: string) {
    return this.locationsService.findAll(userId);
  }

  @Get(':userId/:id')
  @ApiOperation({
    summary: 'Get a single location log by user ID and device ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the location.',
    type: Location,
  })
  @ApiResponse({ status: 404, description: 'Location not found.' })
  findOne(@Param('userId') userId: string, @Param('id') id: number) {
    return this.locationsService.findOne(userId, id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all location logs for a specific user' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit the number of results',
  })
  @ApiResponse({
    status: 200,
    description: 'Return filtered locations.',
    type: [Location],
  })
  findByUser(@Param('userId') userId: string, @Query('limit') limit?: number) {
    return this.locationsService.findByUser(userId, limit);
  }

  @Get('user/:userId/range')
  @ApiOperation({ summary: 'Get location logs for a user within a date range' })
  @ApiQuery({ name: 'startDate', type: String, description: 'ISO date string' })
  @ApiQuery({ name: 'endDate', type: String, description: 'ISO date string' })
  @ApiResponse({
    status: 200,
    description: 'Return locations within range.',
    type: [Location],
  })
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
