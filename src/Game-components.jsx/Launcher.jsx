import { useEffect, useRef, useState } from 'react'
import Matter, { Engine, Render, Bodies, World, } from 'matter-js'
import { Bird } from '../Game-components.jsx/game-objects/bird'
import { SlingShot } from '../Game-components.jsx/game-objects/slingshot'
import birdImage from '../Game-components.jsx/game-objects/birdImage.gif'
import { getShowCharacters } from '../axios'
import GameTimer from '../Game-components.jsx/GameTimer'

import styles from "./Launcher.module.css"


function Launcher(){
    const [birdReleased, setBirdReleased] = useState(false)
    const [celebURLs, setCelebURLs] = useState([])
    const [answer, setAnswer] = useState('');
    const [celebName, setCelebName] = useState('')
    const [block1, setblock1] = useState(true)
    const [block2, setblock2] = useState(true)
    const [block3, setblock3] = useState(true)
    const [block4, setblock4] = useState(true)
    const [block5, setblock5] = useState(true)
    const [block6, setblock6] = useState(true)
    const [block7, setblock7] = useState(true)
    const [block8, setblock8] = useState(true)
    const [block9, setblock9] = useState(true)
    const [block10, setblock10] = useState(true)
    const [block11, setblock11] = useState(true)
    const [block12, setblock12] = useState(true)
    const [block13, setblock13] = useState(true)
    const [block14, setblock14] = useState(true)
    const [block15, setblock15] = useState(true)
    const [block16, setblock16] = useState(true)
    const [block17, setblock17] = useState(true)
    const [block18, setblock18] = useState(true)
    const [block19, setblock19] = useState(true)
    const [block20, setblock20] = useState(true)

    const scene = useRef();
    const engine = useRef(Engine.create({
        gravity: {
          x: 0,
          y: 0,
        }
    }))

    const birdRef = useRef(null);
    const mousePosition = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const slingshotRef = useRef(null);
    let bird;
    let slingshot;

    useEffect(() => {
        getAllCelebs()
        const gameWindowHeight = 1000
        const gameWindowWidth = 600
        const render = Render.create({
            element: scene.current,
            engine: engine.current,
            options: {
              width: gameWindowWidth,
              height: gameWindowHeight,
              wireframes: false,
              background: 'transparent',
            }
        })

        Matter.Events.on(engine.current, 'beforeUpdate', () => {
            if (birdRef.current && isDragging.current) {
              Matter.Body.setPosition(birdRef.current.body, mousePosition.current);
            }
        });

        const wallThickness = 20;
        const elasticity = 1;

        World.add(engine.current.world, [
            Bodies.rectangle(gameWindowWidth / 2, wallThickness / 2, gameWindowWidth, wallThickness, { isStatic: true, restitution: elasticity }),
            Bodies.rectangle(wallThickness / 2, gameWindowHeight / 2, wallThickness, gameWindowHeight, { isStatic: true, restitution: elasticity }),
            Bodies.rectangle(gameWindowWidth / 2, gameWindowHeight - wallThickness / 2, gameWindowWidth, wallThickness, { isStatic: true, restitution: elasticity }),
            Bodies.rectangle(gameWindowWidth - wallThickness / 2, gameWindowHeight / 2, wallThickness, gameWindowHeight, { isStatic: true, restitution: elasticity }),
        ])

        Matter.Runner.run(engine.current)

        Render.run(render)

        bird = new Bird(300, 820, 25, engine.current.world, birdImage);
        birdRef.current = bird
        const bounce = 5 * (Math.random() - 0.5);
        slingshot = new SlingShot(300 + bounce, 800 + bounce, bird.body, engine.current.world);
        slingshotRef.current = slingshot

        return () => {
            Render.stop(render)
            World.clear(engine.current.world)
            Engine.clear(engine.current)
            render.canvas.remove()
            render.canvas = null
            render.context = null
            render.textures = {}
          }
    }, [])

    useEffect(() => {
        const newBallTimer = setTimeout(() => {
            if (birdRef.current) {
                World.remove(engine.current.world, birdRef.current.body);
                if (slingshotRef.current) World.remove(engine.current.world, slingshotRef.current.sling);
                bird = new Bird(300 * Math.random(), 900, 25, engine.current.world, birdImage);
                birdRef.current = bird;
                const bounce = 5 * (Math.random() - 0.5);
                slingshot = new SlingShot(300 + bounce, 850 + bounce, bird.body, engine.current.world);
                slingshotRef.current = slingshot;
            }
        }, 5000);
        return () => clearTimeout(newBallTimer);
    }, [birdReleased]);

    const handleMouseMove = (e) => {
        if (isDragging.current) {
            const gameWindow = document.getElementsByClassName('game-window')[0];
            const gameWindowRect = gameWindow.getBoundingClientRect();
            const x = e.clientX - gameWindowRect.left;
            const y = e.clientY - gameWindowRect.top;
            mousePosition.current = { x, y };
        }
    };

    const handleMouseDown = (e) => {
        if(birdRef.current && slingshotRef.current){
            isDragging.current = true;
        }
    };

    const handleMouseUp = (e) => {
        if (isDragging.current) {
            isDragging.current = false;

              if (birdRef.current && slingshotRef.current) {
                const birdPosition = birdRef.current.body.position;
                const slingPosition = slingshotRef.current.sling.pointA;
                const strength = 0.0005;
                const force = {
                  x: (slingPosition.x - mousePosition.current.x) * strength,
                  y: (slingPosition.y - mousePosition.current.y) * strength,
                };

                if (mousePosition.current.y > slingPosition.y && mousePosition.current.x > 0 && mousePosition.current.x < 600 ) {
                    World.remove(engine.current.world, slingshotRef.current.sling);
                    slingshotRef.current = null;
                    Matter.Body.applyForce(birdRef.current.body, birdPosition, force);
                    setBirdReleased(!birdReleased);
                    setTimeout(()=>{
                      const x_bird = birdRef.current.body.position.x
                      const y_bird = birdRef.current.body.position.y
                      const gameWindow = document.getElementsByClassName('game-window')[0];
                      const gameWindowRect = gameWindow.getBoundingClientRect();
                      const x = x_bird - gameWindowRect.left;
                      const y = y_bird - gameWindowRect.top;

                  if (x < 150 && y < 160) { setblock1(false); }
                  else if (x >= 150 && x < 300 && y < 160) { setblock2(false); }
                  else if (x >= 300 && x < 450 && y < 160) { setblock3(false); }
                  else if (x >= 450 && x < 600 && y < 160) { setblock4(false); }
                  else if (x < 150 && y >= 160 && y < 320) { setblock5(false); }
                  else if (x >= 150 && x < 300 && y >= 160 && y < 320) { setblock6(false); }
                  else if (x >= 300 && x < 450 && y >= 160 && y < 320) { setblock7(false); }
                  else if (x >= 450 && x < 600 && y >= 160 && y < 320) { setblock8(false); }
                  else if (x < 150 && y >= 320 && y < 480) { setblock9(false); }
                  else if (x >= 150 && x < 300 && y >= 320 && y < 480) { setblock10(false); }
                  else if (x >= 300 && x < 450 && y >= 320 && y < 480) { setblock11(false); }
                  else if (x >= 450 && x < 600 && y >= 320 && y < 480) { setblock12(false); }
                  else if (x < 150 && y >= 480 && y < 640) { setblock13(false); }
                  else if (x >= 150 && x < 300 && y >= 480 && y < 640) { setblock14(false); }
                  else if (x >= 300 && x < 450 && y >= 480 && y < 640) { setblock15(false); }
                  else if (x >= 450 && x < 600 && y >= 480 && y < 640) { setblock16(false); }
                  else if (x < 150 && y >= 640 && y < 800) { setblock17(false); }
                  else if (x >= 150 && x < 300 && y >= 640 && y < 800) { setblock18(false); }
                  else if (x >= 300 && x < 450 && y >= 640 && y < 800) { setblock19(false); }
                  else if (x >= 450 && x < 600 && y >= 640 && y < 800) { setblock20(false); }
                    }, 5000)
                }
                else {
                  World.remove(engine.current.world, birdRef.current.body);
                  World.remove(engine.current.world, slingshotRef.current.sling);
                  bird = new Bird(300, 820, 25, engine.current.world, birdImage);
                  birdRef.current = bird
                  const bounce = 5 * (Math.random() - 0.5);
                  slingshot = new SlingShot(300 + bounce, 800 + bounce, bird.body, engine.current.world);
                  slingshotRef.current = slingshot
                }
            }
        }
    };

    const getAllCelebs = () => {
        getShowCharacters().then(({ data }) => {
        let celebURLs = []
        for (let i = 0; i < 5; i++) {
          celebURLs.push(data[i].person.image.original)
        }
        setCelebURLs(celebURLs);
      })
    }

    const handleSubmit = (e) => {
        console.log(e.target[0].value)
        if(celebName === e.target[0].value){
          //tweek the REGEX
          console.log("CORRECT!")
        }else{
          console.log("WRONG!!")
        }
    }


    return (
        <>
          <div className='game-window-and-button-container'>
            <div>
              <div className='game-window'
                tabIndex={0}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                // onClick={handleClick}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
              >
                <div ref={scene} style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
                <GameTimer celebURLs={celebURLs}/>
            <div className="block-container">
              <div className={block1 ? 'one' : 'removeBlock'} ></div>
              <div className={block2 ? 'two' : 'removeBlock'}></div>
              <div className={block3 ? 'three' : 'removeBlock'}></div>
              <div className={block4 ? 'four' : 'removeBlock'}></div>
              <div className={block5 ? 'five' : 'removeBlock'}></div>
              <div className={block6 ? 'six' : 'removeBlock'}></div>
              <div className={block7 ? 'seven' : 'removeBlock'}></div>
              <div className={block8 ? 'eight' : 'removeBlock'}></div>
              <div className={block9 ? 'nine' : 'removeBlock'}></div>
              <div className={block10 ? 'ten' : 'removeBlock'}></div>
              <div className={block11 ? 'eleven' : 'removeBlock'}></div>
              <div className={block12 ? 'twelve' : 'removeBlock'}></div>
              <div className={block13 ? 'thirteen' : 'removeBlock'}></div>
              <div className={block14 ? 'fourteen' : 'removeBlock'}></div>
              <div className={block15 ? 'fifteen' : 'removeBlock'}></div>
              <div className={block16 ? 'sixteen' : 'removeBlock'}></div>
              <div className={block17 ? 'seventeen' : 'removeBlock'}></div>
              <div className={block18 ? 'eighteen' : 'removeBlock'}></div>
              <div className={block19 ? 'nineteen' : 'removeBlock'}></div>
              <div className={block20 ? 'twenty' : 'removeBlock'}></div>
            </div>
          </div>
          <br />  <br />  <br /> <br />  <br />  <br />  <br />  <br />  <br />  <br />  <br />
          <form onSubmit={handleSubmit}>
            <input onChange={(e)=> setAnswer(e.target.value)} value={answer} type={'text'} placeholder={'Your Answer'}/>
            <button type='Submit'> Click to Submit</button>
          </form>
        <div>
        </div>
        </>
      )
}

export default Launcher