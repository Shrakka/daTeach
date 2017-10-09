var mongoose = require('mongoose'),
  Discussion = mongoose.model('Discussion');

module.exports = function(io) {
  io.on('connection', (socket) => {
    socket.on('addMessage', (value) => {
      var time = new Date()
      io.emit('message', {content: value.content, discussion: value.discussion, author: value.author, time: time});
      Discussion.findByIdAndUpdate (
        value.discussion,
        {$push: {"messages": {time: time, author: value.author, content: value.content}}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
      )
    });
  });
}
