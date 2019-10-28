import GameContext from "./GameContext";

class Damage {
  private value;
  private duration = 0.05;
  private time = 0;
  private size;
  private position = { x: 0, y: 0 };
  private id: String = "";

  constructor(value, duration, size, position) {
    this.value = value.toFixed(1);
    this.duration = duration;
    this.size = size;
    this.position = position;
    this.time = new Date().getTime();
    this.id = this.time + "" + this.value + this.duration + this.position + "";
  }

  render() {
    const { context } = GameContext;
    let { x, y } = this.position;
    console.log(this.value);
    context.save();
    context.beginPath();
    context.fillStyle = "white";
    context.fillText(this.value + "", x, y, 50);
    context.font = "50px times new roman";
    context.fill();
    context.closePath();
    context.restore();
  }

  getId = () => {
    return this.id;
  };
  getDuration = () => {
    return this.duration;
  };
  getTime = () => {
    return this.time;
  };

  update() {}
}

export default Damage;
