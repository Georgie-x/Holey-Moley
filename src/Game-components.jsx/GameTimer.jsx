import { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001")

function GameTimer({celebURLs}) {
    const [index, setIndex] = useState(0)
    const [celebURL, setCelebURL] = useState(celebURLs[0])
    console.log(celebURLs[0])
    const [timer, setTimer] = useState(30)

    useEffect(() => {
        socket.on(`update_timer`, (countdownDuration) => {
            setTimer(countdownDuration)
            if(countdownDuration === 0) {
                handleNextCeleb()
            }
        })
        socket.on(`update_celeb`, (newCelebURL) => {
            setCelebURL(newCelebURL)
            setIndex(index + 1)
        })
        return () => {
            socket.off(`update_timer`)
            socket.off(`update_celeb`)
        }
    }, [])

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
        const randomId = Math.floor(celebURLs.length * Math.random())
        console.log(randomId)
        const newCelebURL = celebURLs[randomId]
        socket.emit("new_game", newCelebURL);
        setCelebURL(newCelebURL);
        resetTimer();
        startTimer();
    }

    return (
        <>
        {/* <button className='next-celeb-button' onClick={handleNextCeleb}>Next Celeb</button> */}
  <p className='time-remaining'>{timer} seconds remaining</p>
        <div className="timer">
            <img className="celeb-picture" src={celebURL} alt="a picture of a random celebrity" />
        </div>
        </>
    )
}
export default GameTimer