
/*
 * GET home page.
 */

var rooms = [];

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.chat = function (socket) {
  socket.broadcast.emit('client/users', "User connected");

  socket.on('server/room/new', function(data) {
    rooms.push(data);
    socket.join(data);
    socket.emit('client/room/new', data);
  })

  socket.on('server/chat', function(data){
    socket.broadcast.to(data.room).emit('client/chat', data.chat);
  })
};