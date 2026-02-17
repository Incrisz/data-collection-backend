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

export class CreateSmsLogDto {
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
    description: 'The direction of the SMS',
    example: 'sent',
  })
  @IsString()
  direction: string;

  @ApiProperty({ description: 'Sync status', example: 1 })
  @IsNumber()
  @IsOptional()
  synced?: number;

  @ApiProperty({
    description: 'The length of the SMS message body',
    example: 6,
  })
  @IsNumber()
  length: number;

  @ApiProperty({
    description: 'The SHA-256 hash of the contact phone number',
    example: '385201775',
  })
  @IsString()
  @IsNotEmpty()
  contact_hash: string;

  @ApiProperty({
    description: 'The time the SMS occurred (ISO string)',
    example: '2026-02-08T19:41:00.000Z',
  })
  @IsDateString()
  timestamp: string;
}

export class BatchCreateSmsLogDto {
  @ApiProperty({
    type: [CreateSmsLogDto],
    description: 'An array of SMS logs for batch upload',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSmsLogDto)
  smsLogs: CreateSmsLogDto[];
}
