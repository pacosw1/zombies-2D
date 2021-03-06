import Scene from "./Scene";
import GameContext from "./GameContext";
import Engine from "./Engine";
import PlayingScene from "./PlayingScene";
import MainMenuScene from "./MainMenuScene";
import PrettyMainMenuScene from "./PrettyMainMenuScene";
import spritesheet from "/assets/FinnSprite.png";

const characterImage = new Image();
characterImage.src = spritesheet;

class GoodbyeScene extends Scene {
  private characterWidth: number = 70;
  private characterHeight: number = 100;

  private currentOption: number = 0;
  private currentFrame = 10;
  private frameCounter = 10;

  public render = () => {

    var context = GameContext.context;
    const { width, height } = context.canvas;
    let x = width / 2;
    let y = 180;

    const paddingY = 2;
    const paddingX = 12;
    const spriteHeight = 35;
    const spriteWidth = 20;


    context.save();
    context.beginPath();

    context.drawImage(
      characterImage,
      this.currentFrame * (spriteWidth + paddingX),
      paddingY,
      spriteWidth,
      spriteHeight,
      x - 47.5,
      y - 30,
      this.characterWidth,
      this.characterHeight
    );



    context.textAlign = "center";
    context.fillStyle = "white";
    context.font = "70px 'Oswald' ";
    context.strokeStyle = "white";

    context.fillText("GOODBYE !", width / 2, 140);
    context.fillStyle = "#98c695";
    context.font = "18px 'Open Sans Condensed' ";

    context.font = "35px 'Roboto Mono' ";

    context.closePath();
    context.restore();
  };
  public update = () => {
    if (this.frameCounter % 15 === 0)
      this.currentFrame = (this.currentFrame + 1) % 9;
    this.frameCounter += 1;
  };
  public enter = () => { };
  public keyUpHandler = (event: KeyboardEvent) => { };
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
        if (this.currentOption === 0) {
          engine.setCurrentScene(new PlayingScene(this.engine));
          break;
        }
        if (this.currentOption === 1) {
          engine.setCurrentScene(new PrettyMainMenuScene(this.engine));
          break;
        }

    }
  };
}

export default GoodbyeScene;
