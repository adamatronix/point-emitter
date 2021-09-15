import * as P5 from 'p5';
import PointMass from "./PointMass";
import { hasCollided } from './utils/hasCollided';

class Solitaire {
  frameRate:number = 100;
  point:PointMass;
  points:any = Array();
  container:HTMLDivElement;

  constructor(container: HTMLDivElement) {
    this.container = container;
    
    new P5(this.sketch);
  }

  sketch = (p5: P5) => {
    const self = this;
    
    p5.setup = () => {
      const canvas = p5.createCanvas(this.container.offsetWidth, this.container.offsetHeight);
      canvas.parent(this.container);
      canvas.style('position', 'absolute');
      canvas.style('left', 0);
      canvas.style('top', 0);
      canvas.style('z-index', 1);
      p5.frameRate(this.frameRate);
    }

    p5.mousePressed = function () {
      self.point = new PointMass({ 
        velX: {min: -5, max: 5},
        velY: {min: -5, max: 0},
        position: {x: p5.mouseX, y: p5.mouseY},
        points: self.points,
        frameRate: self.frameRate,
        boundaries: { width: self.container.offsetWidth , height: self.container.offsetHeight },
        radius: {width: 120, height: 200}
      });
      self.points.push(self.point);
    }

    p5.draw = () => {
      if(this.points.length > 0) {
        this.points.forEach((point:PointMass, pointIndex:number) => {
          point.update((position: any) => {
            p5.rect(position.x, position.y, point.radius.width, point.radius.height); 
            let pointMod = {
              x: position.x,
              y: position.y,
              h: point.radius.height,
              w: point.radius.width
            }

            //detect other points for collision effects
            this.points.forEach((other:PointMass, otherIndex:number) => {
              if(pointIndex !== otherIndex) {
                let otherMod = {
                  x: other.position.x,
                  y: other.position.y,
                  h: other.radius.height,
                  w: other.radius.width
                }

                let collision = hasCollided(pointMod,otherMod);

                if(collision === 'top') {
                  point.velocity.y *= point.restitution;
                  point.position.y = other.position.y - point.radius.height;
                }

                if(collision === 'bottom') {
                  point.velocity.y *= point.restitution;
                  point.position.y = other.position.y + other.radius.height;
                }

                if(collision === 'left') {
                  point.velocity.x *= point.restitution;
                  point.position.x = other.position.x - point.radius.width;
                }

                if(collision === 'right') {
                  point.velocity.x *= point.restitution;
                  point.position.x = other.position.x + other.radius.width;
                }

              }
            });

          });
        });
      }
    }

  }
}

export default Solitaire;