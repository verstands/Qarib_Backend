import { Injectable } from '@nestjs/common';
import { ServicesDto } from 'src/dto/service.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class ServiceService {
    constructor(private readonly prismaservice: PrismaService) {}

    async getAll() {
      const getall = await this.prismaservice.services.findMany({
        orderBy : {
          id : "desc"
        },
      });
      return { data: getall };
    }
  
    async getFind({ id }: { id: string }) {
      const getid = await this.prismaservice.services.findUnique({
        where: {
          id,
        },
      });
      return { data: getid };
    }

    async getServiceByUser({ id }: { id: string }) {
      const getid = await this.prismaservice.serviceUsers.findMany({
        where: {
          id_service : id
        },
        include : {
          user : true,
          service : true
        }
      });
      return { data: getid };
    }

    async getServiceByUserAll() {
      const getid = await this.prismaservice.serviceUsers.findMany({
        include : {
          user : true,
          service : true
        }
      });
      return { data: getid };
    }
  
    async update({ id, ...agentUpdate }: { id: string } & ServicesDto) {
      const updatedAgent = await this.prismaservice.services.update({
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
      await this.prismaservice.services.delete({
        where: {
          id,
        },
      });
      return { message: 'villes supprimé avec success ' };
    }
  
    async create(dataall: ServicesDto) {
      const createAgent = await this.prismaservice.services.create({
        data:  dataall
      });
      return createAgent;
    }
}
