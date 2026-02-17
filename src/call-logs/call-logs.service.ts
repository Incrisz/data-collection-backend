import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallLog } from './entities/call-log.entity';
import {
  CreateCallLogDto,
  BatchCreateCallLogDto,
} from './dto/create-call-log.dto';

@Injectable()
export class CallLogsService {
  constructor(
    @InjectRepository(CallLog)
    private callLogRepository: Repository<CallLog>,
  ) {}

  // Call Log methods
  async createCallLog(createCallLogDto: CreateCallLogDto): Promise<CallLog> {
    const { timestamp, ...rest } = createCallLogDto;
    const callLog = this.callLogRepository.create({
      ...rest,
      timestamp: new Date(timestamp),
    });
    return this.callLogRepository.save(callLog);
  }

  async findAllCallLogs(userId?: string): Promise<CallLog[]> {
    if (userId) {
      return this.callLogRepository.find({
        where: { userId },
        order: { timestamp: 'DESC' },
      });
    }
    return this.callLogRepository.find({
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

  // Batch upload method
  async batchCreate(batchCreateDto: BatchCreateCallLogDto): Promise<CallLog[]> {
    if (batchCreateDto.callLogs && batchCreateDto.callLogs.length > 0) {
      const callLogEntities = batchCreateDto.callLogs.map((dto) => {
        const { timestamp, ...rest } = dto;
        return this.callLogRepository.create({
          ...rest,
          timestamp: new Date(timestamp),
        });
      });
      return this.callLogRepository.save(callLogEntities);
    }
    return [];
  }
}
