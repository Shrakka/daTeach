var mongoose = require('mongoose'),
  Discussion = mongoose.model('Discussion');

module.exports = function(io) {
  io.on('connection', (socket) => {
    socket.on('addMessage', (value) => {
      io.emit('message', {content: value.content, discussion: value.discussion, author: value.author});
      Discussion.findByIdAndUpdate (
        value.discussion,
        {$push: {"messages": {author: value.author, content: value.content}}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
      )
    });
  });
}
