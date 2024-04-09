const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer{
    constructor(blockchain){
        this.blockchain = blockchain;
        this.sockets = [];
    }

    // used to start the server
    listen() {
        const server = new Websocket.Server({ port: P2P_PORT });  //creating the p2p server
        
        // event listener for new socket connection for this server
        server.on('connection', socket => this.connectSocket(socket)); 
        
        this.connectToPeers();
        
        console.log(`listening for peer-to-peer connections on: ${P2P_PORT}`);
    }

    connectToPeers(){
        peers.forEach(peer => {
            // example peer address is ws://localhost:5001
            const socket = new Websocket(peer);

            socket.on('open', () => this.connectSocket(socket));
        })
    }

    connectSocket(socket){
        this.sockets.push(socket);
        console.log('Socket connected');

        this.messageHandler(socket);

        this.sendChain(socket);
    }

    messageHandler(socket){
        // this event listener on any message from sockets
        // replaces its own chain if received chain is valid and longer
        socket.on('message', message => {
            const data = JSON.parse(message);
            // console.log('data', data);
            this.blockchain.replaceChain(data);
        });
    }

    sendChain(socket){
        socket.send(JSON.stringify(this.blockchain.chain))
    }

    syncChains() {
        this.sockets.forEach(socket => {
            this.sendChain(socket);
        } )
    }
}

module.exports = P2pServer