import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FavoriDto } from 'src/dto/favori.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoriService {
  constructor(private readonly prismaservice: PrismaService) { }

  async getAll() {
    const getall = await this.prismaservice.favorieUsers.findMany({
      orderBy: {
        id: "desc"
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
        id_user: id,
      },
      include: {
        user: true,
        service: true
      }
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
    const favori = await this.prismaservice.favorieUsers.findUnique({
      where: { id },
    });
  
    if (!favori) {
      throw new HttpException("Le favori n'existe pas", HttpStatus.NOT_FOUND);
    }
   
    await this.prismaservice.favorieUsers.delete({
      where: { id },
    });
  
    return { message: "Service retiré des favoris avec succès" };
  }
  
  async create(dataall: FavoriDto) {
    const existingFavori = await this.prismaservice.favorieUsers.findFirst({
      where: {
        id_user: dataall.id_user,
        id_service: dataall.id_service
      }
    });
  
    if (existingFavori) {
      throw new HttpException("Ce service se trouve déjà dans vos favoris", HttpStatus.CONFLICT);
    } else {
      const createdFavori = await this.prismaservice.favorieUsers.create({
        data: dataall
      });
      return createdFavori;
    }
  }
  
}
