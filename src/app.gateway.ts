import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway(8080, { cors: true })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  public clientIdClientMapping: { [socketId: string]: WebSocket } = {};
  constructor() {}

  handleDisconnect(client: WebSocket) {
    // Client aus clientIdClientMapping entfernen, um Memoryleaks zu verhindern
  }

  handleConnection(client: WebSocket, ...args: any[]) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('identity')
  identity(@ConnectedSocket() client: WebSocket): string {
    const id = uuidv4();
    this.clientIdClientMapping[id] = client;
    return `id|${id}`;
  }
}
