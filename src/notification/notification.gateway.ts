import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';
import { NotificationsDto } from 'src/dto/Notification.dto';

@WebSocketGateway({ cors: true }) // Active le CORS pour permettre la connexion avec Flutter
export class NotificationGateway {
  constructor(private readonly notificationService: NotificationService) {}

  @WebSocketServer()
  server: Server;

  // Map pour stocker les connexions WebSocket avec leur userId
  private connectedClients: Map<string, Socket> = new Map();

  // Écoute l'événement 'register' pour associer un userId à une connexion
  @SubscribeMessage('register')
  handleRegister(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.connectedClients.set(userId, client); // Associe le userId à la connexion
    console.log(`Utilisateur ${userId} enregistré`);
  }

  // Écoute l'événement 'sendNotificationALL' pour envoyer une notification à tous les clients
  @SubscribeMessage('sendNotificationALL')
  handleNotification(@MessageBody() data: { title: string; body: string }) {
    this.server.emit('notification', data); // Émet l'événement 'notification' à tous les clients
  }

  // Écoute l'événement 'sendNotification' pour envoyer une notification ciblée
  @SubscribeMessage('sendNotification')
  async handleSendNotification(@MessageBody() data: NotificationsDto) {
    // Crée la notification dans la base de données
    const notification = await this.notificationService.create(data);

    // Récupère la connexion du client cible
    const targetClient = this.connectedClients.get(data.recev_notification);

    if (targetClient) {
      // Envoie la notification uniquement au client cible
      targetClient.emit('notification', notification);
      console.log(`Notification envoyée à l'utilisateur ${data.recev_notification}`);
    } else {
      console.log(`Utilisateur ${data.recev_notification} non connecté`);
    }
  }

  // Gère la déconnexion d'un client
  handleDisconnect(client: Socket) {
    // Supprime la connexion de la Map
    for (const [userId, socket] of this.connectedClients.entries()) {
      if (socket.id === client.id) {
        this.connectedClients.delete(userId);
        console.log(`Utilisateur ${userId} déconnecté`);
        break;
      }
    }
  }
}