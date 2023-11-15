import { useEffect, useRef, useState } from 'react'
import Matter, { Engine, Render, Bodies, World, } from 'matter-js'
import { Bird } from '../Game-components.jsx/game-objects/bird'
import { SlingShot } from '../Game-components.jsx/game-objects/slingshot'
import birdImage from '../Game-components.jsx/game-objects/birdImage.gif'
import preFireMole from '../Game-components.jsx/game-objects/preFireMole.png'
import { getShowCharacters } from '../axios'
import GameTimer from './GameTimer'
import explosion from '../Game-components.jsx/game-objects/explosion.jpeg'

import styles from "./Launcher.module.css"


function Launcher(){
    console.log('heloooooooo')
    const [birdReleased, setBirdReleased] = useState(false)
    const [celebURLs, setCelebURLs] = useState([])
    const [answer, setAnswer] = useState('');
    const [celebNames, setCelebNames] = useState([])
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
    const wallLineRef = useRef(null);
    const mousePosition = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const slingshotRef = useRef(null);
    const trajectoryLineRef = useRef(null);
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
        const chamfer = { radius: 10 };

        World.add(engine.current.world, [
            Bodies.rectangle(gameWindowWidth / 2, wallThickness / 2, gameWindowWidth, 81, { isStatic: true, restitution: elasticity, chamfer: chamfer }),
            Bodies.rectangle(wallThickness / 2, gameWindowHeight / 2, wallThickness, gameWindowHeight, { isStatic: true, restitution: elasticity, chamfer: chamfer }),
            Bodies.rectangle(gameWindowWidth / 2, gameWindowHeight -  wallThickness / 2, gameWindowWidth, wallThickness, { isStatic: true, restitution: elasticity, chamfer: chamfer }),
            Bodies.rectangle(gameWindowWidth - wallThickness / 2, gameWindowHeight / 2, wallThickness, gameWindowHeight, { isStatic: true, restitution: elasticity,  }),
        ])

        Matter.Runner.run(engine.current)

        Render.run(render)

        bird = new Bird(300, 820, 25, engine.current.world, preFireMole);
        birdRef.current = bird
        const bounce = 5 * (Math.random() - 0.5);
        slingshot = new SlingShot(300 + bounce, 850 + bounce, bird.body, engine.current.world);
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
                bird = new Bird(300 * Math.random(), 900, 25, engine.current.world, preFireMole);
                birdRef.current = bird;
                const bounce = 5 * (Math.random() - 0.5);
                slingshot = new SlingShot(300 + bounce, 850 + bounce, bird.body, engine.current.world);
                slingshotRef.current = slingshot;
            }
        }, 5100);
        return () => clearTimeout(newBallTimer);
    }, [birdReleased]);

    const handleMouseMove = (e) => {
        if (isDragging.current) {
            const gameWindow = document.getElementsByClassName('game-window')[0];
            const gameWindowRect = gameWindow.getBoundingClientRect();
            const x = e.clientX - gameWindowRect.left;
            const y = e.clientY - gameWindowRect.top;

            mousePosition.current = { x, y };
            slingshotRef.current.sling.render.strokeStyle =  (Matter.Vector.magnitude(Matter.Vector.sub(slingshotRef.current.sling.pointA, birdRef.current.body.position)) <  150 && birdRef.current.body.position.y > 850)? 'green' : 'red';
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
                const strength = 0
                const force = {
                  x: (slingPosition.x - birdPosition.x) * strength,
                  y: (slingPosition.y - birdPosition.y) * strength,
                };
               

                if (slingshotRef.current.sling.render.strokeStyle === 'green') {
                    birdRef.current.body.render.sprite.texture = birdImage
                    World.remove(engine.current.world, slingshotRef.current.sling);
                    slingshotRef.current = null;
                    Matter.Body.applyForce(birdRef.current.body, birdPosition, force);
                    setBirdReleased(!birdReleased);

                       // Log bird position every 0.1 seconds
                    const intervalId = setInterval(() => {
                    const x_bird = birdRef.current.body.position.x;
                    const y_bird = birdRef.current.body.position.y;
                    const x_mouse = mousePosition.current.x;
                    const y_mouse = mousePosition.current.y;
                    console.log(`Bird position: (${x_bird}, ${y_bird})`, `Mouse position: (${x_mouse}, ${y_mouse})`);
                  }, 500);

                    setTimeout(() => {
                      const wallLine = Bodies.rectangle(600 / 2, 1000 - 150 - 20 / 2, 600,  20, { isStatic: true, restitution: 1});
                      wallLineRef.current = wallLine
                      World.add(engine.current.world, [wallLine])
                    }, 500)

                    setTimeout(() => {
                      birdRef.current.body.render.sprite = null;
                      birdRef.current.body.render.fillStyle = 'red';
                    }, 4800)


                    setTimeout(()=>{
                      clearInterval(intervalId);
                      const x_bird = birdRef.current.body.position.x
                      const y_bird = birdRef.current.body.position.y
                      const gameWindow = document.getElementsByClassName('game-window')[0];
                      const gameWindowRect = gameWindow.getBoundingClientRect();
                      console.log(gameWindowRect.left, gameWindowRect.top, x_bird, y_bird)
                      const x = x_bird  //- gameWindowRect.left;
                      const y = y_bird  //- gameWindowRect.top - 51;
                      World.remove(engine.current.world, wallLineRef.current);
                      const radiusOfExplosion = 150
                      birdRef.current.body.circleRadius=radiusOfExplosion * 2/3
                      const blocks = [
                        { x: 75, y: 80, setBlock: setblock1 },
                        { x: 225, y: 80, setBlock: setblock2 },
                        { x: 375, y: 80, setBlock: setblock3 },
                        { x: 525, y: 80, setBlock: setblock4 },
                        { x: 75, y: 240, setBlock: setblock5 },
                        { x: 225, y: 240, setBlock: setblock6 },
                        { x: 375, y: 240, setBlock: setblock7 },
                        { x: 525, y: 240, setBlock: setblock8 },
                        { x: 75, y: 400, setBlock: setblock9 },
                        { x: 225, y: 400, setBlock: setblock10 },
                        { x: 375, y: 400, setBlock: setblock11 },
                        { x: 525, y: 400, setBlock: setblock12 },
                        { x: 75, y: 560, setBlock: setblock13 },
                        { x: 225, y: 560, setBlock: setblock14 },
                        { x: 375, y: 560, setBlock: setblock15 },
                        { x: 525, y: 560, setBlock: setblock16 },
                        { x: 75, y: 720, setBlock: setblock17 },
                        { x: 225, y: 720, setBlock: setblock18 },
                        { x: 375, y: 720, setBlock: setblock19 },
                        { x: 525, y: 720, setBlock: setblock20 }
                      ];
                      
                      World.remove(engine.current.world, wallLineRef.current);
                      
                      for (let i = 0; i < blocks.length; i++) {
                        const { x: blockX, y: blockY, setBlock } = blocks[i];
                        const distance = Math.sqrt((x - blockX) ** 2 + (y - blockY) ** 2);
                        if (distance <= radiusOfExplosion) {
                          setBlock(false);
                        }
                      }
                    }, 5000)
                }
                else {
                  World.remove(engine.current.world, birdRef.current.body);
                  World.remove(engine.current.world, slingshotRef.current.sling);
                  bird = new Bird(300, 900, 25, engine.current.world, preFireMole);
                  birdRef.current = bird
                  const bounce = 5 * (Math.random() - 0.5);
                  slingshot = new SlingShot(300 + bounce, 850 + bounce, bird.body, engine.current.world);
                  slingshotRef.current = slingshot
                }
            }
        }
    };

    const getAllCelebs = () => {
        getShowCharacters().then(({ data }) => {
        let celebURLs = []
        let celebNames = []
        for (let i = 0; i < 5; i++) {
          celebURLs.push(data[i].person.image.original)
          celebNames.push(data[i].person.name)
        }
        setCelebURLs(celebURLs);
        setCelebNames(celebNames);
      })
    }



    
 const handleClick = (e) => {
      const x_mouse = e.clientX
      const y_mouse = e.clientY
      const gameWindow = document.getElementsByClassName('game-window')[0];
      const gameWindowRect = gameWindow.getBoundingClientRect();
      const x = x_mouse - gameWindowRect.left;
      const y = y_mouse - gameWindowRect.top - 51;

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
                onClick={handleClick}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
              >
                <div ref={scene} style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
                <GameTimer celebNames={celebNames} celebURLs={celebURLs} setblock1={setblock1}  setblock2={setblock2}  setblock3={setblock3}  setblock4={setblock4}  setblock5={setblock5}  setblock6={setblock6}  setblock7={setblock7}  setblock8={setblock8}  setblock9={setblock9} setblock10={setblock10}  setblock11={setblock11}  setblock12={setblock12} setblock13={setblock13}  setblock14={setblock14}  setblock15={setblock15}  setblock16={setblock16}  setblock17={setblock17} setblock18={setblock18}  setblock19={setblock19}  setblock20={setblock20}/>
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
        <div>
        </div>
        </>
      )
}

export default Launcher