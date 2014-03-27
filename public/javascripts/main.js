var socket = io.connect(window.location);

var current_room = '';

var addChat = function(data) {
  var chatlist = document.querySelector('.chatlist');
  var chat = document.createElement('li');
  chat.textContent = data;
  chatlist.appendChild(chat);
}

socket.on('client/users', function(data) {
  console.log("User connected");
});

socket.on('client/room/new', function(data) {
  var roomlist = document.querySelector('.roomlist');
  var room = document.createElement('li');
  room.innerHTML = '<i class="fa fa-times"></i>'+ ' '+ data;
  roomlist.appendChild(room);

  current_room = data;
});

socket.on('client/chat', function(data) {
  addChat(data);
})

var form_room = document.querySelector('.form-room');

form_room.addEventListener('submit', function(e) {
  e.preventDefault();
  e.stopPropagation();
  var room = document.querySelector('input.room');

  if(room)
    socket.emit('server/room/new', room.value);
  room.value = '';
  return false;
});

var form_chat = document.querySelector('.form-chat');

form_chat.addEventListener('submit', function(e) {
  e.preventDefault();
  e.stopPropagation();
  var chat = document.querySelector('input.chat');

  if(chat)
    socket.emit('server/chat', {room: current_room, chat: chat.value});
  chat.value = '';
  return false;
});