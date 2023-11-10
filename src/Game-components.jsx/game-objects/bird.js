import Matter, { Engine, Render, Bodies, World, Constraint} from 'matter-js'
import React, { Component } from 'react';

class Bird {
  constructor(x, y, r, world, birdImage) {
    const options = {
      restitution: 1,
    };
    this.body = Matter.Bodies.circle(x, y, r, options);
    Matter.Body.setMass(this.body, this.body.mass * 4);
    Matter.World.add(world, this.body);
    this.r = r;
    this.birdImage = birdImage
  }

  show() {
    console.log('hello')  
    const pos = this.body.position;
    const angle = this.body.angle;
  }
}

export {Bird}