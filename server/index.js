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


let countdownDuration = 30;
let countdownInterval = null

io.on("connection", (socket) => {
    console.log(`User Connected ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data)
    })
    socket.on('new_game', (newCelebURL) => {
        io.emit('update_celeb', newCelebURL);
      });
      

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
        countdownDuration = 30
        countdownInterval = null
        io.emit("update_timer", countdownDuration)
    })
    socket.on("disconnect", () => {
        socket.disconnect()
        console.log("a user just disconnected")
    })
})

server.listen(3001, () => {
    console.log("server is running")
})