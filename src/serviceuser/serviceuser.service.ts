import { Injectable } from '@nestjs/common';
import { ServiceUsersDto } from 'src/dto/serviceuser.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ServiceuserService {
    constructor(private readonly prismaservice: PrismaService) {}

    async getAll() {
      const getall = await this.prismaservice.serviceUsers.findMany({
        orderBy : {
          id : "desc"
        },
      });
      return { data: getall };
    }
  
    async getFind({ id }: { id: string }) {
      const getid = await this.prismaservice.serviceUsers.findUnique({
        where: {
          id,
        },
      });
      return { data: getid };
    }
  
    async update({ id, ...agentUpdate }: { id: string } & ServiceUsersDto) {
      const updatedAgent = await this.prismaservice.serviceUsers.update({
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
      await this.prismaservice.serviceUsers.delete({
        where: {
          id,
        },
      });
      return { message: 'villes supprimé avec success ' };
    }
  
    async create(dataall: ServiceUsersDto) {
      const createAgent = await this.prismaservice.serviceUsers.create({
        data:  dataall
      });
      return createAgent;
    }
}
