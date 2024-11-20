import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProblemeService } from './probleme.service';
import { ProblemeDto } from 'src/dto/probleme';

@Controller('probleme')
export class ProblemeController {
    constructor(private readonly allservice: ProblemeService) {}

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
    update(@Param('id') id: string, @Body() agentUpdate: ProblemeDto) {
      return this.allservice.update({ id, ...agentUpdate });
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.allservice.delete({ id });
    }
  
    @Post()
    async create(@Body() agendadto: ProblemeDto) {
      return await this.allservice.create(agendadto);
    }
}
