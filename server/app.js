const app = require('express')();
const http = require('http').Server(app);
const socketio = require('socket.io')(http);

const dataPoints = 20
let dialData = {
  temperature: Array(dataPoints).fill(0).map(e => Math.random() * 50),
  humidity: Array(dataPoints).fill(0).map(e => Math.random() * 50),
  pressure: Array(dataPoints).fill(0).map(e => Math.random() * 50)
}
setInterval(() => {
  dialData.temperature.shift()
  dialData.temperature.push(Math.random() * 50)
  dialData.humidity.shift()
  dialData.humidity.push(Math.random() * 50)
  dialData.pressure.shift()
  dialData.pressure.push(Math.random() * 50)
}, 6000)

let visData = {
  tp: 0.2,
  ph: 0.2,
  sm: 0.6
}

socketio.on('connection', function(socket){
  console.log('a user connected')
  socket.on('disconnect', () => { console.log("He's ded jimbo") })
  socket.on('get-data-vis', () => {
    socket.emit('give-data-vis', visData)
  })
  socket.on('get-data-dial', () => {
    socket.emit('give-data-dial', dialData)
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
