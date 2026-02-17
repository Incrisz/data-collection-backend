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
  ApiSecurity,
} from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import {
  CreateLocationDto,
  BatchCreateLocationDto,
} from './dto/create-location.dto';
import { Location } from './entities/location.entity';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('locations')
@ApiSecurity('x-api-key')
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
}
