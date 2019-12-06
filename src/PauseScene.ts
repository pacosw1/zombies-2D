import Scene from "./Scene";
import GameContext from "./GameContext";
import Engine from "./Engine";
import PlayingScene from "./PlayingScene";
import PrettyMainMenuScene from "./PrettyMainMenuScene";
import bubbleSound from "/assets/bubble.wav";

class PrettyPauseScene extends Scene {
  private currentOption: number = 0;
  private options = ["Resume", "Main menu"];
  private scene: Scene;
  private choice = new Audio(bubbleSound);

  constructor(engine: Engine, scene: Scene) {
    super(engine);
    this.scene = scene;
  }

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

    context.fillText("PAUSE", width / 2, 140);
    context.fillStyle = "#98c695";
    context.font = "18px 'Open Sans Condensed' ";

    context.font = "35px 'Roboto Mono' ";

    for (let i = 0; i < options.length; i++) {
      if (i == this.currentOption) {
        context.fillStyle = "#98c695";
        context.fillText(
          options[i],
          width / 2,
          height / 2 + i * 35 + i * 10 + 30
        );
      } else context.fillStyle = "white";
      context.fillText(
        options[i],
        width / 2,
        height / 2 + i * 35 + i * 10 + 30
      );
    }
    context.closePath();
    context.restore();
  };
  public update = () => {};
  public enter = () => {};
  public keyUpHandler = (event: KeyboardEvent) => {};
  public mouseMoveHandler = (event: MouseEvent) => {};
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
        if (this.currentOption === 0) {
          engine.setCurrentScene(this.scene);
          break;
        }
        if (this.currentOption === 1) {
          engine.setCurrentScene(new PrettyMainMenuScene(this.engine));
          break;
        }
    }
  };
}

export default PrettyPauseScene;
