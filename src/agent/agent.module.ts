import { Module } from '@nestjs/common';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { PrismaService } from 'src/prisma.service';
import { UserGateway } from './gateway';

@Module({
  controllers: [AgentController],
  providers: [AgentService, PrismaService, UserGateway],
})
export class AgentModule {}
