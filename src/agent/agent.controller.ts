import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentInterface } from 'src/dto/agent.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OtpAgentDto } from 'src/dto/otpagent';

//@UseGuards(JwtAuthGuard)
@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) { }

  @Get()
  getAgents() {
    return this.agentService.getAgents();
  }

  @Get(':id')
  getAgent(@Param('id') id: string) {
    return this.agentService.getAgent({
      id,
    });
  }

  @Put(':id')
  updateAgent(@Param('id') id: string, @Body() agentUpdate: AgentInterface) {
    return this.agentService.updateAgent({ id, ...agentUpdate });
  }

  @Delete(':id')
  deleteAgent(@Param('id') id: string) {
    return this.agentService.deleteAgent({ id });
  }

  @Post()
  cretae(@Body() data: AgentInterface) {
    return this.agentService.create(data);
  }

  @Post('verification')
  verify(@Body() data: AgentInterface) {
    return this.agentService.verifyCount(data);
  }

  @Post('otp')
  async create(@Body() data: OtpAgentDto) {
    return await this.agentService.Otpmail(data);
  }

  @Get('positions/positions/:id')
  async getUsersPosition(@Param('id') id: string) {
    return await this.agentService.getUsersPosition({
      id,
    });
  }

  @Put('positions/positions/:id')
  async updateAgentPosition(@Param('id') id: string, @Body() positionData: { latitude: string; longitude: string }) {
    const { latitude, longitude } = positionData;
    const updatedAgent = await this.agentService.updateUserPosition(id, latitude, longitude);
    return {
      agent: updatedAgent,
    };
  }
  @Get('positions/positions/:id/:idservice')
  async getUsersPositionService(
    @Param('id') id: string,
    @Param('idservice') idservice: string
  ) {
    return await this.agentService.getUsersPositionService({
      id,
      idservice, 
    });
  }

  @Get('online-status/online-status/:id/:status')
  async updateOnlineStatus(
    @Param('id') id: string,
    @Param('status') status: string,
    
  ) {
    return this.agentService.updateOnlineStatus({id, status});
  }


}
