import GameContext from "./GameContext";
import Character from "./Character";
import Inventory from "./Inventory";
import FireArm from "./FireArm";

import bulletImg from "/assets/bullet.png";

const scale = GameContext.scale;
const imagen = new Image();
imagen.src = bulletImg;

class Refill {
	public position : Array<number> = [3* scale ,3 * scale];
  private imageWidth = 50;
	private imageHeight = 50;

  public refillBag = (character: Character, weapon: FireArm, bag: Inventory )=> {
    const [charx,chary] = [character.getPosition().x, character.getPosition().y];
    const [ammox, ammoy] = this.position;
    const [cW, cH] = [character.getDimensions().w, character.getDimensions().y];

    if (charx < ammox + this.imageWidth &&
        charx + cW > ammox &&
        chary < ammoy + this.imageHeight &&
        chary + cH > ammoy) {
          bag.pickUpAmmo(weapon.getType(), 20);
          this.changePosition();
    }
  };

	public render = (character: Character, weapon: FireArm, bag: Inventory) => {
      this.refillBag(character, weapon, bag);
	    const context = GameContext.context;
	    const scale = GameContext.scale;
	    const [x, y] = this.position;
    	context.save();
    	context.drawImage(imagen, x,y, this.imageWidth, this.imageHeight);
	    context.restore();
  	};

  	public getPosition = () => {
  		return this.position;
  	};

  	public changePosition = () => {
  		const { width, height} = GameContext.context.canvas;
  		const scale = GameContext.scale;
  		const maxX = width/scale;
      const maxY = height/scale;
  		const newX = Math.floor(Math.random() * maxX) * scale;
  		const newY = Math.floor(Math.random() * maxY) * scale;
  		this.position = [newX, newY];
      console.log('new pos', newX, newY);
      console.log('canvas', width, height);
  	};
}

export default Refill;
