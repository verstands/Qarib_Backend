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

    // Mise à jour de la position de l'agent
    await this.agentService.updateUserPosition(payload.userId, payload.latitude, payload.longitude);

    // Récupérer **tous** les agents avec leurs services après mise à jour
    const agentsWithServices = await this.agentService.getUsersPosition({ id: payload.userId });

    // Diffuser la mise à jour des positions de tous les agents
    this.server.emit('locationUpdate', agentsWithServices);
  }

  async emitUserPositionChange() {
    // Récupérer **tous** les agents avec leurs services
    const agentsWithServices = await this.agentService.getUsersPosition({ id: "" });

    // Diffuser la mise à jour de tous les agents connectés
    this.server.emit('locationUpdate', agentsWithServices);
  }
}
