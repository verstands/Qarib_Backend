import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from 'src/dto/role';

@Controller('role')
export class RoleController {
    constructor(private readonly allservice: RoleService) {}

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
    update(@Param('id') id: string, @Body() agentUpdate: RoleDto) {
      return this.allservice.update({ id, ...agentUpdate });
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.allservice.delete({ id });
    }
  
    @Post()
    async create(@Body() agendadto: RoleDto) {
      return await this.allservice.create(agendadto);
    }
}
