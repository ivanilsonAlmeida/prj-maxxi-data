import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  statusSystem(): string {
    return 'Back-End working!';
  }
}
