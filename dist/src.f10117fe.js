// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/GameContext.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GameContext =
/** @class */
function () {
  function GameContext() {}

  GameContext.scale = 40;
  GameContext.context = null;
  return GameContext;
}();

exports.default = GameContext;
},{}],"src/Time.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Time =
/** @class */
function () {
  function Time() {
    this.getTime = function () {
      return Date.now() + "";
    };
  }

  Time.update = function () {
    var currentTime = Date.now();
    Time.deltaTime = (currentTime - Time.previousTime) / 1000;
    Time.previousTime = currentTime;
  }; // diferencia de tiempo entre último update y update actual


  Time.deltaTime = 0; // Número de milisegundos que han pasado desde 1970

  Time.previousTime = Date.now();
  return Time;
}();

exports.default = Time;
},{}],"src/Scene.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Scene =
/** @class */
function () {
  function Scene() {
    this.render = function () {};

    this.update = function () {};

    this.enter = function () {};

    this.keyUpHandler = function (event) {};

    this.keyDownHandler = function (event, engine) {};

    this.mouseMoveHandler = function (event) {};
  }

  return Scene;
}();

exports.default = Scene;
},{}],"src/Bullet.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GameContext_1 = __importDefault(require("./GameContext"));

var Bullet =
/** @class */
function () {
  function Bullet(id, position, target, range, speed) {
    var _this = this;

    this.position = {
      x: 0,
      y: 0
    };
    this.target = {
      x: 0,
      y: 0
    };
    this.speed = 20;
    this.radius = 2;
    this.angleX = 1;
    this.angleY = 0;
    this.damage = 5;

    this.getDamage = function () {
      return _this.damage;
    }; //find direction trajectory for bullet


    this.setAngle = function () {
      var deltaX = _this.target.x - _this.position.x;
      var deltaY = _this.target.y - _this.position.y;
      var angle = Math.atan2(deltaY, deltaX);
      _this.angleX = Math.cos(angle);
      _this.angleY = Math.sin(angle);
      _this.position.x = _this.position.x + 20 * Math.cos(angle);
      _this.position.y = _this.position.y + 20 * Math.sin(angle);
    };

    this.render = function () {
      var context = GameContext_1.default.context;
      var _a = _this.position,
          x = _a.x,
          y = _a.y;
      context.save();
      context.beginPath();
      context.fillStyle = "black";
      context.arc(x, y, _this.radius, 0, 2 * Math.PI);
      context.fill();
      context.closePath();
      context.restore();
    };

    this.getPosition = function () {
      return {
        x: _this.position.x,
        y: _this.position.y,
        radius: _this.radius
      };
    };

    this.update = function () {
      console.log(_this.angleX);
      var _a = _this,
          position = _a.position,
          target = _a.target,
          speed = _a.speed;
      _this.position.x += _this.angleX * _this.speed;
      _this.position.y += _this.angleY * _this.speed;
    };

    this.id = id;
    this.position = position;
    this.target = target;
    this.speed = speed;
    this.range = range;
    this.setAngle();
  }

  return Bullet;
}();

exports.default = Bullet;
},{"./GameContext":"src/GameContext.ts"}],"assets/spritesheet.png":[function(require,module,exports) {
module.exports = "/spritesheet.713aba4a.png";
},{}],"src/HP.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GameContext_1 = __importDefault(require("./GameContext"));

var HP =
/** @class */
function () {
  function HP(position, health, playerWidth) {
    var _this = this;

    this.health = 100;
    this.width = 0.5;
    this.height = 5;
    this.playerWidth = 0;
    this.color = "lime";
    this.position = {
      x: 0,
      y: 0
    };

    this.updateHealth = function (health) {
      _this.health = health;
    };

    this.updatePosition = function (position) {
      _this.position = position;
    };

    this.position = position;
    this.playerWidth = playerWidth;
    this.health = health;
  }

  HP.prototype.render = function () {
    var context = GameContext_1.default.context;
    var _a = this.position,
        x = _a.x,
        y = _a.y;
    context.save();
    context.beginPath();
    context.fillStyle = this.color;
    var start = x - this.playerWidth - 5;

    for (var i = 0; i <= this.health; i++) {
      context.fillRect(start, y - this.playerWidth * 1.5, this.width, this.height);
      start += this.width;
    }

    context.stroke();
    context.closePath();
    context.restore();
  };

  HP.prototype.update = function () {
    if (this.health < 80 && this.health >= 50) this.color = "#fccf03";else if (this.health < 50 && this.health >= 30) this.color = "orange";else if (this.health < 30) this.color = "red";
  };

  return HP;
}();

