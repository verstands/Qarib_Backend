import { Module } from '@nestjs/common';
import { AgentModule } from './agent/agent.module';
import { AuthModule } from './auth/auth.module';
import { PharmacieModule } from './pharmacie/pharmacie.module';
import { ProduitModule } from './produit/produit.module';
import { PaysModule } from './pays/pays.module';
import { VilleModule } from './ville/ville.module';
import { LoggingModule } from './logging/logging.module';
import { CommuneModule } from './commune/commune.module';
import { QuartierModule } from './quartier/quartier.module';
import { CarouselModule } from './carousel/carousel.module';
import { RoleModule } from './role/role.module';
import { ImageModule } from './image/image.module';
import { ServiceModule } from './service/service.module';
import { ServiceuserModule } from './serviceuser/serviceuser.module';
import { LogdataModule } from './logdata/logdata.module';
import { ProblemeModule } from './probleme/probleme.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { NotificationModule } from './notification/notification.module';


@Module({
  imports: [
    AgentModule,
    AuthModule,
    VilleModule,
    PharmacieModule,
    ProduitModule,
    PaysModule,
    LoggingModule,
    CommuneModule,
    QuartierModule,
    CarouselModule,
    RoleModule,
    ImageModule,
    ServiceModule,
    ServiceuserModule,
    LogdataModule,
    ProblemeModule,
    EvaluationModule,
    NotificationModule
  ],
})
export class AppModule {}
