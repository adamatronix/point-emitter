import * as P5 from 'p5';
import PointMass from "./PointMass";

class Solitaire {
  frameRate:number = 60;
  point:PointMass;
  points:any = Array();
  container:HTMLDivElement;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.point = new PointMass({ 
      velX: 5,
      velY: 0,
      position: {x: 700, y: 100 },
      points: this.points, 
      frameRate: this.frameRate
    });
    this.points.push(this.point);
    new P5(this.sketch);
  }

  sketch = (p5: P5) => {
    
    p5.setup = () => {
      const canvas = p5.createCanvas(this.container.offsetWidth, this.container.offsetHeight);
      canvas.parent(this.container);
      canvas.style('position', 'absolute');
      canvas.style('left', 0);
      canvas.style('top', 0);
      canvas.style('z-index', 1);
      p5.frameRate(this.frameRate);
    }

    p5.draw = () => {
      p5.clear();
      this.points.forEach((point:PointMass) => {
        point.update((position: any) => {
          p5.circle(position.x, position.y, 10); 
        });
      });
    }

  }
}

export default Solitaire;