exports.default = HP;
},{"./GameContext":"src/GameContext.ts"}],"src/Character.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GameContext_1 = __importDefault(require("./GameContext"));

var Bullet_1 = __importDefault(require("./Bullet"));

var spritesheet_png_1 = __importDefault(require("/assets/spritesheet.png"));

var HP_1 = __importDefault(require("./HP"));

var CharacterDirection;

(function (CharacterDirection) {
  CharacterDirection[CharacterDirection["Left"] = -1] = "Left";
  CharacterDirection[CharacterDirection["None"] = 0] = "None";
  CharacterDirection[CharacterDirection["Right"] = 1] = "Right";
})(CharacterDirection = exports.CharacterDirection || (exports.CharacterDirection = {}));

var Character =
/** @class */
function () {
  function Character() {
    var _this = this;

    this.gravity = 9.8;
    this.lastFired = 0;
    this.health = 100;
    this.healthBar = null;
    this.fireRate = 10;
    this.aim = {
      x: 0,
      y: 0
    };
    this.position = {
      x: 0,
      y: 0
    };
    this.direction = {
      x: 0,
      y: 0
    };
    this.characterWidth = 50;
    this.characterHeight = 50;
    this.frameCounter = 0;
    this.currentFrame = 0;
    this.radius = 20;
    this.speed = 5;
    this.firing = false;
    this.bullets = [];
    this.characterImage = new Image(); //updates current mouse coordinates on screen

    this.mouseMoveHandler = function (event) {
      _this.aim.x = event.offsetX;
      _this.aim.y = event.offsetY;
    };

    this.keydownHandler = function (key) {
      switch (key) {
        case "d":
          _this.direction.x = 1;
          break;

        case "a":
          _this.direction.x = -1;
          break;

        case "w":
          _this.direction.y = -1;
          break;

        case "s":
          _this.direction.y = 1;
          break;

        case "f":
          _this.firing = true;
          break;
      }
    };

    this.keyupHandler = function (key) {
      if (key === "d" && _this.direction.x === 1 || key === "a" && _this.direction.x === -1) {
        _this.direction.x = 0;
      }

      if (key === "f") _this.firing = false;

      if (key === "w" && _this.direction.y === -1 || key === "s" && _this.direction.y === 1) {
        _this.direction.y = 0;
      }
    }; //pops next bullet to be fired from local array


    this.nextBullet = function () {
      return _this.bullets.pop();
    }; //checks if any bullets in array


    this.anyBullets = function () {
      return _this.bullets.length > 0;
    }; //


    this.fire = function () {
      //waits n seconds before firing a bullet (based on fire rate)
      if ((_this.time - _this.lastFired) / 1000 >= 1 / _this.fireRate) {
        _this.bullets.push(new Bullet_1.default(Date.now() + _this.aim.y, {
          x: _this.position.x,
          y: _this.position.y
        }, {
          x: _this.aim.x,
          y: _this.aim.y
        }, 10, 10));

        _this.lastFired = new Date().getTime(); //update last time a shot was fired
      }
    };

    this.moveLogic = function (xPos) {
      _this.position.x += _this.direction.x * _this.speed;
      _this.position.y += _this.direction.y * _this.speed;
    };

    this.update = function () {
      //updates the health bar
      _this.healthBar.updateHealth(_this.health);

      _this.healthBar.update();

      _this.time = new Date().getTime();
      var context = GameContext_1.default.context;
      var _a = context.canvas,
          width = _a.width,
          height = _a.height;
      var _b = _this.position,
          x = _b.x,
          y = _b.y;

      if (_this.firing) {
        //add bullets to array while firing = true
        _this.fire();
      } // this.jumpLogic(width, height, yPos);


      _this.moveLogic(x);
    };

    this.updateHealth = function (damage) {
      _this.health -= damage;
    };

    this.getPosition = function () {
      return {
        x: _this.position.x,
        y: _this.position.y,
        radius: _this.radius
      };
    };

    this.render = function () {
      var context = GameContext_1.default.context;
      var _a = _this.position,
          x = _a.x,
          y = _a.y;
      var paddingY = 4;
      var paddingX = 56.8;
      var spriteHeight = 85;
      var spriteWidth = 52;
      context.save();
      context.beginPath();

      _this.healthBar.render(); //render health bar


      context.fillStyle = "red";
      context.arc(x, y, _this.radius, 0, 2 * Math.PI);
      context.fill();
      context.closePath();
      context.restore();
    };

    var context = GameContext_1.default.context;
    var _a = context.canvas,
        width = _a.width,
        height = _a.height;
    this.characterImage.src = spritesheet_png_1.default;
    this.time = new Date().getTime();
    this.position = {
      x: (width - this.characterWidth) / 2,
      y: height * 0.75 - this.characterHeight
    };
    this.healthBar = new HP_1.default(this.position, this.health, this.radius);
  }

  return Character;
}();

