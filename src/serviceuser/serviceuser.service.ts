import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ServiceUsersDto } from 'src/dto/serviceuser.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ServiceuserService {
    constructor(
      private readonly prismaservice: PrismaService,
      private readonly jwtService: JwtService,
  ) {}

    async getAll() {
      const getall = await this.prismaservice.serviceUsers.findMany({
        orderBy : {
          id : "desc"
        },
      });
      return { data: getall };
    }
    async getAllUser(id : string) {
      const getall = await this.prismaservice.serviceUsers.findMany({
        orderBy : {
          id : "desc"
        },
      });
      return { data: getall };
    }

    async getCountAllService(id : string) {
      const countservice = await this.prismaservice.serviceUsers.count({
        where : {
          id_user : id
        },
        orderBy : {
          id : "desc"
        },
      });

      return { data: countservice };
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
      const verify = await this.prismaservice.serviceUsers.findFirst({
        where : {
          id_service : dataall.id_service,
          id_user : dataall.id_user
        }
      })
      if(verify){
        throw new HttpException("Cette service existe déjà", HttpStatus.CONFLICT);
      }
      const createAgent = await this.prismaservice.serviceUsers.create({
        data:  dataall
      });
      return createAgent;
    }
}
