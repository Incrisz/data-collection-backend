import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('sms_logs')
export class SmsLog {
  @ApiProperty({ example: 1 })
  @PrimaryColumn()
  id: number;

  @ApiProperty({ example: 'user_123' })
  @PrimaryColumn()
  userId: string;

  @ApiProperty({ example: 'sent' })
  @Column()
  direction: string;

  @ApiProperty({ example: 1 })
  @Column({ default: 1 })
  synced: number;

  @ApiProperty({ example: 6 })
  @Column()
  length: number;

  @ApiProperty({ example: '385201775' })
  @Column()
  contact_hash: string;

  @ApiProperty({ example: '2026-02-08T19:41:00.000Z' })
  @Column({ type: 'timestamp' })
  timestamp: Date;
}
