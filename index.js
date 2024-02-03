const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = new Server(server);


// Socket.io
io.emit('hello', 'world'); 

// If you want to send a message to everyone except for a certain emitting socket, we have the broadcast flag for emitting from that socket:
io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
});
  
// In this case, for the sake of simplicity we’ll send the message to everyone, including the sender.
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
});

io.on('connection', (socket) => { 
    socket.on('chat message', (msg) => { 
        console.log('message: ' + msg);
    });
});


app.use(express.static(path.resolve('./public')));
app.get('/',(req, res) => {
    return res.sendFile("/public/index.html");
})
server.listen(9000, () => console.log(`server started at 9000 port`));
