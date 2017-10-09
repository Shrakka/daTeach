module.exports = function(io) {
  io.on('connection', (socket) => {

    socket.on('disconnect', function(){
      io.emit('users-changed', {user: socket.name, event: 'left'});
    });

    socket.on('set-name', (name) => {
      socket.name = name;
      io.emit('users-changed', {user: name, event: 'joined'});
    });

    socket.on('add-message', (message) => {
      io.emit('message', {text: message.text, from: socket.name, created: new Date()});
    });
  });
}
