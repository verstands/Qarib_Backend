import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AgentService } from './agent.service';
import { forwardRef, Inject } from '@nestjs/common';

@WebSocketGateway(4006, { cors: true })
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    @Inject(forwardRef(() => AgentService)) private readonly agentService: AgentService, // Utilisation de forwardRef
  ) {}

  handleConnection(client: any) {
    console.log('Client connecté:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client déconnecté:', client.id);
  }

  @SubscribeMessage('updateLocation')
  async handleLocationUpdate(client: any, payload: { userId: string; latitude: string; longitude: string }) {
    console.log('Mise à jour de la localisation:', payload);
    await this.agentService.updateUserPosition(payload.userId, payload.latitude, payload.longitude);
    const agentsWithServices = await this.agentService.getUsersPosition({ id: payload.userId });
    this.server.emit('locationUpdate', agentsWithServices);
  }

  async emitUserPositionChange() {
    const agentsWithServices = await this.agentService.getUsersPosition({ id: "" });
    this.server.emit('locationUpdate', agentsWithServices);
  }
}
