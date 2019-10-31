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

  getAmmo = type => {
    return this.bulletPouch[type];
  };
  pickUpAmmo = (type, qty) => {
    this.bulletPouch[type] += qty;
  };
  loadAmmo = (bulletType, magSize, mag) => {
    let deltaAmmo = magSize - mag;
    if (this.bulletPouch[bulletType] >= deltaAmmo)
      this.bulletPouch[bulletType] -= deltaAmmo;
  };

  pickUpWeapon = weapon => {
    this.items[0] = weapon;
  };

  dropWeapon = () => {
    this.items[0] = null;
  };
}

export default Inventory;
