import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCallLogDto {
  @ApiProperty({
    description: 'The ID of the user in the main system',
    example: 'user_123',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'The ID from local mobile database', example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'The time the call occurred (ISO string)',
    example: '2026-01-14T11:28:10.219Z',
  })
  @IsDateString()
  timestamp: string;

  @ApiProperty({
    description: 'The direction of the call',
    example: 'INCOMING',
  })
  @IsString()
  direction: string;

  @ApiProperty({
    description: 'The status of the call',
    example: 'INCOMING',
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'The duration of the call in seconds',
    example: 23,
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    description: 'The SHA-256 hash of the contact phone number',
    example: '464472654',
  })
  @IsString()
  @IsNotEmpty()
  contact_hash: string;

  @ApiProperty({ description: 'Sync status', example: 1 })
  @IsNumber()
  @IsOptional()
  synced?: number;
}

export class BatchCreateCallLogDto {
  @ApiProperty({
    type: [CreateCallLogDto],
    description: 'An array of call logs for batch upload',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCallLogDto)
  callLogs: CreateCallLogDto[];
}
