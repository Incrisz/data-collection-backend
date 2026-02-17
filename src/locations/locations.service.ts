import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Location } from './entities/location.entity';
import {
  CreateLocationDto,
  BatchCreateLocationDto,
} from './dto/create-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const { timestamp, ...rest } = createLocationDto;
    const location = this.locationRepository.create({
      ...rest,
      timestamp: new Date(timestamp),
    });
    return this.locationRepository.save(location);
  }

  async batchCreate(
    batchCreateDto: BatchCreateLocationDto,
  ): Promise<Location[]> {
    const locations = batchCreateDto.locations.map((dto) => {
      const { timestamp, ...rest } = dto;
      return this.locationRepository.create({
        ...rest,
        timestamp: new Date(timestamp),
      });
    });
    return this.locationRepository.save(locations);
  }

  async findAll(userId?: string): Promise<Location[]> {
    if (userId) {
      return this.locationRepository.find({
        where: { userId },
        order: { timestamp: 'DESC' },
      });
    }
    return this.locationRepository.find({
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
