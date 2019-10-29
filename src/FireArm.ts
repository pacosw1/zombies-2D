import GameContext from "./GameContext";
import Bullet from "./Bullet";

abstract class FireArm {
  abstract name;
  abstract fireRate;
  abstract reloadSpeed;
  abstract range;
  abstract magSize;
  abstract damage;
  abstract accuracy;
  abstract lastFired;
  abstract reloading;
  abstract mag;
  public abstract render = () => {};
  public abstract update = () => {};

  public fire = (
    position,
    target,
    bullets: Bullet[],
    time,
    lastFired,
    fireRate
  ) => {
    //waits n seconds before firing a bullet (based on fire rate)
    if (this.mag < 0) {
      //play empty sound
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

  public getName = () => {
    return this.name;
  };

  public getMag = () => {
    return this.mag;
  };

  public getMagCap = () => {
    return this.magSize;
  };

  public reload = () => {
    // this.reloading = true;
    this.mag = this.magSize;
  };
}

export default FireArm;
