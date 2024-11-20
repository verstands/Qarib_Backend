import { Injectable } from '@nestjs/common';
import { ProblemeDto } from 'src/dto/probleme';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProblemeService {
    constructor(private readonly prismaservice: PrismaService) {}

    async getAll() {
      const getall = await this.prismaservice.problemes.findMany({
        orderBy : {
          id : "desc"
        },
      });
      return { data: getall };
    }
  
    async getFind({ id }: { id: string }) {
      const getid = await this.prismaservice.problemes.findUnique({
        where: {
          id,
        },
      });
      return { data: getid };
    }
  
    async update({ id, ...agentUpdate }: { id: string } & ProblemeDto) {
      const updatedAgent = await this.prismaservice.problemes.update({
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
      await this.prismaservice.problemes.delete({
        where: {
          id,
        },
      });
      return { message: 'supprimé avec success ' };
    }
  
    async create(dataall: ProblemeDto) {
      const createAgent = await this.prismaservice.problemes.create({
        data:  dataall
      });
      return createAgent;
    }
}
