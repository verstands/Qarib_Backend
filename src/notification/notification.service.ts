import { Injectable } from '@nestjs/common';
import { NotificationsDto } from 'src/dto/Notification.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotificationService {
   
      constructor(private readonly prismaservice: PrismaService) {}
      
          async getAll() {
            const getall = await this.prismaservice.notifications.findMany({
              orderBy : {
                id : "desc"
              },
            });
            return { data: getall };
          }
        
          async getFind({ id }: { id: string }) {
            const getid = await this.prismaservice.notifications.findUnique({
              where: {
                id,
              },
            });
            return { data: getid };
          }
        
        
          async delete({ id }: { id: string }) {
            await this.prismaservice.notifications.delete({
              where: {
                id,
              },
            });
            return { message: 'image supprimé avec success ' };
          }
        
          async create(dataall : NotificationsDto) {
            const prestataire = await this.prismaservice.notifications.create({
              data: dataall,
            }); 
      
           return { dataall };
          }
    
}
