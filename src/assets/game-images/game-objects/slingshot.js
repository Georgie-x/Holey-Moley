import Matter, { Engine, Render, Bodies, World, Constraint} from 'matter-js'
import React, { Component } from 'react';

class SlingShot {
    constructor(x, y, body, world) {
      const options = {
        pointA: {
          x: x,
          y: y
        },
        bodyB: body,
        stiffness: 0.001,
        length: 100
      };
      this.sling = Constraint.create(options);
      World.add(world, this.sling);
    }
  
   /*  fly() {
      this.sling.bodyB = null;
    }
  
    show() {
      if (this.sling.bodyB) {
        stroke(0);
        strokeWeight(4);
        const posA = this.sling.pointA;
        const posB = this.sling.bodyB.position;
        line(posA.x, posA.y, posB.x, posB.y);
      }
    }
  
    attach(body) {
      this.sling.bodyB = body;
    } */
  }

  export { SlingShot}