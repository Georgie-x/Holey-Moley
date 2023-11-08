import { useEffect, useRef, useState } from 'react'
import Matter, { Engine, Render, Bodies, World, } from 'matter-js'
import { Bird } from './game-objects/bird'
import { SlingShot } from './game-objects/slingshot'
import birdImage from './game-images/bird.gif'
import { getShowCharacters } from '../axios'



function Comp (props) {
  const [celebURL, setCelebURL] = useState('')
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

   /*  const socket = io.connect("http://localhost:3001");
    socket.on("new_game", () => {
      setTimer(30); // Reset the timer to 30 seconds
    }); */


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
      const blackLine = Bodies.rectangle(
        gameWindowWidth / 2, 
        4*gameWindowHeight / 5, 
        gameWindowWidth, 
        5, 
        {
          isStatic: true, 
          render: {
            fillStyle: 'black', 
          },
        }
      ); 
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


  const handleMouseMove = (e) => {
    if (isDragging.current) {
      mousePosition.current = { x: e.clientX, y: e.clientY };
  };
}

  const handleMouseDown = (e) => {
    if(birdRef.current && slingshotRef.current){
      console.log(birdRef.current.body.position)
      isDragging.current = true;
    }
    
  };

  const handleMouseUp = (e) => {
    if (isDragging.current) {
      isDragging.current = false;
      if (birdRef.current && slingshotRef.current) {
        mousePosition.current = { x: e.clientX, y: e.clientY };

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
  
/*   useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);


    return () => {
      clearInterval(intervalId);
    };
  }, [timer]); */


  const generateNewMole = (e) => {
    if (e.key === ' ' || e.key === 'Spacebar' ){
      if (birdRef.current && slingshotRef.current) {
        World.remove(engine.current.world, birdRef.current.body);
        World.remove(engine.current.world, slingshotRef.current.sling);
      }
      bird = new Bird(300 * Math.random(), 900, 25, engine.current.world, birdImage); //creates a new matter-js component
      birdRef.current = bird //allows us to interact within react
      const bounce = 5 * (Math.random() - 0.5);
      slingshot = new SlingShot(300 + bounce, 850 + bounce, bird.body, engine.current.world);
      slingshotRef.current = slingshot
    }
  }

  const displayNewCeleb = () => {
    getShowCharacters().then(({ data }) => {

      const randomId = Math.floor(data.length * Math.random())
      const celebURL = data[randomId].person.image.original;
      setCelebURL(celebURL);

    })
  }


  return (
    <>
      <div className='game-window-and-button-container'>

        <div className='game-window'>
          <div
            tabIndex={0}
            onKeyDown={generateNewMole}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          >
            <div ref={scene} style={{ width: '100%', height: '100%' }} />
          </div>
          <img className="celeb-picture" src={celebURL} alt="a picture of a random celebrity" />
        </div>
        <div className="gameButton">
          <button onClick={() => {
            displayNewCeleb()
            /* onNewGame() */
          }}>New Game</button>
          <h3 className='timer'>Time Remaining: 30 seconds</h3>
        </div>
      </div>
    </>
  )
}

export default Comp