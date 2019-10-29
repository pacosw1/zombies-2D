import Gun from "./FireArm";
import GameContext from "./GameContext";
import Bullet from "./Bullet";

class HandGun extends Gun {
  private position = { x: 0, y: 0 };
  private target = { x: 0, y: 0 };
  private width = 10;
  private height = 5;
  private range = 0;
  private bulletSpeed = 10;

  private magSize = 12;
  private magazine;
  private maxRange = 5;
  private fireRate = 3;

  update = () => {};

  public reload = () => {
    this.magazine = this.magSize;
  };

  render = () => {
    const { context } = GameContext;
    let { x, y } = this.position;

    context.save();
    context.beginPath();
    context.fillStyle = "black";
    context.fillRect(x, y, this.width, this.height);
    context.closePath();
    context.restore();
  };
}

export default HandGun;
