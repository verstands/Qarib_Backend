import { Injectable } from '@nestjs/common';
import { FavoriDto } from 'src/dto/favori.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoriService {
    constructor(private readonly prismaservice: PrismaService) {}
    
        async getAll() {
          const getall = await this.prismaservice.favorieUsers.findMany({
            orderBy : {
              id : "desc"
            },
          });
          return { data: getall };
        }
      
        async getFind({ id }: { id: string }) {
          const getid = await this.prismaservice.favorieUsers.findUnique({
            where: {
              id,
            },
          });
          return { data: getid };
        }

        async getServiceUser({ id }: { id: string }) {
            const getid = await this.prismaservice.favorieUsers.findMany({
              where: {
                id_user : id,
              },
            });
            return { data: getid };
          }
      
        async update({ id, ...agentUpdate }: { id: string } & FavoriDto) {
          const updatedAgent = await this.prismaservice.favorieUsers.update({
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
          await this.prismaservice.favorieUsers.delete({
            where: {
              id,
            },
          });
          return { message: 'image supprimé avec success ' };
        }
      
        async create(dataall: FavoriDto) {
          const createAgent = await this.prismaservice.favorieUsers.create({
            data:  dataall
          });
          return createAgent;
        }
}
