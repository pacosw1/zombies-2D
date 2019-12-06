import GameContext from "./GameContext";
import Bullet from "./Bullet";
import empty from "../assets/empty.mp3";
import reload from "../assets/reload.mp3";

abstract class FireArm {
  abstract type;
  abstract fireRate;
  abstract reloadSpeed;
  abstract range;
  abstract magSize;
  abstract damage;
  abstract accuracy;
  abstract lastFired;
  abstract reloading;
  abstract mag;
  private emptyGun = new Audio(empty);
  private reloadGUn = new Audio(reload);

  public abstract render = () => {};
  public abstract update = () => {};

  public getMag = () => {
    return this.mag;
  }

  public fire = (
    position,
    target,
    bullets: Bullet[],
    time,
    lastFired,
    fireRate
  ) => {
    console.log('magSIZE', this.ammo);
    //waits n seconds before firing a bullet (based on fire rate)
    if (this.mag === 0) {
      this.emptyGun.play();
      console.log("empty"); //play empty sound
    } else if (!this.reloading && this.mag >= 1) {
      //if bullets in mag fire them
      console.log("curr time: " + (time - lastFired) / 1000);
      if ((time - lastFired) / 1000 >= 1 / fireRate) {
        console.log("fire");
        bullets.push(
          new Bullet(
            Date.now() + target.y,
            position,
            target,
            10,
            10,
            this.damage
          )
        );
        this.lastFired = new Date().getTime(); //update last time a shot was fired
        this.mag--; //substract from magazine
      }
    }
  };

  public getType = () => {
    return this.type;
  };

  public getMag = () => {
    return this.mag;
  };

  public getMagCap = () => {
    return this.magSize;
  };

  public load = bullets => {
    this.mag += bullets;
  };

  public reload = () => {
    // this.reloading = true;
    this.reloadGUn.play();
    this.mag = this.magSize;
  };
}

export default FireArm;
