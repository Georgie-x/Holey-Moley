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

  }

  export { SlingShot}