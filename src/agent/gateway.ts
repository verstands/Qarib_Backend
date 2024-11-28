import { WebSocketGateway, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UserGatewayInterface } from 'src/interface/usergatewayinterface';


@WebSocketGateway()
export class UserGateway implements UserGatewayInterface {
  @WebSocketServer()
  private server: Server;

  emitUserPositionChange(userId: string, latitude: number, longitude: number): void {
    this.server.emit('userPositionUpdate', { userId, latitude, longitude });
  }

  @SubscribeMessage('getUsers')
  handleUserUpdate(): void {
    // Pas besoin d'accéder à AgentService ici
  }
}
