import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SmsLog } from './entities/sms-log.entity';
import {
  CreateSmsLogDto,
  BatchCreateSmsLogDto,
} from './dto/create-sms-log.dto';

@Injectable()
export class SmsLogsService {
  constructor(
    @InjectRepository(SmsLog)
    private smsLogRepository: Repository<SmsLog>,
  ) {}

  async create(createSmsLogDto: CreateSmsLogDto): Promise<SmsLog> {
    const { timestamp, ...rest } = createSmsLogDto;
    const smsLog = this.smsLogRepository.create({
      ...rest,
      timestamp: new Date(timestamp),
    });
    return this.smsLogRepository.save(smsLog);
  }

  async batchCreate(batchCreateDto: BatchCreateSmsLogDto): Promise<SmsLog[]> {
    if (batchCreateDto.smsLogs && batchCreateDto.smsLogs.length > 0) {
      const smsLogEntities = batchCreateDto.smsLogs.map((dto) => {
        const { timestamp, ...rest } = dto;
        return this.smsLogRepository.create({
          ...rest,
          timestamp: new Date(timestamp),
        });
      });
      return this.smsLogRepository.save(smsLogEntities);
    }
    return [];
  }

  async findAll(userId?: string): Promise<SmsLog[]> {
    if (userId) {
      return this.smsLogRepository.find({
        where: { userId },
        order: { timestamp: 'DESC' },
      });
    }
    return this.smsLogRepository.find({
      order: { timestamp: 'DESC' },
    });
  }

  async findOne(userId: string, id: number): Promise<SmsLog | null> {
    return this.smsLogRepository.findOne({ where: { userId, id } });
  }

  async findByUser(userId: string, limit?: number): Promise<SmsLog[]> {
    return this.smsLogRepository.find({
      where: { userId },
      order: { timestamp: 'DESC' },
      take: limit,
    });
  }
}
