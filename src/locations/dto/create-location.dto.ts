import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDateString,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({
    description: 'The ID of the user in the main system',
    example: 'user_123',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The ID from local mobile database',
    example: 1106,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'The time the location was captured (ISO string)',
    example: '2026-02-09T06:01:01.935Z',
  })
  @IsDateString()
  timestamp: string;

  @ApiProperty({ description: 'The latitude coordinate', example: 9.0272201 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'The longitude coordinate', example: 7.4882057 })
  @IsNumber()
  longitude: number;

  @ApiPropertyOptional({
    description: 'The accuracy of the location (in meters)',
    example: 45.5999,
  })
  @IsNumber()
  @IsOptional()
  accuracy?: number;

  @ApiProperty({ description: 'Sync status', example: 1 })
  @IsNumber()
  @IsOptional()
  synced?: number;
}

export class BatchCreateLocationDto {
  @ApiProperty({
    type: [CreateLocationDto],
    description: 'An array of location logs for batch upload',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLocationDto)
  locations: CreateLocationDto[];
}
