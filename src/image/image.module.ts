import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ImageService, PrismaService],
  controllers: [ImageController]
})
export class ImageModule {}
