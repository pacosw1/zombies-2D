import GameContext from "./GameContext";

class Bullet {
  private position = { x: 0, y: 0 };
  private target = { x: 0, y: 0 };
  private speed = 20;
  public id;
  private radius = 2;
  private range;
  private angleX = 1;
  private angleY = 0;
  private damage = 5;

  constructor(id, position, target, range, speed) {
    this.id = id;
    this.position = position;
    this.target = target;
    this.speed = speed;
    this.range = range;
    this.setAngle();
  }

  public bulletData = () => {
    return {
      radius: this.radius
    };
  };

  public getDamage = () => {
    return this.damage;
  };
  public setAngle = () => {
    let deltaX = this.target.x - this.position.x;
    let deltaY = this.target.y - this.position.y;

    let angle = Math.atan2(deltaY, deltaX);

    this.angleX = Math.cos(angle);
    this.angleY = Math.sin(angle);

    this.position.x = this.position.x + 20 * Math.cos(angle);
    this.position.y = this.position.y + 20 * Math.sin(angle);

    // if (this.target.x > this.position.x) this.position.x += 50 / 2;
    // if (
    //   this.position.x > this.position.x - 50 / 2 &&
    //   this.position.x < this.position.x + 50 / 2
    // ) {
    //   if (this.target.y <= this.position.y) this.position.y -= 50 / 2;
    //   else if (this.target.y >= this.position.y) this.position.y += 50 / 2;
    // }
  };

  public render = () => {
    const { context } = GameContext;
    let { x, y } = this.position;

    context.save();
    context.beginPath();

    context.fillStyle = "black";
    context.arc(x, y, this.radius, 0, 2 * Math.PI);
    context.stroke();
    context.closePath();
    context.restore();
  };

  public getPosition = () => {
    return { x: this.position.x, y: this.position.y, radius: this.radius };
  };
  public update = () => {
    console.log(this.angleX);
    let { position, target, speed } = this;

    this.position.x += this.angleX * this.speed;
    this.position.y += this.angleY * this.speed;
  };
}

export default Bullet;
