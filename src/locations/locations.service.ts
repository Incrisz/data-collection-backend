import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async create(createLocationDtos: CreateLocationDto[]): Promise<Location[]> {
    const locations = createLocationDtos.map((dto) => {
      const { timestamp, ...rest } = dto;
      return this.locationRepository.create({
        ...rest,
        timestamp: new Date(timestamp),
      });
    });
    return this.locationRepository.save(locations);
  }

  async findAll(
    userId?: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<Location[]> {
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

    return this.locationRepository.find({
      where,
      order: { timestamp: 'DESC' },
    });
  }

  async findOne(userId: string, id: number): Promise<Location | null> {
    return this.locationRepository.findOne({ where: { userId, id } });
  }

  async findByUser(userId: string, limit?: number): Promise<Location[]> {
    return this.locationRepository.find({
      where: { userId },
      order: { timestamp: 'DESC' },
      take: limit,
    });
  }

  async findByUserAndDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Location[]> {
    return this.locationRepository.find({
      where: {
        userId,
        timestamp: Between(startDate, endDate),
      },
      order: { timestamp: 'ASC' },
    });
  }
}
