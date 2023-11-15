import { useState } from "react"
import {AnswerInput, ClueDisplay, GameTimer, Launcher, Mole, PictureMask, Picture} from "../Game-components.jsx"
import { useEffect } from "react"
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001")

function Game(){
    const [room, setRoom] = useState('')
    const [username, setUsername] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [players, setPlayers] = useState([]);

    const createRoom = () => {
        socket.emit('createRoom', {room, username})
    }

    const joinRoom = () => {
        socket.emit('joinRoom', {room, username})
    }

    useEffect(() => {
        socket.on('updatePlayers', (updatedPlayers) => {
            console.log('updated players:', updatedPlayers)
            setPlayers(updatedPlayers);
        })
        socket.on('startGame', () => {
            console.log('Game is starting!');
        
        })
        socket.on('stopGame', () => {
            console.log('Game is stopping!');
        });
        socket.on('roomNotFound', (errorData) => {
            console.error(errorData.error)
            setErrorMessage(errorData.error);
        });

        return () => {
            socket.off('updatePlayers')
            socket.off('startGame');
            socket.off('stopGame');
            socket.off('roomNotFound');
        }
    }, [socket])

    return (
    <div>
        <div>
        <h1>Game</h1>
        <input type="text" placeholder="enter username" value={username} onChange={(event) => setUsername(event.target.value)} />
        <input type="text" placeholder="enter room name" value={room} onChange={(event) => setRoom(event.target.value)} />
        <button onClick={createRoom}>Create Room</button>
        <button onClick={joinRoom}>Join Room</button>
        </div>
        {errorMessage && (
            <div style={{ color: 'red', marginTop: '10px' }}>
                {errorMessage}
                </div>
        )}
        <div>
            <h2>Players in the Room:</h2>
            <ul>
                {players.map((player) => (
                    <li key={player.id}>{player.username}</li>
                ))}
            </ul>
        </div>
        <Launcher />
        </div>
    )
}

export default Game