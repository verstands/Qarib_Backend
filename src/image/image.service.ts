import { Injectable } from '@nestjs/common';
import { url } from 'inspector';
import { ImageDto } from 'src/dto/image.dto';
import { PrismaService } from 'src/prisma.service';
import { hash, compare } from 'bcrypt';

@Injectable()
export class ImageService {
    constructor(private readonly prismaservice: PrismaService) {}

    async getAll() {
      const getall = await this.prismaservice.images.findMany({
        orderBy : {
          id : "desc"
        },
      });
      return { data: getall };
    }
  
    async getFind({ id }: { id: string }) {
    const baseUrl = 'http://185.182.186.58:4005/uploads';
      const images = await this.prismaservice.images.findMany({
        where: {
          id_user: id,
        },
        orderBy: {
          created_at: 'asc',
        },
      });
    
      const secondImage = images.slice(1);
      const imagesWithBaseUrl = secondImage.map(image => ({
        ...image,
        url: `${baseUrl}/${image.url}`, // Concatène le baseUrl avec l'URL de l'image
      }));
    
      return { data: imagesWithBaseUrl };
    }

    async getFindDescription({ id }: { id: string }) {
        const description = await this.prismaservice.descriptions.findMany({
          where: {
            id_user: id,
          },
          orderBy: {
            created_at: 'asc',
          },
        });
        const firstDescription = description[0]; 
      
        return { data: firstDescription };
      }
    
      async updateDescription({ id, message }: { id: string , message: string}) {
        const updatedAgent = await this.prismaservice.descriptions.update({
          where: {
            id,
          },
          data: {
            message : message
          },
        });
        return updatedAgent;
      }
      
    async update({ id, ...agentUpdate }: { id: string } & ImageDto) {
      const updatedAgent = await this.prismaservice.images.update({
        where: {
          id,
        },
        data: {
          ...agentUpdate,
        },
      });
      return updatedAgent;
    }
  
    async delete({ id }: { id: string }) {
      await this.prismaservice.images.delete({
        where: {
          id,
        },
      });
      return { message: 'image supprimé avec success ' };
    }

    private async hasPassword(password: string) {
        const hashedPassword = await hash(password, 10);
        return hashedPassword;
      }
  
    async create(dataall: ImageDto, files: Express.Multer.File[]) {
      const hashedPassword = await this.hasPassword(dataall.password);
      const prestataire = await this.prismaservice.agents.create({
        data: {
          statut: dataall.status,
          noms: dataall.noms,
          telephone: dataall.telephone,
          password: hashedPassword,
          id_role: dataall.id_role,
          latitude: "1",
          longitude: "1",
          id_ville: dataall.id_ville,
          email: dataall.email,
        },
      }); 

      const images = await Promise.all(
        files.map(file => this.prismaservice.images.create({
          data: {
            status: dataall.status,
            url: file.filename,
            id_user: prestataire.id
          }
        }))
      );
    
      const createDescription = await this.prismaservice.descriptions.create({
        data: {
          status: dataall.status,
          message: dataall.message,
          id_user: prestataire.id
        },
      }); 


      const createServices = await Promise.all(
        dataall.services.map(serviceId => this.prismaservice.serviceUsers.create({
          data: {
            id_user: prestataire.id,
            id_service: serviceId,
          }
        }))
      );
    
     return { images, description: createDescription };
    }


    async createImageOne(iduser: string, status: string, file: Express.Multer.File) {
      const image = await this.prismaservice.images.create({
        data: {
          status: status,
          url: file.filename, 
          id_user: iduser,
        },
      });
    
      return { image };
    }
    

    async getFindDemade({ id }: { id: string }) {
      const description = await this.prismaservice.notifications.findMany({
        where: {
          recev_notification: id,
        },
        include :  {
          recevnotification : true
        },
        orderBy: {
          created_at: 'desc',
        },
      });
      const firstDescription = description[0]; 
    
      return { data: firstDescription };
    }
    
}
