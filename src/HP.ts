import GameContext from "./GameContext";

class HP {
  public health = 0;
  private width = 0.5;
  private height = 5;
  private playerWidth = 0;
  private color = "lime";
  public maxHealth = 0;
  public healthPercentage = 1;
  private position = { x: 0, y: 0 };

  public updateHealth = health => {
    this.health = health;
  };

  public updatePosition = position => {
    this.position = position;
  };

  constructor(position, health, playerWidth) {
    this.position = position;
    this.playerWidth = playerWidth;
    this.health = health;
    this.maxHealth = health;
  }

  render() {
    const { context } = GameContext;
    let { x, y } = this.position;

    context.save();
    context.beginPath();

    context.fillStyle = this.color;
    let start = x - this.playerWidth - 5;
    for (let i = 0; i <= 100 * this.healthPercentage; i++) {
      context.fillRect(
        start,
        y - this.playerWidth * 1.5,
        this.width,
        this.height
      );
      start += this.width;
    }

    context.stroke();
    context.closePath();
    context.restore();
  }

  update() {
    this.healthPercentage = this.health / this.maxHealth;
    if (this.health < 80 && this.health >= 50) this.color = "#fccf03";
    else if (this.health < 50 && this.health >= 30) this.color = "orange";
    else if (this.health < 30) this.color = "red";
  }
}

export default HP;
