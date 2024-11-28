export interface UserGatewayInterface {
    emitUserPositionChange(userId: string, latitude: number, longitude: number): void;
  }
  