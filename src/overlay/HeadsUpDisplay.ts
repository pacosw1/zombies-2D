import GameContext from "../GameContext";
import FireArm from "../FireArm";
import Inventory from "../Inventory";

class HeadsUpDisplay {
  private health;
  private magCapacity;
  private mag;
  private ammo;
  private selectedWeapon;
  private weapon;
  private ammoBag;
  private bag;

  constructor(health, weapon: FireArm, bag: Inventory) {
    this.weapon = weapon;
    this.health = health;
    this.magCapacity = weapon.getMagCap();
    this.mag = weapon.getMag();
    this.bag = bag;
    this.ammo = bag.getAmmo(weapon.getType());
  }

  render() {
    const { context } = GameContext;
    let { width, height } = context.canvas;
    context.save();
    context.beginPath();
    context.fillStyle = "white";
    context.fillText(this.mag + "/" + this.ammo, 50, height - 25, 50);
    context.fillText(this.weapon.getType(), 120, height - 25, 60);
    context.font = "50px times new roman";
    context.fill();
    context.closePath();
    context.restore();
  }

  update() {
    console.log(this.ammo);
    this.magCapacity = this.weapon.getMagCap();
    this.mag = this.weapon.getMag();
    this.ammo = this.bag.getAmmo(this.weapon.getType());
  }
}

export default HeadsUpDisplay;
