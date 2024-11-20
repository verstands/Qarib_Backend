import { Injectable } from '@nestjs/common';
import { ImageDto } from 'src/dto/image.dto';
import { PrismaService } from 'src/prisma.service';

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
      const getid = await this.prismaservice.images.findUnique({
        where: {
          id,
        },
      });
      return { data: getid };
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
  
    async create(dataall: ImageDto) {
      const createAgent = await this.prismaservice.images.create({
        data:  dataall
      });
      return createAgent;
    }
}
