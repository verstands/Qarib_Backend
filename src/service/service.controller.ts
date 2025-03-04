import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServicesDto } from 'src/dto/service.dto';

@Controller('service')
export class ServiceController {
    constructor(private readonly allservice: ServiceService) {}

    @Get(':id')
    get(@Param('id') id: string) {
      return this.allservice.getAll({
        id,
      });
    }
  
    @Get('categorie/categorie')
    getCatgorie() {
      return this.allservice.getFind();
    }

    @Get('servicebyuser/:id')
    getServiceByUser(@Param('id') id: string) {
      return this.allservice.getServiceByUser({
        id,
      });
    }

    @Get('servicebyuserAll/servicebyuserAll/:id')
    getServiceByUserAll(@Param('id') id: string) {
      return this.allservice.getServiceByUserAll({id});
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() agentUpdate: ServicesDto) {
      return this.allservice.update({ id, ...agentUpdate });
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.allservice.delete({ id });
    }
  
    @Post()
    async create(@Body() agendadto: ServicesDto) {
      return await this.allservice.create(agendadto);
    }
}
