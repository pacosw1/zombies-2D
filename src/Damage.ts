import GameContext from "./GameContext";

class Damage {
  private value;
  private duration = 1;
  private size;
  private position = { x: 0, y: 0 };

  constructor(value, duration, size, position) {
    this.value = value;
    this.duration = duration;
    this.size = size;
    this.position = position;
  }

  render() {
    const { context } = GameContext;
    let { x, y } = this.position;
    console.log(this.value);
    context.save();
    context.beginPath();
    context.fillStyle = "blue";
    context.fillText(this.value + "", x, y, this.size);
    context.font = "50px times new roman";
    context.fill();
    context.closePath();
    context.restore();
  }

  update() {}
}

export default Damage;
