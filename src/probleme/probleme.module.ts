import { Module } from '@nestjs/common';
import { ProblemeService } from './probleme.service';
import { ProblemeController } from './probleme.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ProblemeService, PrismaService],
  controllers: [ProblemeController]
})
export class ProblemeModule {}
