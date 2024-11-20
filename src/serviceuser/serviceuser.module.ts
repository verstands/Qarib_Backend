import { Module } from '@nestjs/common';
import { ServiceuserService } from './serviceuser.service';
import { ServiceuserController } from './serviceuser.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ServiceuserService, PrismaService],
  controllers: [ServiceuserController]
})
export class ServiceuserModule {}