exports.default = Character; // public jumpLogic = (width, height, yPos) => {
//   if (yPos < height - 50 && !this.jumping) {
//     this.position[1] += this.gravity;
//   } else if (this.jumping) {
//     this.position[1] -= this.gravity;
//     if (this.position[1] <= height - 150) this.jumping = false;
//   }
// };
},{"./GameContext":"src/GameContext.ts","./Bullet":"src/Bullet.ts","/assets/spritesheet.png":"assets/spritesheet.png","./HP":"src/HP.ts"}],"src/Hp.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GameContext_1 = __importDefault(require("./GameContext"));

var HP =
/** @class */
function () {
  function HP(position, health, playerWidth) {
    var _this = this;

    this.health = 100;
    this.width = 0.5;
    this.height = 5;
    this.playerWidth = 0;
    this.color = "lime";
    this.position = {
      x: 0,
      y: 0
    };

    this.updateHealth = function (health) {
      _this.health = health;
    };

    this.updatePosition = function (position) {
      _this.position = position;
    };

    this.position = position;
    this.playerWidth = playerWidth;
    this.health = health;
  }

  HP.prototype.render = function () {
    var context = GameContext_1.default.context;
    var _a = this.position,
        x = _a.x,
        y = _a.y;
    context.save();
    context.beginPath();
    context.fillStyle = this.color;
    var start = x - this.playerWidth - 5;

    for (var i = 0; i <= this.health; i++) {
      context.fillRect(start, y - this.playerWidth * 1.5, this.width, this.height);
      start += this.width;
    }

    context.stroke();
    context.closePath();
    context.restore();
  };

  HP.prototype.update = function () {
    if (this.health < 80 && this.health >= 50) this.color = "#fccf03";else if (this.health < 50 && this.health >= 30) this.color = "orange";else if (this.health < 30) this.color = "red";
  };

  return HP;
}();

exports.default = HP;
},{"./GameContext":"src/GameContext.ts"}],"src/Zombie.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GameContext_1 = __importDefault(require("./GameContext"));

var Hp_1 = __importDefault(require("./Hp"));

var Zombie =
/** @class */
function () {
  function Zombie(position, damage, radius) {
    var _this = this;

    this.position = {
      x: 0,
      y: 0
    };
    this.target = {
      x: 0,
      y: 0
    };
    this.speed = 1;
    this.angle = {
      x: 0,
      y: 0
    };
    this.damage = 5;
    this.radius = 20;
    this.health = 100;
    this.healthBar = null;

    this.updateHealth = function (damage) {
      _this.health -= damage;
    };

    this.getHealth = function () {
      return _this.health;
    };

    this.getId = function () {
      return _this.id;
    };

    this.getPostion = function () {
      return {
        x: _this.position.x,
        y: _this.position.y,
        radius: _this.radius
      };
    };

    this.id = Date.now() + " " + position.x + "" + position.y;
    this.position = position;
    this.damage = damage;
    this.radius = radius;
    this.init();
  }

  Zombie.prototype.follow = function (player) {
    // update players position
    this.target = player.getPosition();
  };

  Zombie.prototype.init = function () {
    this.healthBar = new Hp_1.default(this.position, 100, this.radius);
  };

  Zombie.prototype.update = function () {
    //update health bar
    this.healthBar.update();
    this.healthBar.updateHealth(this.health); //update path to find player

    var deltaX = this.target.x - this.position.x;
    var deltaY = this.target.y - this.position.y;
    var angle = Math.atan2(deltaY, deltaX);
    this.angle.x = Math.cos(angle);
    this.angle.y = Math.sin(angle);
    this.position.x += this.speed * this.angle.x;
    this.position.y += this.speed * this.angle.y;
  };

  Zombie.prototype.render = function () {
    var context = GameContext_1.default.context;
    var _a = this.position,
        x = _a.x,
        y = _a.y;
    this.healthBar.render();
    context.save();
    context.beginPath();
    context.fillStyle = "green";
    context.arc(x, y, this.radius, 0, 2 * Math.PI); // context.moveTo(x, y);
    // context.lineTo(this.target.x, this.target.y);

    context.stroke();
    context.fill();
    context.strokeStyle = "lime";
    context.closePath();
    context.restore();
  };

  return Zombie;
}();

exports.default = Zombie;
},{"./GameContext":"src/GameContext.ts","./Hp":"src/Hp.ts"}],"src/MainMenuScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Scene_1 = __importDefault(require("./Scene"));

