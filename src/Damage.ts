import GameContext from "./GameContext";

class Damage {
  private value;
  private duration;
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

    context.fillStyle = "black";
    context.fillText(this.value + "", x, y, this.size);
    context.font = "100px times new roman";
    context.fill();
    context.closePath();
    context.restore();
  }

  update() {}
}

export default Damage;
