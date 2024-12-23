import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FavoriService } from './favori.service';
import { FavoriDto } from 'src/dto/favori.dto';

@Controller('favori')
export class FavoriController {
    constructor(private readonly allservice: FavoriService) {}
    
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
    
        @Get('servicebyuser/:id')
        getServiceByUser(@Param('id') id: string) {
          return this.allservice.getServiceUser({
            id,
          });
        }
    
      
        @Put(':id')
        update(@Param('id') id: string, @Body() agentUpdate: FavoriDto) {
          return this.allservice.update({ id, ...agentUpdate });
        }
      
        @Delete(':id')
        delete(@Param('id') id: string) {
          return this.allservice.delete({ id });
        }
      
        @Post()
        async create(@Body() agendadto: FavoriDto) {
          return await this.allservice.create(agendadto);
        }
}
