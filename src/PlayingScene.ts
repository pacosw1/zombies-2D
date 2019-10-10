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
  private time = 0;
  private round = 1;
  private zombies = 1;
  private multiplier = 1.5;

  //done
  /**
   * 1. Player can shoot based on mouse coordiantes
   * 2. Player can move around
   * 3. Zombies follow player around
   * 4. Health bars
   * 5. Bullets damage zombies
   * 6. zombies damage player based on attack speed
   */

  //to do
  /**
   * 1. Implement rounds
   * 2. Diferent types of zombies, with different stats (optional)
   * 3. PowerUps (shields, dmg, etc..)  (optional)
   * 4. Physics to prevent zombie overlap
   * 5. spawn zombies randombly from outside all sides of canvas
   * 6. Sprites
   * 7. Animations
   * 8. Obstacles
   * 9. Game Over Screen
   * 10. sound effects, music
   * 11. Pause Game
   */

  private lastHit = 0;
  private enemies: Zombie[] = [
    //zombie array
    new Zombie({ x: 0, y: 0 }, 5, 20),
    new Zombie({ x: 500, y: 0 }, 5, 20)
  ];

  public randomizeSpawn = () => {
    let { width, height } = GameContext.context.canvas;
  };

  //checks for zombie and player collision
  public checkZombieBite = (zombie: Zombie, player: Character) => {
    let playerPos = player.getPosition();
    let zombiePos = zombie.getPostion();
    let dx = playerPos.x - zombiePos.x;
    let dy = playerPos.y - zombiePos.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance <= playerPos.radius + zombiePos.radius + 5) {
      if ((this.time - this.lastHit) / 1000 >= 0.2) {
        player.updateHealth(zombie.damage);
        this.lastHit = new Date().getTime();
      }
    }
  };

  //checks for bullet and zombies collision
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
    //update time
    this.time = new Date().getTime();
    this.character.render();

    //render bullets
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].render();
    }
    //render zombies
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i]) this.enemies[i].render();
    }
  };

  public addBullet = bullet => {
    this.bullets.push(bullet);
  };

  public update = () => {
    let { width, height } = GameContext.context.canvas;

    this.character.update();

    if (this.character.anyBullets()) {
      this.bullets.push(this.character.nextBullet());
    }

    //update zombies path if player moves
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].follow(this.character);
      this.enemies[i].update();
    }

    //check zombie damage
    for (let i = 0; i < this.enemies.length; i++) {
      this.checkZombieBite(this.enemies[i], this.character);
    }

    //check bullet collision
    if (this.bullets.length > 0) {
      for (let i = 0; i < this.enemies.length; i++) {
        for (let j = 0; j < this.bullets.length; j++) {
          this.checkBulletHit(this.enemies[i], this.bullets[j]);
        }
      }
    }

    //if bullets move outside canvas, delete them
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
