import GameContext from "./GameContext";
import Character from "./Character";
import HP from "./Hp";

class Zombie {
  private position = { x: 0, y: 0 };
  private target = { x: 0, y: 0 };
  private speed = 1;
  private angle = { x: 0, y: 0 };
  private damage = 5;
  private id;
  private radius = 20;
  private health = 100;
  public healthBar: HP = null;

  constructor(position, damage, radius) {
    this.id = Date.now() + " " + position.x + "" + position.y;
    this.position = position;
    this.damage = damage;
    this.radius = radius;
    this.init();
  }

  public updateHealth = damage => {
    this.health -= damage;
  };
  public getHealth = () => {
    return this.health;
  };
  public getId = () => {
    return this.id;
  };

  public getPostion = () => {
    return { x: this.position.x, y: this.position.y, radius: this.radius };
  };
  public follow(player: Character) {
    // update players position
    this.target = player.getPosition();
  }

  init() {
    this.healthBar = new HP(this.position, 100);
  }

  update() {
    console.log(this.healthBar);
    this.healthBar.update();

    let deltaX = this.target.x - this.position.x;
    let deltaY = this.target.y - this.position.y;
    let angle = Math.atan2(deltaY, deltaX);

    this.angle.x = Math.cos(angle);
    this.angle.y = Math.sin(angle);

    this.position.x += this.speed * this.angle.x;
    this.position.y += this.speed * this.angle.y;
  }
  render() {
    const { context } = GameContext;
    let { x, y } = this.position;
    this.healthBar.render();
    context.save();
    context.beginPath();

    context.fillStyle = "lime";
    context.arc(x, y, this.radius, 0, 2 * Math.PI);
    // context.moveTo(xPos, yPos);
    // context.lineTo(this.aim.x, this.aim.y);
    context.stroke();
    context.strokeStyle = "lime";
    context.closePath();
    context.restore();
  }
}
export default Zombie;
