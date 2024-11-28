import { Module } from '@nestjs/common';
import { AgentModule } from './agent/agent.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { ImageModule } from './image/image.module';
import { ServiceModule } from './service/service.module';
import { ServiceuserModule } from './serviceuser/serviceuser.module';
import { LogdataModule } from './logdata/logdata.module';
import { ProblemeModule } from './probleme/probleme.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { NotificationModule } from './notification/notification.module';
import { VilleModule } from './ville/ville.module';


@Module({
  imports: [
    AgentModule,
    AuthModule,
    RoleModule,
    ImageModule,
    ServiceModule,
    ServiceuserModule,
    LogdataModule,
    ProblemeModule,
    EvaluationModule,
    NotificationModule,
    VilleModule
  ],
})
export class AppModule {}
