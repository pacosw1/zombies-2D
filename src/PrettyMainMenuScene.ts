import Scene from "./Scene";
import GameContext from "./GameContext";
import Engine from "./Engine";
import PlayingScene from "./PlayingScene";
import GoodbyeScene from "./GoodbyeScene";

import bubbleSound from "/assets/bubble.wav";

class PrettyMainMenuScene extends Scene {
  private currentOption: number = 0;
  private options = [ "Play", "Quit"];
  private choice = new Audio(bubbleSound);

  public render = () => {
    let { options } = this;
    var context = GameContext.context;
    const { width, height } = context.canvas;

    context.save();
    context.beginPath();

    context.textAlign = "center";
    context.fillStyle = "white";
    context.font = "70px 'Oswald' ";
    context.strokeStyle = "white";

    context.fillText("MAIN", width / 2 - 80, 140);
    context.fillStyle = "#98c695";
    context.fillText("MENU", width / 2 + 85, 140);
    context.fillStyle = "white";
    context.font = "18px 'Open Sans Condensed' ";
    context.fillText("a game by Paco Sainz & Caro Obregón", width / 2, 170);

    context.font = "35px 'Roboto Mono' ";

    for (let i = 0; i < options.length; i++) {
      if (i == this.currentOption){
        context.fillStyle = "#98c695";
        context.fillText(options[i], width / 2, height / 2 + i * 35 + i*10 + 30);
      }
      else
        context.fillStyle = "white";
        context.fillText(options[i], width / 2, height / 2 + i * 35 + i*10 + 30);
    }

    context.closePath();
    context.restore();
  };
  public update = () => {};
  public enter = () => {};
  public keyUpHandler = (event: KeyboardEvent) => {};
  public keyDownHandler = (event: KeyboardEvent, engine: Engine) => {
    const key = event.key;

    switch (key) {
      case "ArrowUp":
        this.currentOption =
          (this.currentOption - 1 + this.options.length) % this.options.length;
          this.choice.play();

        break;
      case "ArrowDown":
        this.currentOption = (this.currentOption + 1) % this.options.length;
        this.choice.play();

        break;
      case "Enter":
        if (this.currentOption === 0)
          engine.setCurrentScene(new PlayingScene(this.engine));
        if (this.currentOption === 1)
          engine.setCurrentScene(new GoodbyeScene(this.engine));

    }
  };
}

export default PrettyMainMenuScene;
