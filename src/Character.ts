import GameContext from "./GameContext";
import Time from "./Time";
import Bullet from "./Bullet";
import spritesheet from "/assets/spritesheet.png";

type coords = [number, number];
export enum CharacterDirection {
  Left = -1,
  None = 0,
  Right = 1
}

class Character {
  private gravity = 9.8;
  private lastFired = 0;
  private fireRate = 10;
  private time;
  private aim = { x: 0, y: 0 };
  private position: coords = [0, 0];
  private direction = { x: 0, y: 0 };
  private mouse = new MouseEvent("player");
  private characterWidth: number = 50;
  private characterHeight: number = 50;
  private frameCounter = 0;
  private currentFrame = 0;
  private speed = 5;
  private firing = false;
  private jumping = false;
  private bullets: Bullet[] = [];
  private hooking = false;
  private characterImage: HTMLImageElement = new Image();

  constructor() {
    const { context } = GameContext;
    const { width, height } = context.canvas;
    this.characterImage.src = spritesheet;
    this.time = new Date().getTime();

    this.position = [
      (width - this.characterWidth) / 2,
      height * 0.75 - this.characterHeight
    ];
  }

  public mouseMoveHandler = event => {
    if (!this.hooking) {
      this.aim.x = event.offsetX;
      this.aim.y = event.offsetY;
    }
  };
  public keydownHandler = (key: string) => {
    switch (key) {
      case "d":
        this.direction.x = 1;
        break;
      case "a":
        this.direction.x = -1;
        break;
      case "w":
        this.direction.y = -1;
        break;
      case "s":
        this.direction.y = 1;
        break;
      case "f":
        this.firing = true;
        break;
    }
  };

  public keyupHandler = (key: string) => {
    if (
      (key === "d" && this.direction.x === 1) ||
      (key === "a" && this.direction.x === -1)
    ) {
      this.direction.x = 0;
    }
    if (key === "f") this.firing = false;
    if (
      (key === "w" && this.direction.y === -1) ||
      (key === "s" && this.direction.y === 1)
    ) {
      this.direction.y = 0;
    }
  };

  public nextBullet = () => {
    return this.bullets.pop();
  };

  public anyBullets = () => {
    return this.bullets.length > 0;
  };

  public fire = () => {
    if ((this.time - this.lastFired) / 1000 >= 1 / this.fireRate) {
      this.bullets.push(
        new Bullet(
          Date.now() + this.aim.y,
          {
            x: this.position[0],
            y: this.position[1]
          },
          { x: this.aim.x, y: this.aim.y },
          10,
          10
        )
      );
      this.lastFired = new Date().getTime();
    }
  };

  public moveLogic = xPos => {
    this.position[0] += this.direction.x * this.speed;
    this.position[1] += this.direction.y * this.speed;
  };
  public jumpLogic = (width, height, yPos) => {
    if (yPos < height - 50 && !this.jumping) {
      this.position[1] += this.gravity;
    } else if (this.jumping) {
      this.position[1] -= this.gravity;
      if (this.position[1] <= height - 150) this.jumping = false;
    }
  };
  public update = () => {
    this.time = new Date().getTime();
    const { context } = GameContext;

    const { width, height } = context.canvas;
    let [xPos, yPos] = this.position;
    if (this.firing) {
      this.fire();
    }
    // this.jumpLogic(width, height, yPos);
    this.moveLogic(xPos);
  };

  public render = () => {
    const { context } = GameContext;
    let [xPos, yPos] = this.position;
    const paddingY = 4;
    const paddingX = 56.8;
    const spriteHeight = 85;
    const spriteWidth = 52;

    context.save();
    context.beginPath();

    context.fillStyle = "lime";
    context.arc(xPos, yPos, 20, 0, 2 * Math.PI);
    // context.moveTo(xPos, yPos);
    // context.lineTo(this.aim.x, this.aim.y);
    context.stroke();
    context.closePath();
    context.restore();
  };
}

export default Character;
