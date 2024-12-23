import { Module, forwardRef } from '@nestjs/common';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { PrismaService } from 'src/prisma.service';
import { UserGateway } from './gateway'; 
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [],
  controllers: [AgentController],
  providers: [
    AgentService,
    PrismaService,
    MailService,
    UserGateway, // Ajoutez UserGateway ici sans forwardRef
  ],
  exports: [AgentService, UserGateway], // Exportez UserGateway si nécessaire
})
export class AgentModule {}