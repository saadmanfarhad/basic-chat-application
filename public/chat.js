//Make connection
var socket = io.connect('http://localhost:4000');

//Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//Emit Events
function verify() {
  if(message.value.length === 0){
    alert('Put some text in there !');
  }
  else if (handle.value.length === 0) {
    alert('Put your handle/name !');
  }
  else{
    socket.emit('chat', {
      message: message.value,
      handle: handle.value
    })
  }
}

function keyPress() {
  socket.emit('typing', handle.value);
}

function stoppedTyping() {
  if(message.value.length > 0){
    btn.disabled = false;
  }
  else{
    btn.disabled = true;
  }
}

//Listen for events
socket.on('chat', function (data) {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

socket.on('typing', function (data) {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
