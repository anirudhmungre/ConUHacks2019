var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  console.log('What a dick');
  console.log('Who does this person think they are?');
  (function() {
    // Data to be sent to the user added here.
    // Soil Moisture 0-100
    // Temperature 0-100
    // Clouds 0-100

    obj = {soil_moisture: Math.random() * 100,
        temperature: Math.random() * 100,
        clouds: Math.random() * 100};

    jsonObj = JSON.stringify(obj);
    
    socket.emit('message', jsonObj);

    setTimeout(arguments.callee, 30000);  
  })();
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});