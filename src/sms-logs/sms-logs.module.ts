import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsLogsService } from './sms-logs.service';
import { SmsLogsController } from './sms-logs.controller';
import { SmsLog } from './entities/sms-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SmsLog])],
  controllers: [SmsLogsController],
  providers: [SmsLogsService],
  exports: [SmsLogsService],
})
export class SmsLogsModule {}
