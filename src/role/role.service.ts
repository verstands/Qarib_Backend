import { Injectable } from '@nestjs/common';
import { RoleDto } from 'src/dto/role';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoleService {
    constructor(private readonly prismaservice: PrismaService) {}

    async getAll() {
      const getall = await this.prismaservice.roles.findMany({
        orderBy : {
          id : "desc"
        },
      });
      return { data: getall };
    }
  
    async getFind({ id }: { id: string }) {
      const getid = await this.prismaservice.roles.findUnique({
        where: {
          id,
        },
      });
      return { data: getid };
    }
  
    async update({ id, ...agentUpdate }: { id: string } & RoleDto) {
      const updatedAgent = await this.prismaservice.roles.update({
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
      await this.prismaservice.roles.delete({
        where: {
          id,
        },
      });
      return { message: 'villes supprimé avec success ' };
    }
  
    async create(dataall: RoleDto) {
      const createAgent = await this.prismaservice.roles.create({
        data:  dataall
      });
      return createAgent;
    }
}
