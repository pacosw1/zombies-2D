import GameContext from "./GameContext";
import Time from "./Time";
import Bullet from "./Bullet";
import spritesheet from "/assets/spritesheet.png";
import HP from "./HP";

type coords = [number, number];
export enum CharacterDirection {
  Left = -1,
  None = 0,
  Right = 1
}

class Character {
  private gravity = 9.8;
  private lastFired = 0;
  private health = 100;
  private healthBar: HP = null;
  private fireRate = 10;
  private time;
  private aim = { x: 0, y: 0 };
  private position = { x: 0, y: 0 };
  private direction = { x: 0, y: 0 };
  private characterWidth: number = 50;
  private characterHeight: number = 50;
  private frameCounter = 0;
  private currentFrame = 0;
  private radius = 20;
  private speed = 5;
  private firing = false;
  private bullets: Bullet[] = [];
  private characterImage: HTMLImageElement = new Image();

  constructor() {
    const { context } = GameContext;
    const { width, height } = context.canvas;
    this.characterImage.src = spritesheet;
    this.time = new Date().getTime();

    this.position = {
      x: (width - this.characterWidth) / 2,
      y: height * 0.75 - this.characterHeight
    };
    this.healthBar = new HP(this.position, this.health, this.radius);
  }

  //updates current mouse coordinates on screen
  public mouseMoveHandler = event => {
    this.aim.x = event.offsetX;
    this.aim.y = event.offsetY;
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

  //pops next bullet to be fired from local array
  public nextBullet = () => {
    return this.bullets.pop();
  };

  //checks if any bullets in array
  public anyBullets = () => {
    return this.bullets.length > 0;
  };

  //
  public fire = () => {
    //waits n seconds before firing a bullet (based on fire rate)
    if ((this.time - this.lastFired) / 1000 >= 1 / this.fireRate) {
      this.bullets.push(
        new Bullet(
          Date.now() + this.aim.y,
          {
            x: this.position.x,
            y: this.position.y
          },
          { x: this.aim.x, y: this.aim.y },
          10,
          10
        )
      );
      this.lastFired = new Date().getTime(); //update last time a shot was fired
    }
  };

  public moveLogic = xPos => {
    this.position.x += this.direction.x * this.speed;
    this.position.y += this.direction.y * this.speed;
  };

  public update = () => {
    //updates the health bar
    this.healthBar.updateHealth(this.health);
    this.healthBar.update();
    this.time = new Date().getTime();
    const { context } = GameContext;

    const { width, height } = context.canvas;
    let { x, y } = this.position;
    if (this.firing) {
      //add bullets to array while firing = true
      this.fire();
    }
    // this.jumpLogic(width, height, yPos);
    this.moveLogic(x);
  };

  public updateHealth = damage => {
    this.health -= damage;
  };

  public getPosition = () => {
    return {
      x: this.position.x,
      y: this.position.y,
      radius: this.radius
    };
  };

  public render = () => {
    const { context } = GameContext;
    let { x, y } = this.position;
    const paddingY = 4;
    const paddingX = 56.8;
    const spriteHeight = 85;
    const spriteWidth = 52;

    context.save();
    context.beginPath();

    this.healthBar.render(); //render health bar

    context.fillStyle = "red";
    context.arc(x, y, this.radius, 0, 2 * Math.PI);

    context.fill();
    context.closePath();
    context.restore();
  };
}

export default Character;

// public jumpLogic = (width, height, yPos) => {
//   if (yPos < height - 50 && !this.jumping) {
//     this.position[1] += this.gravity;
//   } else if (this.jumping) {
//     this.position[1] -= this.gravity;
//     if (this.position[1] <= height - 150) this.jumping = false;
//   }
// };
