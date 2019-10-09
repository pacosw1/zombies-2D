import GameContext from "./GameContext";

abstract class Gun {
  public abstract render = () => {};
  public abstract update = () => {};

  public fire = target => {};
}

export default Gun;
