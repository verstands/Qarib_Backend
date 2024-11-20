import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EvaluationDto } from 'src/dto/evaluation.dto';
import { EvaluationService } from './evaluation.service';

@Controller('evaluation')
export class EvaluationController {
    constructor(private readonly allservice: EvaluationService) {}

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
    update(@Param('id') id: string, @Body() agentUpdate: EvaluationDto) {
      return this.allservice.update({ id, ...agentUpdate });
    }
  
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.allservice.delete({ id });
    }
  
    @Post()
    async create(@Body() agendadto: EvaluationDto) {
      return await this.allservice.create(agendadto);
    }
}
