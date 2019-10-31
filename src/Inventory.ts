import GameContext from "./GameContext";

class Inventory {
  private capacity;
  private weight;
  private items = [];
  private bulletPouch = {
    gun: 0,
    ar: 0,
    shotgun: 0,
    sniper: 0
  };

  constructor(weapon) {
    this.capacity = 10;
    this.weight = 0;
    this.bulletPouch.ar = 100;
    this.items.push(weapon, this.bulletPouch);
  }

  update() {
    console.log(this.bulletPouch);
  }

  getAmmo = type => {
    return this.bulletPouch[type];
  };
  pickUpAmmo = (type, qty) => {
    this.bulletPouch[type] += qty;
  };
  loadAmmo = () => {
    let { getMag, getMagCap, getType, load } = this.items[0];
    let deltaAmmo = getMagCap() - getMag();
    if (this.bulletPouch[getType()] >= deltaAmmo) {
      this.bulletPouch[getType()] -= deltaAmmo;
      return true;
    } else {
      load(this.bulletPouch[getType()]);
      this.bulletPouch[getType()] = 0;
    }
    return false;
  };

  pickUpWeapon = weapon => {
    this.items[0] = weapon;
  };

  dropWeapon = () => {
    this.items[0] = null;
  };
}

export default Inventory;
