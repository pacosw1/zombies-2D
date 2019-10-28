import Scene from "./Scene";
import Bullet from "./Bullet";

import Character from "./Character";
import Engine from "./Engine";
import Zombie from "./Zombie";
import MainMenuScene from "./MainMenuScene";
import PauseScene from "./PauseScene";
import PrettyPauseScene from "./PrettyPauseScene";
import GameContext from "./GameContext";
import WinningScene from "./WinningScene";
import Damage from "./Damage";
import GameOverScene from "./GameOverScene";
import PrettyGameOverScene from "./PrettyGameOverScene";

import hitmarkSound from "/assets/hitmark.mp3";

class PlayingScene extends Scene {
  private character: Character = null;
  private bullets: Bullet[] = [];
  private time = 0;
  public round = 1;
  private zombiesSpawned = 0;
  private zombiesPerRound = 1;
  private zombiesLeft = 1;
  private damageMultiplier = 1;
  private difficulty = 1;
  private multiplier = 1.5;
  private secPerSpawn = 1;
  private lastSpawned = 0;
  private healthMultiplier = 1.1;
  private zombieSpeed = 0.5;
  private zombieBaseHP = 500;
  private hit = new Audio(hitmarkSound);

  constructor(engine : Engine) {
    super(engine);
    this.character = new Character();
  }

  nextRound() {
    this.round++;
    if(this.round > 10 )
      this.engine.setCurrentScene(new WinningScene(this.engine, this));
    console.log("round #" + this.round);
    if (this.zombieSpeed < 2) this.zombieSpeed += 0.01;
    this.zombiesPerRound = Math.floor(this.round * 1.2 * (this.difficulty + 1));
    this.zombiesLeft = this.zombiesPerRound;
    this.zombiesSpawned = 0;
    if (this.secPerSpawn > 0.35) this.secPerSpawn -= 0.07 * this.difficulty;
    console.log("round: " + this.round);
    this.zombieBaseHP *= this.healthMultiplier;

  }

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
  private hitmarks: Damage[] = [];
  private enemies: Zombie[] = [];

  public randomizeSpawn = () => {
    let { width, height } = GameContext.context.canvas;
  };

  spawnZombie(damage, health) {
    if ((this.time - this.lastSpawned) / 1000 >= this.secPerSpawn) {
      let pos = Math.floor(Math.random() * 4);
      let zombiePosition = this.spawnPosition(pos);
      let zombie: Zombie = new Zombie(
        zombiePosition,
        damage,
        20,
        health,
        this.zombieSpeed
      );
      this.enemies.push(zombie);
      this.zombiesSpawned++;
      this.lastSpawned = new Date().getTime();
    }
    return;
  }

  spawnPosition(position) {
    let { width, height } = GameContext.context.canvas;
    let spawnerMargin = Math.random() * 150;
    let x = Math.random() * width;
    let y = Math.random() * height;
    if (position == 0) {
      return { x: -200, y: y };
    } else if (position == 1) {
      return { x: x, y: 0 - spawnerMargin };
    } else if (position == 2) {
      return { x: width + spawnerMargin, y: y };
    } else if (position == 3) {
      return { x: x, y: height + spawnerMargin };
    }
  }

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

    if (distance <= bulletPos.radius + enemyPos.radius + 10) {
      this.hit.play();
      enemy.updateHealth(bullet.getDamage());
      if (enemy.getHealth() <= 0) {
        this.zombiesLeft--;
        if (this.zombiesLeft % 5 == 0) this.character.updateDamage(1.01);
        this.enemies = this.enemies.filter(
          zombie => zombie.getId() !== enemy.getId()
        );
      }
      let dmg = new Damage(bullet.getDamage(), 1, 20, bullet.getPosition());
      dmg.render();

      this.bullets = this.bullets.filter(bull => bull.id !== bullet.id);
    }
  };

  public render = () => {
    var context = GameContext.context;
    const { width, height } = context.canvas;

    context.textAlign = "center";
    context.fillStyle = "white";
    context.font = "25px 'Roboto Mono' ";
    context.fillStyle = "#98c695";

    context.fillText("Round ", 90, 50);
    context.fillStyle = "#98c695";
    context.fillText("#"+this.round, 145, 50);


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

    if (this.zombiesSpawned <= this.zombiesPerRound) {
      this.spawnZombie(1, this.zombieBaseHP);
    }
    if (this.zombiesLeft == 0) {
      this.nextRound();
    }
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

    // checks if character is dead
    if (this.character.isDead())
      this.engine.setCurrentScene(new PrettyGameOverScene(this.engine));
  };

  public enter = () => {
    this.time = new Date().getTime();
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
    if (key == "Escape") engine.setCurrentScene(new MainMenuScene(this.engine));
    if (key == "p") engine.setCurrentScene(new PrettyPauseScene(this.engine, this));
    this.character.keydownHandler(key);
  };
}

export default PlayingScene;
