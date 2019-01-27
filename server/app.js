const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let dialData = {
  temperature: Array(35).fill(0).map(e => Math.random() * 50),
  humidity: Array(35).fill(0).map(e => Math.random() * 50),
  pressure: Array(35).fill(0).map(e => Math.random() * 50)
}

const updateDialData = () => {
  dialData.temperature.shift()
  dialData.temperature.push(Math.random() * 50)
  dialData.humidity.shift()
  dialData.humidity.push(Math.random() * 50)
  dialData.pressure.shift()
  dialData.pressure.push(Math.random() * 50)
}

io.on('connection', function(socket){
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log("He's ded jimbo")
  })
  socket.on('get-data-vis', () => {
    socket.emit('give-data-vis', {fuck: "yes"})
  })
  socket.on('get-data-dial', () => {
    updateDialData()
    socket.emit('give-data-dial', dialData)
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
