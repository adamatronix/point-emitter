import * as P5 from 'p5';
import PointMass from "./PointMass";

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
        this.points.forEach((point:PointMass) => {
          point.update((position: any) => {
            p5.rect(position.x, position.y, 120, 200); 
          });
        });
      }
    }

  }
}

export default Solitaire;