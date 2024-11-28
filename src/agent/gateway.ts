import { WebSocketGateway, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { AgentService } from './agent.service'; 
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', 
  },
})
export class UserGateway {
  @WebSocketServer()
  private server: Server; 

  constructor(private readonly agentService: AgentService) {} 

  @SubscribeMessage('getUsers')
  async handleUserUpdate(): Promise<void> {
    const agents = await this.agentService.getUsersPostion(); 
    this.server.emit('usersUpdate', agents);
  }

  emitUserPositionChange(userId: string, latitude: number, longitude: number): void {
    this.server.emit('userPositionUpdate', { userId, latitude, longitude });
  }
}
