import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { AppGateway } from './app.gateway';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appGateway: AppGateway,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'images');
        },
        filename: (req, file, cb) => {
          cb(null, `${uuidv4()}.png`);
        },
      }),
    }),
  )
  uploadImage(
    @Body() body: { id: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    const _file = readFileSync(file.path).toString('base64');
    const checkResult = this.appService.checkImage(file.path);
    if (checkResult) {
      this.appGateway.clientIdClientMapping[body.id].send(`image|${_file}`);
    }

    return true;
  }
}
