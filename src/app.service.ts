import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  checkImage(path: string) {
    // cooles OCR-Zeugs machen
    return true;
  }
}
