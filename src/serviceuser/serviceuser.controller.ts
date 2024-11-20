import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ServiceUsersDto } from 'src/dto/serviceuser.dto';
import { VilleService } from 'src/ville/ville.service';
import { ServiceuserService } from './serviceuser.service';

@Controller('serviceuser')
export class ServiceuserController {
    constructor(private readonly allservice: ServiceuserService) {}

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
  update(@Param('id') id: string, @Body() agentUpdate: ServiceUsersDto) {
    return this.allservice.update({ id, ...agentUpdate });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.allservice.delete({ id });
  }

  @Post()
  async create(@Body() agendadto: ServiceUsersDto) {
    return await this.allservice.create(agendadto);
  }
}