var GameContext_1 = __importDefault(require("./GameContext"));

var PlayingScene_1 = __importDefault(require("./PlayingScene"));

var MainMenuScene =
/** @class */
function (_super) {
  __extends(MainMenuScene, _super);

  function MainMenuScene() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.currentOption = 0;
    _this.options = ["jugar", "config", "salir"];

    _this.render = function () {
      var options = _this.options;
      var context = GameContext_1.default.context;
      var _a = context.canvas,
          width = _a.width,
          height = _a.height;
      context.save();
      context.beginPath();
      context.textAlign = "center";
      context.fillStyle = "lime";
      context.font = "25px arial";
      context.strokeStyle = "blue";

      for (var i = 0; i < options.length; i++) {
        if (i == _this.currentOption) context.strokeText(options[i], width / 2, height / 2 + i * 35);
        context.fillText(options[i], width / 2, height / 2 + i * 35);
      }

      context.closePath();
      context.restore();
    };

    _this.update = function () {};

    _this.enter = function () {};

    _this.keyUpHandler = function (event) {};

    _this.keyDownHandler = function (event, engine) {
      var key = event.key;

      switch (key) {
        case "ArrowUp":
          _this.currentOption = (_this.currentOption - 1 + _this.options.length) % _this.options.length;
          break;

        case "ArrowDown":
          _this.currentOption = (_this.currentOption + 1) % _this.options.length;

        case "Enter":
          if (_this.currentOption === 0) engine.setCurrentScene(new PlayingScene_1.default());
      }
    };

    return _this;
  }

  return MainMenuScene;
}(Scene_1.default);

exports.default = MainMenuScene;
},{"./Scene":"src/Scene.ts","./GameContext":"src/GameContext.ts","./PlayingScene":"src/PlayingScene.ts"}],"src/PlayingScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Scene_1 = __importDefault(require("./Scene"));

var Character_1 = __importDefault(require("./Character"));

var Zombie_1 = __importDefault(require("./Zombie"));

var MainMenuScene_1 = __importDefault(require("./MainMenuScene"));

var GameContext_1 = __importDefault(require("./GameContext"));

var PlayingScene =
/** @class */
function (_super) {
  __extends(PlayingScene, _super);

  function PlayingScene() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.character = null;
    _this.bullets = [];
    _this.time = 0;
    _this.round = 1;
    _this.zombies = 1;
    _this.multiplier = 1.5; //done

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
     */

    _this.lastHit = 0;
    _this.enemies = [//zombie array
    new Zombie_1.default({
      x: 0,
      y: 0
    }, 5, 20), new Zombie_1.default({
      x: 500,
      y: 0
    }, 5, 20)];

    _this.randomizeSpawn = function () {
      var _a = GameContext_1.default.context.canvas,
          width = _a.width,
          height = _a.height;
    }; //checks for zombie and player collision


    _this.checkZombieBite = function (zombie, player) {
      var playerPos = player.getPosition();
      var zombiePos = zombie.getPostion();
      var dx = playerPos.x - zombiePos.x;
      var dy = playerPos.y - zombiePos.y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= playerPos.radius + zombiePos.radius + 5) {
        if ((_this.time - _this.lastHit) / 1000 >= 0.2) {
          player.updateHealth(zombie.damage);
          _this.lastHit = new Date().getTime();
        }
      }
    }; //checks for bullet and zombies collision


    _this.checkBulletHit = function (enemy, bullet) {
      if (!enemy || !bullet) return;
      var bulletPos = bullet.getPosition();
      var enemyPos = enemy.getPostion();
      var dx = bulletPos.x - enemyPos.x;
      var dy = bulletPos.y - enemyPos.y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= bulletPos.radius + enemyPos.radius + 5) {
        enemy.updateHealth(bullet.getDamage());
        if (enemy.getHealth() <= 0) _this.enemies = _this.enemies.filter(function (zombie) {
          return zombie.getId() !== enemy.getId();
        });
        _this.bullets = _this.bullets.filter(function (bull) {
          return bull.id !== bullet.id;
        });
      }
    };

    _this.render = function () {
      //update time
      _this.time = new Date().getTime();

      _this.character.render(); //render bullets


      for (var i = 0; i < _this.bullets.length; i++) {
        _this.bullets[i].render();
      } //render zombies


      for (var i = 0; i < _this.enemies.length; i++) {
        if (_this.enemies[i]) _this.enemies[i].render();
      }
    };

    _this.addBullet = function (bullet) {
      _this.bullets.push(bullet);
    };

    _this.update = function () {
      var _a = GameContext_1.default.context.canvas,
          width = _a.width,
          height = _a.height;

      _this.character.update();

      if (_this.character.anyBullets()) {
        _this.bullets.push(_this.character.nextBullet());
      } //update zombies path if player moves


      for (var i = 0; i < _this.enemies.length; i++) {
        _this.enemies[i].follow(_this.character);

        _this.enemies[i].update();
      } //check zombie damage


      for (var i = 0; i < _this.enemies.length; i++) {
        _this.checkZombieBite(_this.enemies[i], _this.character);
      } //check bullet collision


      if (_this.bullets.length > 0) {
        for (var i = 0; i < _this.enemies.length; i++) {
          for (var j = 0; j < _this.bullets.length; j++) {
            _this.checkBulletHit(_this.enemies[i], _this.bullets[j]);
          }
        }
      }

      var _loop_1 = function _loop_1(i) {
        var pos = _this.bullets[i].getPosition();

        if (pos.x < 0 || pos.x > width || pos.y < 0 || pos.y > height) {
          _this.bullets = _this.bullets.filter(function (x) {
            return x.id !== _this.bullets[i].id;
          });
        } else _this.bullets[i].update();
      }; //if bullets move outside canvas, delete them


      for (var i = 0; i < _this.bullets.length; i++) {
        _loop_1(i);
      }
    };

    _this.enter = function () {
      _this.character = new Character_1.default();
    };

    _this.keyUpHandler = function (event) {
      var key = event.key;

      _this.character.keyupHandler(key);
    };

    _this.mouseMoveHandler = function (event) {
      _this.character.mouseMoveHandler(event);
    };

    _this.keyDownHandler = function (event, engine) {
      var key = event.key;
      if (key == "Escape") engine.setCurrentScene(new MainMenuScene_1.default());

      _this.character.keydownHandler(key);
    };

    return _this;
  }

  return PlayingScene;
}(Scene_1.default);

