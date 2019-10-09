import GameContext from "./GameContext";

class Bullet {
  private position = { x: 0, y: 0 };
  private target = { x: 0, y: 0 };
  private speed;
  public id;
  private range;

  constructor(id, position, target, range, speed) {
    this.id = id;
    this.position = position;
    this.target = target;
    this.speed = speed;
    this.range = range;
  }
  public render = () => {
    const { context } = GameContext;
    let { x, y } = this.position;

    context.save();
    context.beginPath();

    context.fillStyle = "black";
    context.arc(x, y, 5, 10, 20 * Math.PI);
    context.stroke();
    context.closePath();
    context.restore();
  };

  public getPos = () => {
    return this.position;
  };
  public update = () => {
    let { position, target, speed } = this;

    this.position.x += this.speed * 0.4;
    this.position.y += this.speed * -1;
  };
}

export default Bullet;
