import GameContext from "./GameContext";

class Bullet {
  private position = { x: 0, y: 0 };
  private target = { x: 0, y: 0 };
  private speed = 0;
  public id;
  private radius = 2;
  private range;
  private angleX = 1;
  private angleY = 0;
  private damage = 10;

  constructor(id, position, target, range, speed, damage) {
    this.id = id;
    this.position = position;
    this.target = target;
    this.speed = 10;
    this.range = range;
    this.damage = damage;
    this.setAngle();
  }

  public getDamage = () => {
    return this.damage;
  };

  //find direction trajectory for bullet
  public setAngle = () => {
    let deltaX = this.target.x - this.position.x;
    let deltaY = this.target.y - this.position.y;

    let angle = Math.atan2(deltaY, deltaX);

    this.angleX = Math.cos(angle);
    this.angleY = Math.sin(angle);

    this.position.x = this.position.x + 50 * Math.cos(angle);
    this.position.y = this.position.y + 50 * Math.sin(angle);
  };

  public render = () => {
    const { context } = GameContext;
    let { x, y } = this.position;

    context.save();
    context.beginPath();

    context.fillStyle = "white";
    context.arc(x, y, this.radius, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.restore();
  };

  public getPosition = () => {
    return { x: this.position.x, y: this.position.y, radius: this.radius };
  };
  public update = () => {
    let { position, target, speed } = this;

    this.position.x += this.angleX * 1 * this.speed;
    this.position.y += this.angleY * this.speed;
  };
}

export default Bullet;
