import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationsDto } from 'src/dto/Notification.dto';

@Controller('notification')
export class NotificationController {
    constructor(private readonly allservice: NotificationService) {}
    
        @Get()
        get() {
          return this.allservice.getAll();
        }
      
        @Get(':id')
        getFindOne(@Param('id') id: string) {
          return this.allservice.getFind({
            id,
          });
        }
      
        // @Put(':id')
        // update(@Param('id') id: string, @Body() agentUpdate: RoleDto) {
        //   return this.allservice.update({ id, ...agentUpdate });
        // }
      
        @Delete(':id')
        delete(@Param('id') id: string) {
          return this.allservice.delete({ id });
        }
      
        @Post()
        async create(@Body() agendadto: NotificationsDto) {
          return await this.allservice.create(agendadto);
        }
}
