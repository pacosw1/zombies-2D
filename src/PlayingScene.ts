import Scene from "./Scene";
import Bullet from "./Bullet";

import Character from "./Character";
import Engine from "./Engine";
import Zombie from "./Zombie";
import MainMenuScene from "./MainMenuScene";
import GameContext from "./GameContext";
class PlayingScene extends Scene {
  private character: Character = null;
  private bullets: Bullet[] = [];
  private enemies: Zombie[] = [
    new Zombie({ x: 0, y: 0 }, 5, 20),
    new Zombie({ x: 500, y: 0 }, 5, 20)
  ];

  public checkBulletHit = (enemy: Zombie, bullet: Bullet) => {
    if (!enemy || !bullet) return;
    let bulletPos = bullet.getPosition();
    let enemyPos = enemy.getPostion();

    let dx = bulletPos.x - enemyPos.x;
    let dy = bulletPos.y - enemyPos.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= bulletPos.radius + enemyPos.radius + 5) {
      enemy.updateHealth(bullet.getDamage());
      if (enemy.getHealth() <= 0)
        this.enemies = this.enemies.filter(
          zombie => zombie.getId() !== enemy.getId()
        );
      this.bullets = this.bullets.filter(bull => bull.id !== bullet.id);
    }
  };

  public render = () => {
    this.character.render();
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].render();
    }
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i]) this.enemies[i].render();
    }
  };

  public addBullet = bullet => {
    this.bullets.push(bullet);
  };

  public update = () => {
    console.log(this.bullets);
    let { width, height } = GameContext.context.canvas;

    this.character.update();

    if (this.character.anyBullets()) {
      this.bullets.push(this.character.nextBullet());
    }
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].follow(this.character);
      this.enemies[i].update();
    }

    //check bullet collision
    if (this.bullets.length > 0) {
      for (let i = 0; i < this.enemies.length; i++) {
        for (let j = 0; j < this.bullets.length; j++) {
          this.checkBulletHit(this.enemies[i], this.bullets[j]);
        }
      }
    }
    for (let i = 0; i < this.bullets.length; i++) {
      let pos = this.bullets[i].getPosition();
      if (pos.x < 0 || pos.x > width || pos.y < 0 || pos.y > height) {
        this.bullets = this.bullets.filter(x => x.id !== this.bullets[i].id);
      } else this.bullets[i].update();
    }
  };

  public enter = () => {
    this.character = new Character();
  };

  public keyUpHandler = (event: KeyboardEvent) => {
    const { key } = event;
    this.character.keyupHandler(key);
  };
  public mouseMoveHandler = (event: MouseEvent) => {
    this.character.mouseMoveHandler(event);
  };
  public keyDownHandler = (event: KeyboardEvent, engine: Engine) => {
    const { key } = event;
    if (key == "Escape") engine.setCurrentScene(new MainMenuScene());
    this.character.keydownHandler(key);
  };
}

export default PlayingScene;
