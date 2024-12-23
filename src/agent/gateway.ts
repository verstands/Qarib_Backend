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
    @Inject(forwardRef(() => AgentService)) private readonly agentService: AgentService, // Utilisez forwardRef ici
  ) {}

  handleConnection(client: any) {
    console.log('Client connecté:', client.id);
  }
 
  handleDisconnect(client: any) {
    console.log('Client déconnecté:', client.id); 
  }

  @SubscribeMessage('updateLocation')
  async handleLocationUpdate(client: any, payload: { userId: string; latitude: number; longitude: number }) {
    console.log('Mise à jour de la localisation:', payload);
    
    // Appel à la méthode de mise à jour de la position
    await this.agentService.updateUserPosition(payload.userId, payload.latitude, payload.longitude);
    
    // Émettre l'événement à tous les clients connectés
    this.server.emit('locationUpdate', payload);
  }

  async emitUserPositionChange(userId: string, latitude: number, longitude: number) {
    this.server.emit('locationUpdate', { userId, latitude, longitude });
  }
}