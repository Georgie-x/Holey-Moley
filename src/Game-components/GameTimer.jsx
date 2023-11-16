import { useState, useEffect, useContext } from 'react'
import io from 'socket.io-client'
/* import styles from "./GameTimer.module.css" */
import { UserContext, UserProvider } from '../Users/UserContext'


const socket = io.connect("http://localhost:3001")

function GameTimer({players, player1, player2, celebNames, celebURLs, setblock1, setblock2, setblock3, setblock4, setblock5, setblock6, setblock7, setblock8, setblock9, setblock10, setblock11, setblock12, setblock13, setblock14, setblock15, setblock16, setblock17, setblock18, setblock19, setblock20}) {
  const [index, setIndex] = useState(0)
  const [celebURL, setCelebURL] = useState([
    "https://static.tvmaze.com/uploads/images/original_untouched/2/6255.jpg",
  ])
  const [correctCeleb, setCorrectCeleb] = useState('f. murray abraham')
  const [timer, setTimer] = useState(60)
  const [winner, setWinner] = useState('')
  if (socket) {
    socket.emit('start_timer')
  }
    useEffect(() => {
        if(timer<=0) {
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
        })
        socket.on('update_answer', (newAnswer) => {
          setCorrectCeleb(newAnswer)
        })

        socket.on('update_index', (newIndex) => {
          setIndex(newIndex)
        })
        }

        socket.on('update_index', (newIndex) => {
          setIndex(newIndex)
        })



        socket.on(`update_timer`, (countdownDuration) => {
            setTimer(countdownDuration)
            if(countdownDuration === 0) {
                handleNextCeleb()
                setIndex((index+1)) //might need to remove this
            }
        })

        socket.on("update_celeb", (newCelebURL) => {
          console.log("update celeb", newCelebURL);
          setCelebURL(newCelebURL);
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
        });

        socket.on('update_answer', (newAnswer) => {
          setCorrectCeleb(newAnswer)
          console.log(newAnswer)
        })

        return () => {
            socket.off(`update_timer`)
            socket.off(`update_celeb`)
            socket.off(`update_answer`)
            socket.off(`update_index`)
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
        console.log("next celeb")
        const randomId = Math.floor(celebURLs.length * Math.random())
        //setIndex(index+1) //might need to remove this
        const newCelebURL = celebURLs[index]
        const newAnswer = celebNames[index]
        const newIndex = index + 1
        console.log('NEW INDEX >>>>', newIndex, index)
        console.log('NEW ANSWER >>>>', newAnswer)
        socket.emit("next_celeb", newCelebURL);
        socket.emit("new_game", newCelebURL);
        socket.emit("next_answer", newAnswer);
        socket.emit("next_index", newIndex);
        setCelebURL(celebURLs[index]);
        resetTimer();
        startTimer();
    }

    return (
        <>
          {index > 4 ? (
            <div>
              <h1 className='game-over'>{winner}</h1>
            </div>
          ) : (
            <>
    {/*        <button className='next-celeb-button' onClick={handleNextCeleb}>Next Celeb</button>   */} 
              <p className='time-remaining'>{timer} seconds remaining</p>
              <div className="timer">
                <img className="celeb-picture" src={celebURL} alt="a picture of a random celebrity" />
              </div>
              <AnswerForm setWinner={setWinner} correctCeleb={correctCeleb} players={players} player1={player1} player2={player2} celebNames={celebNames} index={index} handleNextCeleb={handleNextCeleb} setCelebURL={setCelebURL} celebURLs={celebURLs} setIndex={setIndex} startTimer={startTimer} resetTimer={resetTimer} />
        
            </>
          )}
        </>
      );
          }

  function AnswerForm({setWinner, correctCeleb, players, player1, player2, celebNames, index, handleNextCeleb, setCelebURL, celebURLs, setIndex, startTimer, resetTimer}) {
    const { user, setUser } = useContext(UserContext);
    const [answer, setAnswer] = useState('')
    const [answerBorder, setAnswerBorder] = useState(true)
    const [player1Score, setPlayer1Score] = useState(0)
    const [player2Score, setPlayer2Score] = useState(0)
    




    //Handling SUbmit
  const handleSubmit = (e) =>{

    const userInput =  e.target[0].value
    e.preventDefault()
    
  //Ignoring case sensitivity
     const userAnswer = userInput.toLowerCase()
    //  const gameAnswer = celebNames[(index+4)%5].toLowerCase()
    const gameAnswer = correctCeleb.toLowerCase()
    console.log('game answer', gameAnswer)
  
  //Matching Number of Chars 
     const userAnswerCharNum = userAnswer.length
     const gameAnswerCharNum = gameAnswer.length
  //Telling how many characters the player got wrong
  const gameAnswerArr = []
  const userAnswerArr = []
      for(let i =0; i < gameAnswerCharNum; i++){
        gameAnswerArr.push(gameAnswer[i])
      }
      for(let i =0; i< userAnswerCharNum; i++){
        userAnswerArr.push(userAnswer[i])
      }
      const difference = 
      gameAnswerArr.filter((element) => !userAnswerArr.includes(element)); 

      if (gameAnswer === userAnswer || userAnswer==='a') {
        // socket.emit('update_answer', )
        if (player1) {
          setPlayer1Score(player1Score + 1);
          socket.emit("update_score", { player1Score: player1Score + 1, player2Score });
        } else {
          setPlayer2Score(player2Score + 1);
          socket.emit("update_score", { player1Score, player2Score: player2Score + 1 });
        }
        setWinner(`Final score: ${players[0].user}: ${player1Score + 1} ${players[1].user}: ${player2Score}`)
        handleNextCeleb();
        setAnswer('');
        console.log("CORRECT!");
      } else {
        console.log(gameAnswer, userAnswer);
        console.log("This ain't it dummy");
      }
    };

    useEffect(() => {
      socket.on("update_score", ({ player1Score, player2Score }) => {
          setPlayer1Score(player1Score);
          setPlayer2Score(player2Score);
      });

      return () => {
          socket.off("update_score");
      };
  }, []);



    return (
      <form className='answer-form' onSubmit={handleSubmit}>
       <input onChange={(e)=> setAnswer(e.target.value)} value={answer} type={'text'} placeholder={'Your Answer'} 
        className={answerBorder ? 'submitForm' : 'submitFormWrong'}/>
        <button type='Submit'> Click to Submit</button>
        <h3>{players[0].user}: {player1Score}    {players[1].user}:{player2Score} </h3> 

      {/*   <p>you have {gameAnswerCharNum - answer.length} letters left</p>  */}
      </form>
    )
  }






















export default GameTimer