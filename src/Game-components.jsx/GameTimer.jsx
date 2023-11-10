import { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001")

function GameTimer({celebURLs}) {
    const [index, setIndex] = useState(0)
    const [celebURL, setCelebURL] = useState(celebURLs[0])
    const [timer, setTimer] = useState(30)

    useEffect(() => {
        if(!timer) {
        socket.on(`update_celeb`, (newCelebURL) => {
            setCelebURL(newCelebURL)
            console.log(index)
        }) 
        }
        socket.on(`update_timer`, (countdownDuration) => {
            setTimer(countdownDuration)
            if(countdownDuration === 0) {
                handleNextCeleb()
                setIndex(index+1)
            }
        })
        return () => {
            socket.off(`update_timer`)
            socket.off(`update_celeb`)
        }
    }, [timer])

    const startTimer = () => {
        if (socket) {
            socket.emit("start_timer")
        }
    }

    const resetTimer = () => {
        if (socket) {
            socket.emit("reset_timer")
        }
    }

    const handleNextCeleb = () => {
        const newCelebURL = celebURLs[index]
        socket.emit("new_game", newCelebURL);
        setIndex((index+1)%celebURLs.length)
        setCelebURL(newCelebURL);
        resetTimer();
        startTimer();
    }
        
        // console.log(randomId)
        // const newCelebURL = celebURLs[(index)];
        // socket.emit("new_game", newCelebURL);
        // setIndex((index+1));
        // setCelebURL(newCelebURL);
        // resetTimer();
        // startTimer();

        return (
            <>
              {index >= 5 ? (
                <div className="game-over">
                  <h1>Game Over</h1>
                </div>
              ) : (
                <>
                 <button className='next-celeb-button' onClick={handleNextCeleb}>Next Celeb</button>
                  <p className='time-remaining'>{timer} seconds remaining</p>
                  <div className="timer">
                    <img className="celeb-picture" src={celebURL} alt="a picture of a random celebrity" />
                  </div>
                </>
              )}
            </>
          );
}
export default GameTimer