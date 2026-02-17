import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('locations')
export class Location {
  @ApiProperty({ example: 1106 })
  @PrimaryColumn()
  id: number;

  @ApiProperty({ example: 'user_123' })
  @PrimaryColumn()
  userId: string;

  @ApiProperty({ example: 9.0272201 })
  @Column('decimal', { precision: 10, scale: 6 })
  latitude: number;

  @ApiProperty({ example: 7.4882057 })
  @Column('decimal', { precision: 10, scale: 6 })
  longitude: number;

  @ApiProperty({ example: 45.5999 })
  @Column('float', { nullable: true })
  accuracy: number;

  @ApiProperty({ example: 1 })
  @Column({ default: 1 })
  synced: number;

  @ApiProperty({ example: '2026-02-09T10:00:00Z' })
  @Column({ type: 'timestamp' })
  timestamp: Date; // The time the location was captured
}
