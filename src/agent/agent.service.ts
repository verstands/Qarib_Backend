import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AgentInterface } from 'src/dto/agent.dto';
import { PrismaService } from 'src/prisma.service';
import { hash, compare } from 'bcrypt';
import { UserGateway } from './gateway';
import { OtpAgentDto } from 'src/dto/otpagent';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AgentService {
  constructor(
    private readonly prismaservice: PrismaService,
    private readonly mailerService: MailerService,
    @Inject(forwardRef(() => UserGateway)) private readonly userGateway: UserGateway,
  ) { }

  async getAgents() {
    const agents = await this.prismaservice.agents.findMany({

      orderBy: {
        id: "desc"
      },
    });
    return { data: agents };
  }
 


  async getUsersPosition({ id }: { id: string }) {
    try {
      const agents = await this.prismaservice.agents.findMany({
        where  : {
          NOT : {
            id :id,
          },
          statut :"1"
        },
        select: {
          id: true,
          noms: true,
          latitude: true,
          longitude: true,
          ServiceUser: {
            select: {
              service: {
                select: {
                  id: true,
                  titre: true,
                },
              },
            },
          },
        },
      });
  
      return agents
        .filter(agent => agent.latitude !== null && agent.longitude !== null) // Vérifie que les coordonnées sont valides
        .map(agent => ({
          userId: agent.id.toString(),
          latitude: agent.latitude,
          longitude: agent.longitude,
          nom: agent.noms,
          services: agent.ServiceUser.map(serviceUser => ({
            serviceId: serviceUser.service.id.toString(),
            serviceName: serviceUser.service.titre,
          })),
        }));
    } catch (error) {
      console.error('Erreur lors de la récupération des positions des agents:', error);
      throw new Error('Impossible de récupérer les positions des agents');
    }
  }

  async getUsersPositionService({ id, idservice }: { id: string, idservice: string }) {
    try {
      const agents = await this.prismaservice.serviceUsers.findMany({
        where  : {
         id_service : idservice,
         user: {
          NOT: {
            id: id,
          },
          statut : "1"
        },
        },
        include : {
          user: {
            select: {
              id: true,
              latitude: true,
              longitude: true,
              noms: true,
            },
          },
          service: {
            select: {
              id: true,
              titre: true,
            },
          },
        }
      });
  
      return agents
      .filter(agent => agent.user?.latitude !== null && agent.user?.longitude !== null) // Vérifie que les coordonnées sont valides
      .map(agent => ({
        userId: agent.user.id.toString(),
        latitude: agent.user.latitude,
        longitude: agent.user.longitude,
        nom: agent.user.noms,
        services: [
          {
            serviceId: agent.service.id.toString(),
            serviceName: agent.service.titre,
          },
        ],
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des positions des agents:', error);
      throw new Error('Impossible de récupérer les positions des agents');
    }
  }
  
  
  

  async updateUserPosition(userId: string, latitude: string, longitude: string) {
    const updatedAgent = await this.prismaservice.agents.update({
      where: { id: userId },
      data: { latitude : latitude, longitude : longitude },
    });
    this.userGateway.emitUserPositionChange();
    return updatedAgent; 
  }
  
  

  async getAgent({ id }: { id: string }) {
    const agent = await this.prismaservice.agents.findUnique({
      where: {
        id,
      },
    });
    return { data: agent };
  }

  async updateAgent({ id, ...agentUpdate }: { id: string } & AgentInterface) {
    const updatedAgent = await this.prismaservice.agents.update({
      where: {
        id,
      },
      data: {
        ...agentUpdate,
      },
    });
    return updatedAgent;
  }

  async deleteAgent({ id }: { id: string }) {
    //await this.prismaservice.fonctions.deleteMany({
    // where : {
    // agents : id
    //}
    //})
    await this.prismaservice.agents.delete({
      where: {
        id,
      },
    });
    return { message: 'Agent supprimé avec success ' };
  }

  async create(dataall: AgentInterface) {
    dataall.latitude = dataall.latitude;
    dataall.longitude = dataall.longitude;
    const existeEmail = await this.prismaservice.agents.findUnique({
      where: {
        email: dataall.email,
      },
    });
    if (existeEmail) {
      throw new HttpException("Email existe déjà !", HttpStatus.CONFLICT);
    }
    const hashedPassword = await this.hasPassword(dataall.password);
    const createAgent = await this.prismaservice.agents.create({
      data: {
        ...dataall,
        password: hashedPassword,
      },
    });

    return { createAgent, id: createAgent.id };
  }

  async verifyCount(dataall: AgentInterface) {
    const existeEmail = await this.prismaservice.agents.findUnique({
      where: {
        email: dataall.email,
      },
    });
    if (existeEmail) {
      throw new HttpException("Email existe déjà !", HttpStatus.CONFLICT);
    } else {
      throw new HttpException("compte n'existe pas!", HttpStatus.ACCEPTED);
    }
  }

  private async hasPassword(password: string) {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  }

  generateOTP(): string {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
  }

  async Otpmail(data: OtpAgentDto) {
    const otp = this.generateOTP();
    // await this.mailerService.sendMail({ 
    //     to: data.email,
    //     subject: 'Code Otp',
    //     html: `
    // <h1>Bienvenue chez Mon Qarib !</h1>
    // <p>Bonjour ${data.noms},</p>
    // <p>Avant de créer votre compte, nous devons vérifier votre identité. Pour cela, nous vous envoyons un code de vérification à 6 chiffres. Voici votre code OTP :</p>
    // <h2 style="font-size: 24px; color: #007bff;">${otp}</h2>
    // <p>Veuillez saisir ce code sur notre plateforme pour valider votre identité.</p>
    // <p>Si vous n'avez pas demandé cette action, vous pouvez ignorer cet e-mail.</p>
    // <p>Si vous avez des questions, notre équipe est à votre disposition pour vous aider.</p>
    // <p>Cordialement,</p>
    // <p>L'équipe Qarib</p>
    // `
    // });
    console.log('code', otp)
    return { message: `code envoyé`, code: otp }; 
  }

}
