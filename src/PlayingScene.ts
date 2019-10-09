import Scene from "./Scene";
import Bullet from "./Bullet";

import Character from "./Character";
import Engine from "./Engine";
import MainMenuScene from "./MainMenuScene";
import GameContext from "./GameContext";
class PlayingScene extends Scene {
  private character: Character = null;
  private bullets: Bullet[] = [];

  public render = () => {
    this.character.render();
    for (let i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i]) this.bullets[i].render();
    }
  };

  public addBullet = bullet => {
    this.bullets.push(bullet);
  };

  public update = () => {
    let { width, height } = GameContext.context.canvas;

    this.character.update();

    console.log(this.bullets);
    if (this.character.anyBullets()) {
      this.bullets.push(this.character.nextBullet());
    }
    for (let i = 0; i < this.bullets.length; i++) {
      let pos = this.bullets[i].getPos();
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
