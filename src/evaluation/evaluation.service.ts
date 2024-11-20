import { Injectable } from '@nestjs/common';
import { EvaluationDto } from 'src/dto/evaluation.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EvaluationService {
    constructor(private readonly prismaservice: PrismaService) {}

    async getAll() {
      const getall = await this.prismaservice.evaluations.findMany({
        orderBy : {
          id : "desc"
        },
      });
      return { data: getall };
    }
  
    async getFind({ id }: { id: string }) {
      const getid = await this.prismaservice.evaluations.findUnique({
        where: {
          id,
        },
      });
      return { data: getid };
    }
  
    async update({ id, ...agentUpdate }: { id: string } & EvaluationDto) {
      const updatedAgent = await this.prismaservice.evaluations.update({
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
      await this.prismaservice.evaluations.delete({
        where: {
          id,
        },
      });
      return { message: 'image supprimé avec success ' };
    }
  
    async create(dataall: EvaluationDto) {
      const createAgent = await this.prismaservice.evaluations.create({
        data:  dataall
      });
      return createAgent;
    }
}
