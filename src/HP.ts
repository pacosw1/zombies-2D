import GameContext from "./GameContext";

class HP {
  private health = 100;
  private width = 5;
  private height = 5;
  private color = "lime";
  private position = { x: 0, y: 0 };

  public updateHealth = health => {
    this.health = health;
  };

  public updatePosition = position => {
    this.position = position;
  };

  constructor(position, health) {
    this.position = position;
    this.health = health;
  }

  render() {
    const { context } = GameContext;
    let { x, y } = this.position;

    context.save();
    context.beginPath();

    context.fillStyle = this.color;
    let start = x;
    for (let i = 0; i <= this.health; i++) {
      context.fillRect(start, y, this.width, this.height);
      start += this.width;
    }

    context.stroke();
    context.closePath();
    context.restore();
  }

  update() {
    if (this.health < 80) this.color = "yellow";
    else if (this.health < 50) this.color = "orange";
    else if (this.health < 20) this.color = "red";
  }
}

export default HP;
