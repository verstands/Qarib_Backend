import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageDto } from 'src/dto/image.dto';

@Controller('image')
export class ImageController {
    constructor(private readonly allservice: ImageService) {}

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
    update(@Param('id') id: string, @Body() agentUpdate: ImageDto) {
      return this.allservice.update({ id, ...agentUpdate });
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.allservice.delete({ id });
    }
  
    @Post()
    async create(@Body() agendadto: ImageDto) {
      return await this.allservice.create(agendadto);
    }
}
