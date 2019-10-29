import GameContext from "../GameContext";
import FireArm from "../FireArm";

class HeadsUpDisplay {
  private health;
  private magCapacity;
  private mag;
  private ammo;
  private selectedWeapon;
  private weapon;

  constructor(health, weapon: FireArm, ammo) {
    this.weapon = weapon;
    this.health = health;
    this.magCapacity = weapon.getMagCap();
    this.mag = weapon.getMag();
    this.ammo = ammo;
  }

  render() {
    const { context } = GameContext;
    let { width, height } = context.canvas;
    context.save();
    context.beginPath();
    context.fillStyle = "white";
    context.fillText(this.mag + "/" + this.ammo, 50, height - 25, 50);
    context.fillText(this.weapon.getName(), 120, height - 25, 60);
    context.font = "50px times new roman";
    context.fill();
    context.closePath();
    context.restore();
  }

  update() {
    this.magCapacity = this.weapon.getMagCap();
    this.mag = this.weapon.getMag();
  }
}

export default HeadsUpDisplay;
