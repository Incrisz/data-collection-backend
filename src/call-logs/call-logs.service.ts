import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CallLog } from './entities/call-log.entity';
import { CreateCallLogDto } from './dto/create-call-log.dto';

@Injectable()
export class CallLogsService {
  constructor(
    @InjectRepository(CallLog)
    private callLogRepository: Repository<CallLog>,
  ) {}

  // Call Log methods
  async createCallLog(
    createCallLogDtos: CreateCallLogDto[],
  ): Promise<CallLog[]> {
    const callLogs = createCallLogDtos.map((dto) => {
      const { timestamp, ...rest } = dto;
      return this.callLogRepository.create({
        ...rest,
        timestamp: new Date(timestamp),
      });
    });
    return this.callLogRepository.save(callLogs);
  }

  async findAllCallLogs(
    userId?: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<CallLog[]> {
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

    return this.callLogRepository.find({
      where,
      order: { timestamp: 'DESC' },
    });
  }

  async findByUser(userId: string, limit?: number): Promise<CallLog[]> {
    return this.callLogRepository.find({
      where: { userId },
      order: { timestamp: 'DESC' },
      take: limit,
    });
  }

  async findOne(userId: string, id: number): Promise<CallLog | null> {
    return this.callLogRepository.findOne({ where: { userId, id } });
  }
}
