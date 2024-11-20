import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServicesDto } from 'src/dto/service.dto';

@Controller('service')
export class ServiceController {
    constructor(private readonly allservice: ServiceService) {}

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
