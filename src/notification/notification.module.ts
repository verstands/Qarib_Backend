import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [NotificationGateway, PrismaService, NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}