import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { SmsLog } from './entities/sms-log.entity';
import { CreateSmsLogDto } from './dto/create-sms-log.dto';

@Injectable()
export class SmsLogsService {
  constructor(
    @InjectRepository(SmsLog)
    private smsLogRepository: Repository<SmsLog>,
  ) {}

  async create(createSmsLogDtos: CreateSmsLogDto[]): Promise<SmsLog[]> {
    const smsLogs = createSmsLogDtos.map((dto) => {
      const { timestamp, ...rest } = dto;
      return this.smsLogRepository.create({
        ...rest,
        timestamp: new Date(timestamp),
      });
    });
    return this.smsLogRepository.save(smsLogs);
  }

  async findAll(
    userId?: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<SmsLog[]> {
    const where: any = {};
    if (userId) {
      where.userId = userId;
    }
    if (startDate || endDate) {
      const startOfDay = startDate ? new Date(startDate) : new Date(0);
      if (startDate) startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = endDate ? new Date(endDate) : new Date();
      if (endDate) endOfDay.setHours(23, 59, 59, 999);

      where.timestamp = Between(startOfDay, endOfDay);
    }

    return this.smsLogRepository.find({
      where,
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
