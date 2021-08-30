import PointMass from "./PointMass";

class Solitaire {
  frameRate:number = 1/30;
  frameDelay:number = this.frameRate * 1000;
  point:PointMass;
  points:any = Array();

  constructor() {
    this.point = new PointMass({points: this.points});
    this.points.push(this.point);
    this.render();
  }

  render = () => {
    setTimeout(() => {
      this.points.forEach((point:PointMass) => {
        point.update(this.drawAt);
      });
      requestAnimationFrame(this.render);
    }, this.frameDelay);
  }

  drawAt = (position: any) => {
    console.log(position);
  }
}

export default Solitaire;