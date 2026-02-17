import { Module } from '@nestjs/common';
import { ExternalTrackingController } from './external.controller';
import { LocationsModule } from '../locations/locations.module';
import { CallLogsModule } from '../call-logs/call-logs.module';
import { SmsLogsModule } from '../sms-logs/sms-logs.module';

@Module({
  imports: [LocationsModule, CallLogsModule, SmsLogsModule],
  controllers: [ExternalTrackingController],
})
export class ExternalModule {}
