import { useState } from "react"
import { Launcher } from "../Game-components/index.jsx"
import { useEffect, useContext } from "react"
import io from 'socket.io-client'
import { UserContext, UserProvider } from "../Users/UserContext";

const socket = io.connect("http://localhost:3001")

function Game(){
    const { user, setUser } = useContext(UserContext);
    const [room, setRoom] = useState('')
    const [gameStarted, setGameStarted] = useState(false)
    const [joinedRoom, setJoinedRoom] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [players, setPlayers] = useState([]);
    const [player1, setPlayer1] = useState(false)
    const [player2, setPlayer2] = useState(false)

    const createRoom = () => {
        socket.emit('createRoom', {room, user})
        setPlayer1(true)
    }

    const joinRoom = () => {
        socket.emit('joinRoom', {room, user})
        setJoinedRoom(true)
        setPlayer2(true)
    }

    const startGame = () => {
        if (players.length >= 2) {
            socket.emit('startGame', { room });
        } else {
            console.log('Not enough players to start the game.');
        }
    }

    useEffect(() => {
        socket.on('updatePlayers', (updatedPlayers) => {
            console.log('updated players:', updatedPlayers)
            setPlayers(updatedPlayers);
        })
        socket.on('startGame', () => {
            console.log('Game is starting!');
            setGameStarted(true)
        
        })
        socket.on('stopGame', () => {
            console.log('Game is stopping!');
            setGameStarted(false)
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
    }, [socket, players])

    return (
        <div>
        {gameStarted ? (
          <Launcher players={players} player1={player1} player2={player2}/>
        ) : (
          <div>
            <div>
              <h1>Game</h1>
              {/* <input type="text" placeholder="enter username" value={username} onChange={(event) => setUsername(event.target.value)} /> */}
              <input type="text" placeholder="enter room name" value={room} onChange={(event) => setRoom(event.target.value)} />
              <button onClick={createRoom}>Create Room</button>
              <button onClick={joinRoom}>Join Room</button>
              {joinedRoom && (
                <div>
                  {startGame}
                </div>
              )}
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
                  <li key={player.id}>{player.user}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
}

export default Game