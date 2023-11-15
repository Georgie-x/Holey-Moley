import { useState, useEffect, useContext } from 'react'
import io from 'socket.io-client'
/* import styles from "./GameTimer.module.css" */
import { UserContext, UserProvider } from '../Users/UserContext'


const socket = io.connect("http://localhost:3001")

function GameTimer({celebNames, celebURLs, setblock1, setblock2, setblock3, setblock4, setblock5, setblock6, setblock7, setblock8, setblock9, setblock10, setblock11, setblock12, setblock13, setblock14, setblock15, setblock16, setblock17, setblock18, setblock19, setblock20}) {
    //have 5 celeb urls
    const [index, setIndex] = useState(0)
    const [celebURL, setCelebURL] = useState([
      "https://static.tvmaze.com/uploads/images/original_untouched/2/6255.jpg",
  ])
    const [timer, setTimer] = useState(60)
    const [loaded, setLoaded] = useState(false)
    const [answer, setAnswer] = useState('')
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
        }) 
        }
        socket.on(`update_timer`, (countdownDuration) => {
            setTimer(countdownDuration)
            if(countdownDuration === 0) {
                handleNextCeleb()
                setIndex((index+1))
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
        console.log("next celeb")
        const randomId = Math.floor(celebURLs.length * Math.random())
        setIndex(index+1)
        const newCelebURL = celebURLs[index]
        const newAnswer = celebNames[index]
        socket.emit("next_celeb", newCelebURL);
        socket.emit("new_game", newCelebURL);
        socket.emit("next_answer", newAnswer);
        setCelebURL(celebURLs[index % celebURLs.length]);
        resetTimer();
        startTimer();
    }

    return (
        <>
          {index > 5 ? (
            <div className="game-over">
              <h1>Game Over</h1>
            </div>
          ) : (
            <>
    {/*        <button className='next-celeb-button' onClick={handleNextCeleb}>Next Celeb</button>   */} 
              <p className='time-remaining'>{timer} seconds remaining</p>
              <div className="timer">
                <img className="celeb-picture" src={celebURL} alt="a picture of a random celebrity" />
              </div>
              <AnswerForm celebNames={celebNames} index={index} handleNextCeleb={handleNextCeleb} setCelebURL={setCelebURL} celebURLs={celebURLs} setIndex={setIndex} startTimer={startTimer} resetTimer={resetTimer} />
        
            </>
          )}
        </>
      );
          }

  function AnswerForm({celebNames, index, handleNextCeleb, setCelebURL, celebURLs, setIndex, startTimer, resetTimer}) {
    const { user, setUser } = useContext(UserContext);
    const [answer, setAnswer] = useState('')
    const [celebName, setCelebName] = useState('')
    const [celebCountry, setCelebCountry]= useState('')
    const [answerBorder, setAnswerBorder] = useState(true)
    const [player1, setPlayer1] = useState('')
    const [player2, setPlayer2] = useState('')
    const [player1Score, setPlayer1Score] = useState(0)
    const [player2Score, setPlayer2Score] = useState(0)
    const [isPlayer1, setIsPlayer1] = useState(false)
    const [isPlayer2, setIsPlayer2] = useState(false)
    if (!player1 && user) {
      setPlayer1(user)
      setIsPlayer1(true) }
    if (!user && !player2) {
      setPlayer2('Guest')
      setIsPlayer2(true)

    }

    const [timer, setTimer] = useState(60)
    const [loaded, setLoaded] = useState(false)




    //Handling SUbmit
  const handleSubmit = (e) =>{

    console.log('HEEEELLLLLLOOOOOO', user, user.length)
    const userInput =  e.target[0].value
    e.preventDefault()
    
  //Ignoring case sensitivity
     const userAnswer = userInput.toLowerCase()
     const gameAnswer = celebNames[(index+4)%5].toLowerCase()
  
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




    if(gameAnswer === userAnswer){
      handleNextCeleb()
      setAnswer('')
      isPlayer1 ? setPlayer1Score(player1Score+1) : setPlayer2Score(player2Score+1)
      console.log("CORRECT!")

    }else{
      console.log(gameAnswer, userAnswer)
      console.log("this aint it dummy")
      console.log(difference, "You've got this much wrong")
    }
  }
    




    return (
      <form className='answer-form' onSubmit={handleSubmit}>
       <input onChange={(e)=> setAnswer(e.target.value)} value={answer} type={'text'} placeholder={'Your Answer'} 
        className={answerBorder ? 'submitForm' : 'submitFormWrong'}/>
        <button type='Submit'> Click to Submit</button>
        <h3>{player1}: {player1Score}    {player2}:{player2Score} </h3>

      {/*   <p>you have {gameAnswerCharNum - answer.length} letters left</p>  */}
      </form>
    )
  }






















export default GameTimer