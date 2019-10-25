import GameContext from "./GameContext";
import Character from "./Character";
import HP from "./Hp";
import spritesheet from "/assets/ZombieToast.png";

class Zombie {
  private position = { x: 0, y: 0 };
  private target = { x: 0, y: 0 };
  private speed = 1;
  private angle = { x: 0, y: 0 };
  public damage = 5;
  private id;
  private radius = 20;
  private health = 0;
  private currentFrame = 0;
  private frameCounter = 10;
  private characterWidth: number = 70;
  private characterHeight: number = 100;
  public healthBar: HP = null;
  private characterImage: HTMLImageElement = new Image();

  constructor(position, damage, radius, health, speed) {
    this.id = Date.now() + " " + position.x + "" + position.y;
    this.position = position;
    this.speed = speed;
    this.characterImage.src = spritesheet;
    this.health = health;

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
    this.healthBar = new HP(this.position, this.health, this.radius);
  }

  update() {
    //update health bar

    this.healthBar.update();
    this.healthBar.updateHealth(this.health);

    //update path to find player
    let deltaX = this.target.x - this.position.x;
    let deltaY = this.target.y - this.position.y;
    let angle = Math.atan2(deltaY, deltaX);

    this.angle.x = Math.cos(angle);
    this.angle.y = Math.sin(angle);

    this.position.x += this.speed * this.angle.x;
    this.position.y += this.speed * this.angle.y;

    if (this.frameCounter % 10 === 0)
      this.currentFrame = (this.currentFrame + 1) % 8;
  }
  render() {
    const { context } = GameContext;
    let { x, y } = this.position;
    this.healthBar.render();
    context.save();
    context.beginPath();
    const paddingY = 35;
    const paddingX = 19;
    const spriteHeight = 64;
    const spriteWidth = 45;

    context.drawImage(
      this.characterImage,
      this.currentFrame * (spriteWidth + paddingX),
      paddingY,
      spriteWidth,
      spriteHeight,
      x - 47.5,
      y - 10,
      this.characterWidth,
      this.characterHeight
    );
    context.fillStyle = "green";

    // context.moveTo(x, y);
    // context.lineTo(this.target.x, this.target.y);
    context.stroke();
    context.fill();
    context.strokeStyle = "lime";
    context.closePath();
    context.restore();
  }
}
export default Zombie;
