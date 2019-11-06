import GameContext from "./GameContext";
import FireArm from "./FireArm";

class GunBox {
  private name;
  private type;
  private position = { x: 0, y: 0 };
  private ammo;
  private weapon: FireArm;
  private price;
  private width = 50;
  private height = 50;
  private ammoPrice;
  private quantity;

  constructor(name, type, position, price, weapon) {
    this.name = name;
    this.type = type;
    this.price = price;
    this.position = position;
    this.weapon = this.weapon;
  }

  update() {}

  render() {
    const { context } = GameContext;
    let { x, y } = this.position;

    context.save();
    context.beginPath();
    context.fillText(this.name + "\n" + this.price, x, y);
    context.stroke();
    context.fillRect(x, y, this.width, this.height);
    context.fillStyle = "white";
    context.fill();
    context.closePath();
    context.restore();
  }
}

export default GunBox;
