import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('call_logs')
export class CallLog {
  @ApiProperty({ example: 1 })
  @PrimaryColumn()
  id: number;

  @ApiProperty({ example: 'user_123' })
  @PrimaryColumn()
  userId: string;

  @ApiProperty({ example: '2026-01-14T11:28:10.219Z' })
  @Column({ type: 'timestamp' })
  timestamp: Date;

  @ApiProperty({ example: 'INCOMING' })
  @Column()
  direction: string;

  @ApiProperty({ example: 'INCOMING' })
  @Column({ nullable: true })
  status: string;

  @ApiProperty({ example: 23 })
  @Column()
  duration: number;

  @ApiProperty({ example: '464472654' })
  @Column()
  contact_hash: string;

  @ApiProperty({ example: 1 })
  @Column({ default: 1 })
  synced: number;
}
