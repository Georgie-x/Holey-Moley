import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import styles from "./GameTimer.module.css"



const socket = io.connect("http://localhost:3001")

function GameTimer({celebURLs, setblock1, setblock2, setblock3, setblock4, setblock5, setblock6, setblock7, setblock8, setblock9, setblock10, setblock11, setblock12, setblock13, setblock14, setblock15, setblock16, setblock17, setblock18, setblock19, setblock20}) {
    //have 5 celeb urls
    const [index, setIndex] = useState(0)
    const [celebURL, setCelebURL] = useState(celebURLs[0])
    const [timer, setTimer] = useState(10)

    useEffect(() => {
        if(!timer) {
        socket.on(`update_celeb`, (newCelebURL) => {
            setCelebURL(newCelebURL)
            setblock1(true)
            setblock2(true)
            setblock3(true)
            setblock4(true)
            setblock5(true)
            setblock6(true)
            setblock7(true)
            setblock8(true)
            setblock9(true)
            setblock10(true)
            setblock11(true)
            setblock12(true)
            setblock13(true)
            setblock14(true)
            setblock15(true)
            setblock16(true)
            setblock17(true)
            setblock18(true)
            setblock19(true)
            setblock20(true)            
            console.log(index)
        }) 
        }
        socket.on(`update_timer`, (countdownDuration) => {
            setTimer(countdownDuration)
            if(countdownDuration === 0) {
                handleNextCeleb()
                setIndex((index+1)%5)
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
        const randomId = Math.floor(celebURLs.length * Math.random())
        setIndex(index+1)
        console.log(index)
        const newCelebURL = celebURLs[randomId]
        socket.emit("new_game", newCelebURL);
        setCelebURL(celebURLs[index % celebURLs.length]);
        resetTimer();
        startTimer();
    }

    return (
        <>
          {index >= 5 ? (
            <div className="game-over">
              <h1>Game Over</h1>
            </div>
          ) : (
            <>
        {/* <button className='next-celeb-button' onClick={handleNextCeleb}>Next Celeb</button>   */}
              <p className='time-remaining'>{timer} seconds remaining</p>
              <div className="timer">
                <img className="celeb-picture" src={celebURL} alt="a picture of a random celebrity" />
              </div>
              <form className='answer-form'>
            <input />
            <button type='Submit'> Click to Submit</button>
          </form>
            </>
          )}
        </>
      );
          }
export default GameTimer