exports.default = PlayingScene;
},{"./Scene":"src/Scene.ts","./Character":"src/Character.ts","./Zombie":"src/Zombie.ts","./MainMenuScene":"src/MainMenuScene.ts","./GameContext":"src/GameContext.ts"}],"src/Engine.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GameContext_1 = __importDefault(require("./GameContext"));

var Time_1 = __importDefault(require("./Time"));

var PlayingScene_1 = __importDefault(require("./PlayingScene"));

var Engine =
/** @class */
function () {
  function Engine() {
    var _this = this;

    this.currentScene = null; // Iniciar el motor del juego.

    this.start = function () {
      _this.init();

      requestAnimationFrame(_this.tick);
    };

    this.mousemoveHandler = function (event) {
      _this.currentScene.mouseMoveHandler(event);
    };

    this.keydownHandler = function (event) {
      _this.currentScene.keyDownHandler(event, _this);
    };

    this.keyupHandler = function (event) {
      _this.currentScene.keyUpHandler(event);
    }; // Limpiar pantalla y dibujar fondo.


    this.clearScreen = function () {
      var context = GameContext_1.default.context;
      var canvas = context.canvas;
      var width = canvas.width;
      var height = canvas.height;
      context.save();
      context.beginPath();
      context.fillStyle = "white";
      context.fillRect(0, 0, width, height);
      context.closePath();
      context.restore();
    };

    this.setCurrentScene = function (scene) {
      _this.currentScene = scene;

      _this.currentScene.enter();
    };

    this.init = function () {
      _this.currentScene = new PlayingScene_1.default();

      _this.currentScene.enter();
    }; // Método que se ejecuta en cada frame del juego.


    this.tick = function () {
      _this.clearScreen();

      Time_1.default.update();

      _this.currentScene.update();

      _this.currentScene.render();

      requestAnimationFrame(_this.tick);
    };
  }

  return Engine;
}();

exports.default = Engine;
},{"./GameContext":"src/GameContext.ts","./Time":"src/Time.ts","./PlayingScene":"src/PlayingScene.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Engine_1 = __importDefault(require("./Engine"));

var GameContext_1 = __importDefault(require("./GameContext")); //  Nota: No es necesario escribir código nuevo en este archivo.


var canvas = document.getElementById("game-area");
var context = canvas.getContext("2d");
GameContext_1.default.context = context;
var engine = new Engine_1.default();
engine.start();
canvas.addEventListener("keydown", engine.keydownHandler);
canvas.addEventListener("keyup", engine.keyupHandler);
canvas.addEventListener("mousemove", engine.mousemoveHandler);
},{"./Engine":"src/Engine.ts","./GameContext":"src/GameContext.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51550" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map