import WebSocket from 'ws';

const { P2P_PORT = 5000 } = process.env;

class P2PService {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    const server = new WebSocket.Server({ port: P2P_PORT });

    server.on('connection', (socket) => this.onConnection(socket));
    console.log('P2P Service listening on: ', P2P_PORT);
  }

  onConnection(socket) {
    console.log('Connection stablished');
    this.sockets.push(socket);
  }
}

export default P2PService;
