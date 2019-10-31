import FireArm from "../FireArm";

class AssualtRifle extends FireArm {
  fireRate = 10;
  range = 10;
  speed = 7;
  damage = 5;
  reloadSpeed = 0.8;
  magSize = 10000;
  reloading = false;
  type = "ar";
  accuracy = 1;
  lastFired = new Date().getTime();
  private reloadStart = 0;
  mag = 40;

  constructor() {
    super();
    this.lastFired = new Date().getTime();
  }

  render = () => {};
  update = () => {
    if (this.reloading) {
      if (20 - this.reloadStart / 1000 >= this.reloadSpeed)
        this.reloading = false;
    }
  };
}

export default AssualtRifle;
