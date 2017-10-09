var mongoose = require('mongoose'),
  Discussion = mongoose.model('Discussion');

module.exports = function(io) {
  io.on('connection', (socket) => {
    socket.on('addMessage', (content, discussion, author) => {
      var time = new Date()
      io.emit('message', {content: content, discussion: discussion, author: author, time: time});
      Discussion.findByIdAndUpdate (
        discussion,
        {$push: {"messages": {time: time, author: author, content: content}}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
      )
    });
  });
}
