import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    const path = request.path || request.route?.path || '';

    let validApiKey: string;

    if (path.includes('/external')) {
      validApiKey =
        this.configService.get<string>('EXTERNAL_TRACKING_API_KEY') || '';
    } else {
      validApiKey = this.configService.get<string>('TRACKING_API_KEY') || '';
    }

    if (!apiKey || apiKey !== validApiKey) {
      throw new UnauthorizedException('Invalid or missing API Key');
    }

    return true;
  }
}
