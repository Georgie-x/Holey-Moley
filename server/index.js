const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");
const { clearInterval } = require('timers');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
});


let countdownDuration = 60;
let countdownInterval = null
const rooms = {}

io.on("connection", (socket) => {
    console.log(`User Connected ${socket.id}`)

    socket.on('new_game', (newCelebURL) => {
        socket.to(newCelebURL.room).emit('update_celeb', newCelebURL);
      });
    
    socket.on('createRoom', ({room, username}) => {
        rooms[room] = {players: [{ id: socket.id, username}]}
        socket.join(room)
        io.to(room).emit('updatePlayers', rooms[room].players)
    })

    socket.on('joinRoom', ({room, username}) => {
        if(rooms[room]) {
            socket.join(room)
            rooms[room].players.push({id: socket.id, username})
            io.to(room).emit('updatePlayers', rooms[room].players)

            if (rooms[room].players.length >= 2) {
                io.to(room).emit('startGame')
            }
        } else {
            console.log(`Room '${room}' does not exist`);
            socket.emit('roomNotFound', { error: `Room '${room}' does not exist` });
        }
    })

    socket.on("start_timer", () => {
        console.log("received start timer event")
        if (!countdownInterval) {
            countdownInterval = setInterval(() => {
                countdownDuration--
                io.emit('update_timer', countdownDuration)
                if(countdownDuration <= 0) {
                    clearInterval(countdownInterval)
                    countdownInterval = null
                    io.emit("timer_end")
                }
            }, 1000)
        }
    })

    socket.on("reset_timer", () => {
        console.log("received end timer event")
        clearInterval(countdownInterval)
        countdownDuration = 60
        countdownInterval = null
        io.emit("update_timer", countdownDuration)
    })

    socket.on("next_celeb", (newCelebURL) => {
        console.log("next celeb", newCelebURL);
        io.emit("update_celeb", newCelebURL);
      });

      socket.on("next_answer", (newAnswer) => {
        console.log("next answer", newAnswer);
        io.emit("update_answer", newAnswer);
        io.emit("correctAnswer", newAnswer); // Emit the correctAnswer event
      });

    socket.on("disconnect", () => {
        socket.disconnect()
        console.log("a user just disconnected")
        for (const key in rooms) {
            const index = rooms[key].players.findIndex((player) => player.id === socket.id);
            if (index !== -1) {
                rooms[key].players.splice(index, 1);
                io.to(key).emit('updatePlayers', rooms[key].players);
                if (rooms[key].players.length < 2) {
                    io.to(key).emit('stopGame');
                }
            }
        }
    })
})

server.listen(3001, () => {
    console.log("server is running")
})