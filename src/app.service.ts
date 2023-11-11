import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  live(): { status: boolean } {
    return { status: true };
  }
}
