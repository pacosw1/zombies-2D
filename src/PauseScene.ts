import Scene from "./Scene";
import GameContext from "./GameContext";
import Engine from "./Engine";
import PlayingScene from "./PlayingScene";
import MainMenuScene from "./MainMenuScene";

class PauseScene extends Scene {
  private currentOption: number = 0;
  private options = ["Resume", "Config", "Main menu"];
  private scene : Scene;
  constructor(engine : Engine, scene : Scene) {
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
    context.fillStyle = "lime";
    context.font = "25px 'Source Code Pro' ";
    context.strokeStyle = "blue";

    context.strokeText("PAUSE", width / 2, 100);
    context.fillText("PAUSE", width / 2, 100);


    for (let i = 0; i < options.length; i++) {
      if (i == this.currentOption)
        context.strokeText(options[i], width / 2, height / 2 + i * 35);
      context.fillText(options[i], width / 2, height / 2 + i * 35);
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
        break;
      case "ArrowDown":
        this.currentOption = (this.currentOption + 1) % this.options.length;
        break;
      case "Enter":
        if(this.currentOption === 0){
          engine.setCurrentScene(this.scene);
          break;
        }
        if(this.currentOption === 1){
          engine.setCurrentScene(new MainMenuScene(this.engine));
          break;
        }
        if(this.currentOption === 2){
          engine.setCurrentScene(new MainMenuScene(this.engine));
          break;
        }

    }
  };
}

export default PauseScene;
