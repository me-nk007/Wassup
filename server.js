const express = require("express")
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000


// Creating a Server
http.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})


// Creating a Route for the server so that it can give me another page present in public
app.use(express.static(__dirname + '/public'))


//  Requesting server to give us index.hmtl
app.get('/',(req,res) =>{
    res.sendFile(__dirname + '/index.html')
})


// Seeting up socket.io in server
const io = require('socket.io')(http)

// When browser would be connected to server then it would log Connected into the terminal
io.on('connection', (socket)=>{
    console.log("Connected...")
    socket.on('message', (msg)=>{
        // console.log(msg)

        // sending message to all clients connected to socket except itself
        socket.broadcast.emit('message',msg)
    })
})
