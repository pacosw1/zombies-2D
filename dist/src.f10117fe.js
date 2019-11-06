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
  function Time() {}

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
  function Scene(engine) {
    this.render = function () {};

    this.update = function () {};

    this.enter = function () {};

    this.keyUpHandler = function (event) {};

    this.keyDownHandler = function (event, engine) {};

    this.mouseMoveHandler = function (event) {};

    this.engine = engine;
  }

  return Scene;
}();

exports.default = Scene;
},{}],"assets/FinnSprite.png":[function(require,module,exports) {
module.exports = "/FinnSprite.7fd90bfc.png";
},{}],"assets/gunshot.mp3":[function(require,module,exports) {
module.exports = "/gunshot.59321675.mp3";
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

    this.health = 0;
    this.width = 0.5;
    this.height = 5;
    this.playerWidth = 0;
    this.color = "lime";
    this.maxHealth = 0;
    this.healthPercentage = 1;
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
    this.maxHealth = health;
  }

  HP.prototype.render = function () {
    var context = GameContext_1.default.context;
    var _a = this.position,
        x = _a.x,
        y = _a.y;
    context.save();
    context.beginPath();
    context.fillStyle = this.color;
    var start = x - this.playerWidth;

    for (var i = 0; i <= 100 * this.healthPercentage; i++) {
      context.fillRect(start, y - this.playerWidth * 1.5, this.width, this.height);
      start += this.width;
    }

    context.stroke();
    context.closePath();
    context.restore();
  };

  HP.prototype.update = function () {
    this.healthPercentage = this.health / this.maxHealth;
    if (this.healthPercentage < 0.8 && this.healthPercentage >= 0.5) this.color = "#fccf03";else if (this.healthPercentage < 0.5 && this.healthPercentage >= 0.3) this.color = "orange";else if (this.healthPercentage < 0.3) this.color = "red";
  };

  return HP;
}();

exports.default = HP;
},{"./GameContext":"src/GameContext.ts"}],"src/Bullet.ts":[function(require,module,exports) {
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
  function Bullet(id, position, target, range, speed, damage) {
    var _this = this;

    this.position = {
      x: 0,
      y: 0
    };
    this.target = {
      x: 0,
      y: 0
    };
    this.speed = 0;
    this.radius = 2;
    this.angleX = 1;
    this.angleY = 0;
    this.damage = 10;

    this.getDamage = function () {
      return _this.damage;
    }; //find direction trajectory for bullet


    this.setAngle = function () {
      var deltaX = _this.target.x - _this.position.x;
      var deltaY = _this.target.y - _this.position.y;
      var angle = Math.atan2(deltaY, deltaX);
      _this.angleX = Math.cos(angle);
      _this.angleY = Math.sin(angle);
      _this.position.x = _this.position.x + 50 * Math.cos(angle);
      _this.position.y = _this.position.y + 50 * Math.sin(angle);
    };

    this.render = function () {
      var context = GameContext_1.default.context;
      var _a = _this.position,
          x = _a.x,
          y = _a.y;
      context.save();
      context.beginPath();
      context.fillStyle = "white";
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
      var _a = _this,
          position = _a.position,
          target = _a.target,
          speed = _a.speed;
      _this.position.x += _this.angleX * 1 * _this.speed;
      _this.position.y += _this.angleY * _this.speed;
    };

    this.id = id;
    this.position = position;
    this.target = target;
    this.speed = 10;
    this.range = range;
    this.damage = damage;
    this.setAngle();
  }

  return Bullet;
}();

exports.default = Bullet;
},{"./GameContext":"src/GameContext.ts"}],"assets/empty.mp3":[function(require,module,exports) {
module.exports = "/empty.ba651bc1.mp3";
},{}],"assets/reload.mp3":[function(require,module,exports) {
module.exports = "/reload.955ea8d9.mp3";
},{}],"src/FireArm.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Bullet_1 = __importDefault(require("./Bullet"));

var empty_mp3_1 = __importDefault(require("../assets/empty.mp3"));

var reload_mp3_1 = __importDefault(require("../assets/reload.mp3"));

var FireArm =
/** @class */
function () {
  function FireArm() {
    var _this = this;

    this.emptyGun = new Audio(empty_mp3_1.default);
    this.reloadGUn = new Audio(reload_mp3_1.default);

    this.render = function () {};

    this.update = function () {};

    this.fire = function (position, target, bullets, time, lastFired, fireRate) {
      //waits n seconds before firing a bullet (based on fire rate)
      if (_this.mag === 0) {
        _this.emptyGun.play();

        console.log("empty"); //play empty sound
      } else if (!_this.reloading && _this.mag >= 1) {
        //if bullets in mag fire them
        console.log("curr time: " + (time - lastFired) / 1000);

        if ((time - lastFired) / 1000 >= 1 / fireRate) {
          console.log("fire");
          bullets.push(new Bullet_1.default(Date.now() + target.y, position, target, 10, 10, _this.damage));
          _this.lastFired = new Date().getTime(); //update last time a shot was fired

          _this.mag--; //substract from magazine
        }
      }
    };

    this.getType = function () {
      return _this.type;
    };

    this.getMag = function () {
      return _this.mag;
    };

    this.getMagCap = function () {
      return _this.magSize;
    };

    this.load = function (bullets) {
      _this.mag += bullets;
    };

    this.reload = function () {
      // this.reloading = true;
      _this.reloadGUn.play();

      _this.mag = _this.magSize;
    };
  }

  return FireArm;
}();

exports.default = FireArm;
},{"./Bullet":"src/Bullet.ts","../assets/empty.mp3":"assets/empty.mp3","../assets/reload.mp3":"assets/reload.mp3"}],"src/weapons/assaultRifle.ts":[function(require,module,exports) {
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

var FireArm_1 = __importDefault(require("../FireArm"));

var AssualtRifle =
/** @class */
function (_super) {
  __extends(AssualtRifle, _super);

  function AssualtRifle() {
    var _this = _super.call(this) || this;

    _this.fireRate = 10;
    _this.range = 10;
    _this.speed = 7;
    _this.damage = 5;
    _this.reloadSpeed = 0.8;
    _this.magSize = 40;
    _this.reloading = false;
    _this.type = "ar";
    _this.accuracy = 1;
    _this.lastFired = new Date().getTime();
    _this.reloadStart = 0;
    _this.mag = 40;

    _this.render = function () {};

    _this.update = function () {
      if (_this.reloading) {
        if (20 - _this.reloadStart / 1000 >= _this.reloadSpeed) _this.reloading = false;
      }
    };

    _this.lastFired = new Date().getTime();
    return _this;
  }

  return AssualtRifle;
}(FireArm_1.default);

exports.default = AssualtRifle;
},{"../FireArm":"src/FireArm.ts"}],"src/Inventory.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Inventory =
/** @class */
function () {
  function Inventory(weapon) {
    var _this = this;

    this.items = [];
    this.bulletPouch = {
      gun: 0,
      ar: 0,
      shotgun: 0,
      sniper: 0
    };

    this.getAmmo = function (type) {
      return _this.bulletPouch[type];
    };

    this.pickUpAmmo = function (type, qty) {
      _this.bulletPouch[type] += qty;
    };

    this.loadAmmo = function () {
      var _a = _this.items[0],
          getMag = _a.getMag,
          getMagCap = _a.getMagCap,
          getType = _a.getType,
          load = _a.load;
      var deltaAmmo = getMagCap() - getMag();

      if (_this.bulletPouch[getType()] >= deltaAmmo) {
        _this.bulletPouch[getType()] -= deltaAmmo;
        return true;
      } else {
        load(_this.bulletPouch[getType()]);
        _this.bulletPouch[getType()] = 0;
      }

      return false;
    };

    this.pickUpWeapon = function (weapon) {
      _this.items[0] = weapon;
    };

    this.dropWeapon = function () {
      _this.items[0] = null;
    };

    this.capacity = 10;
    this.weight = 0;
    this.bulletPouch.ar = 100;
    this.items.push(weapon, this.bulletPouch);
  }

  Inventory.prototype.update = function () {
    console.log(this.bulletPouch);
  };

  return Inventory;
}();

exports.default = Inventory;
},{}],"src/Character.ts":[function(require,module,exports) {
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

var FinnSprite_png_1 = __importDefault(require("/assets/FinnSprite.png"));

var gunshot_mp3_1 = __importDefault(require("/assets/gunshot.mp3"));

var HP_1 = __importDefault(require("./HP"));

var assaultRifle_1 = __importDefault(require("./weapons/assaultRifle"));

var Inventory_1 = __importDefault(require("./Inventory"));

var CharacterDirection;

(function (CharacterDirection) {
  CharacterDirection[CharacterDirection["Left"] = -1] = "Left";
  CharacterDirection[CharacterDirection["None"] = 0] = "None";
  CharacterDirection[CharacterDirection["Right"] = 1] = "Right";
})(CharacterDirection = exports.CharacterDirection || (exports.CharacterDirection = {}));

var Character =
/** @class */
function () {
  function Character(playingScene) {
    var _this = this;

    this.gravity = 9.8;
    this.weapon = new assaultRifle_1.default();
    this.lastFired = 0;
    this.health = 100;
    this.start = 0;
    this.lastDirection = -1;
    this.moving = false;
    this.healthBar = null;
    this.fireRate = 10;
    this.damage = 10;
    this.aim = {
      x: 0,
      y: 0
    };
    this.direction = {
      x: 0,
      y: 0
    };
    this.characterWidth = 70;
    this.characterHeight = 100;
    this.frameCounter = 10;
    this.currentFrame = 10;
    this.gunshot = new Audio(gunshot_mp3_1.default);
    this.radius = 20;
    this.speed = 3.5;
    this.firing = false;
    this.characterImage = new Image();
    this.position = {
      x: (GameContext_1.default.context.canvas.width - this.characterWidth) / 2,
      y: GameContext_1.default.context.canvas.height * 0.75 - this.characterHeight
    }; //updates current mouse coordinates on screen

    this.mouseMoveHandler = function (event) {
      _this.aim.x = event.offsetX;
      _this.aim.y = event.offsetY;
    };

    this.keydownHandler = function (key) {
      switch (key) {
        case "d":
          _this.direction.x = 1;
          _this.moving = true;
          break;

        case "a":
          _this.direction.x = -1;
          _this.moving = true;
          break;

        case "w":
          _this.direction.y = -1;
          _this.moving = true;
          break;

        case "s":
          _this.direction.y = 1;
          _this.moving = true;
          break;

        case "f":
          _this.firing = true;
          break;

        case "r":
          _this.reload();

      }
    };

    this.getBag = function () {
      return _this.bag;
    };

    this.getWeapon = function () {
      return _this.weapon;
    };

    this.getHealth = function () {
      _this.healthBar.healthPercentage;
    };

    this.keyupHandler = function (key) {
      if (key === "d" && _this.direction.x === 1 || key === "a" && _this.direction.x === -1) {
        _this.moving = false;
        _this.direction.x = 0;
      }

      if (key === "f") _this.firing = false;

      if (key === "w" && _this.direction.y === -1 || key === "s" && _this.direction.y === 1) {
        _this.moving = false;
        _this.direction.y = 0;
      }
    };

    this.reload = function () {
      var reload = _this.bag.loadAmmo();

      if (reload) _this.weapon.reload();
    }; // returns characters health


    this.isDead = function () {
      if (_this.health <= 0) return true;else return false;
    }; //pops next bullet to be fired from local array
    //checks if any bullets in array
    //


    this.moveLogic = function (xPos) {
      _this.position.x = _this.position.x + _this.speed * _this.direction.x;
      _this.position.y += _this.direction.y * _this.speed;
    };

    this.update = function () {
      //updates the health bar
      _this.bag.update();

      _this.weapon.update();

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
        _this.weapon.fire({
          x: x,
          y: y
        }, {
          x: _this.aim.x,
          y: _this.aim.y
        }, _this.playingScene.bullets, _this.time, _this.weapon.lastFired, _this.weapon.fireRate);
      } // this.jumpLogic(width, height, yPos);


      _this.moveLogic(x);

      if (_this.moving) {
        if (_this.frameCounter % 8 === 0) _this.currentFrame = (_this.currentFrame + 1) % 7 + 8;
      } else {
        if (_this.frameCounter % 15 === 0) _this.currentFrame = (_this.currentFrame + 1) % 9;
      }

      _this.frameCounter += 1;
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
      _this.weapon.render();

      var context = GameContext_1.default.context;
      var _a = _this.position,
          x = _a.x,
          y = _a.y;
      var paddingY = 2;
      var paddingX = 12;
      var spriteHeight = 35;
      var spriteWidth = 20;
      context.save();
      context.beginPath();

      _this.healthBar.render(); //render health bar


      context.drawImage(_this.characterImage, _this.currentFrame * (spriteWidth + paddingX), paddingY, spriteWidth, spriteHeight, x - 47.5, y - 30, _this.characterWidth, _this.characterHeight);
      context.fillStyle = "red"; // context.arc(x, y, this.radius, 0, 2 * Math.PI);

      context.fill();
      context.closePath();
      context.restore();
    };

    this.playingScene = playingScene;
    var context = GameContext_1.default.context;
    var _a = context.canvas,
        width = _a.width,
        height = _a.height;
    this.characterImage.src = FinnSprite_png_1.default;
    this.time = new Date().getTime();
    this.bag = new Inventory_1.default(this.weapon);
    this.healthBar = new HP_1.default(this.position, this.health, this.radius);
  }

  Character.prototype.updateDamage = function (multiplier) {
    this.damage *= 1 * multiplier;
  };

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
},{"./GameContext":"src/GameContext.ts","/assets/FinnSprite.png":"assets/FinnSprite.png","/assets/gunshot.mp3":"assets/gunshot.mp3","./HP":"src/HP.ts","./weapons/assaultRifle":"src/weapons/assaultRifle.ts","./Inventory":"src/Inventory.ts"}],"src/Hp.ts":[function(require,module,exports) {
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

    this.health = 0;
    this.width = 0.5;
    this.height = 5;
    this.playerWidth = 0;
    this.color = "lime";
    this.maxHealth = 0;
    this.healthPercentage = 1;
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
    this.maxHealth = health;
  }

  HP.prototype.render = function () {
    var context = GameContext_1.default.context;
    var _a = this.position,
        x = _a.x,
        y = _a.y;
    context.save();
    context.beginPath();
    context.fillStyle = this.color;
    var start = x - this.playerWidth;

    for (var i = 0; i <= 100 * this.healthPercentage; i++) {
      context.fillRect(start, y - this.playerWidth * 1.5, this.width, this.height);
      start += this.width;
    }

    context.stroke();
    context.closePath();
    context.restore();
  };

  HP.prototype.update = function () {
    this.healthPercentage = this.health / this.maxHealth;
    if (this.healthPercentage < 0.8 && this.healthPercentage >= 0.5) this.color = "#fccf03";else if (this.healthPercentage < 0.5 && this.healthPercentage >= 0.3) this.color = "orange";else if (this.healthPercentage < 0.3) this.color = "red";
  };

  return HP;
}();

exports.default = HP;
},{"./GameContext":"src/GameContext.ts"}],"assets/ZombieToast.png":[function(require,module,exports) {
module.exports = "/ZombieToast.2adeb02e.png";
},{}],"src/Zombie.ts":[function(require,module,exports) {
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

var ZombieToast_png_1 = __importDefault(require("/assets/ZombieToast.png"));

var Zombie =
/** @class */
function () {
  function Zombie(position, damage, radius, health, speed) {
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
    this.health = 0;
    this.currentFrame = 0;
    this.frameCounter = 10;
    this.characterWidth = 70;
    this.characterHeight = 100;
    this.healthBar = null;
    this.spriteWidth = 45;
    this.characterImage = new Image();

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
    this.speed = speed;
    this.characterImage.src = ZombieToast_png_1.default;
    this.health = health;
    this.damage = damage;
    this.radius = 27;
    this.init();
  }

  Zombie.prototype.follow = function (player) {
    // update players position
    this.target = player.getPosition();
  };

  Zombie.prototype.init = function () {
    this.healthBar = new Hp_1.default(this.position, this.health, this.radius);
  };

  Zombie.prototype.update = function () {
    //update health bar
    //    console.log("%" + this.healthBar.healthPercentage);
    this.healthBar.update();
    this.healthBar.updateHealth(this.health); //update path to find player

    var deltaX = this.target.x - this.position.x;
    var deltaY = this.target.y - this.position.y;
    var angle = Math.atan2(deltaY, deltaX);
    this.angle.x = Math.cos(angle);
    this.angle.y = Math.sin(angle);
    this.position.x += this.speed * this.angle.x;
    this.position.y += this.speed * this.angle.y;
    if (this.frameCounter % 10 === 0) this.currentFrame = (this.currentFrame + 1) % 8;
  };

  Zombie.prototype.render = function () {
    var context = GameContext_1.default.context;
    var _a = this.position,
        x = _a.x,
        y = _a.y;
    this.healthBar.render();
    context.save();
    context.beginPath();
    var paddingY = 35;
    var paddingX = 19;
    var spriteHeight = 64;
    context.drawImage(this.characterImage, this.currentFrame * (this.spriteWidth + paddingX), paddingY, this.spriteWidth, spriteHeight, x - 45.5, y - 20, this.characterWidth, this.characterHeight);
    context.fillStyle = "green"; // context.moveTo(x, y);
    // context.lineTo(this.target.x, this.target.y);

    context.stroke(); // context.arc(x, y, this.radius, 0, 2 * Math.PI);

    context.fill();
    context.strokeStyle = "black";
    context.closePath();
    context.restore();
  };

  return Zombie;
}();

exports.default = Zombie;
},{"./GameContext":"src/GameContext.ts","./Hp":"src/Hp.ts","/assets/ZombieToast.png":"assets/ZombieToast.png"}],"src/MainMenuScene.ts":[function(require,module,exports) {
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
      context.font = "50px 'Source Code Pro' ";
      context.strokeStyle = "blue";
      context.fillText("MAIN MENU", width / 2, 100);
      context.fillStyle = "pink";

      for (var i = 0; i < options.length; i++) {
        if (i == _this.currentOption) context.strokeText(options[i], width / 2, height / 2 + i * 35 + i * 20);
        context.fillText(options[i], width / 2, height / 2 + i * 35 + i * 20);
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
          break;

        case "Enter":
          if (_this.currentOption === 0) engine.setCurrentScene(new PlayingScene_1.default(_this.engine));
          break;
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
     * 10. add sound effects, music
     * 11. Pause Game
     * 12.
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
},{"./Scene":"src/Scene.ts","./Character":"src/Character.ts","./Zombie":"src/Zombie.ts","./MainMenuScene":"src/MainMenuScene.ts","./GameContext":"src/GameContext.ts"}],"src/GoodbyeScene.ts":[function(require,module,exports) {
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

var PrettyMainMenuScene_1 = __importDefault(require("./PrettyMainMenuScene"));

var PrettyPauseScene =
/** @class */
function (_super) {
  __extends(PrettyPauseScene, _super);

  function PrettyPauseScene(engine, scene) {
    var _this = _super.call(this, engine) || this;

    _this.currentOption = 0;
    _this.options = ["Resume", "Config", "Main menu"];

    _this.render = function () {
      var options = _this.options;
      var context = GameContext_1.default.context;
      var _a = context.canvas,
          width = _a.width,
          height = _a.height;
      context.save();
      context.beginPath();
      context.textAlign = "center";
      context.fillStyle = "white";
      context.font = "70px 'Oswald' ";
      context.strokeStyle = "white";
      context.fillText("GOODBYE !", width / 2, 140);
      context.fillStyle = "#98c695";
      context.font = "18px 'Open Sans Condensed' ";
      context.font = "35px 'Roboto Mono' ";

      for (var i = 0; i < options.length; i++) {
        if (i == _this.currentOption) {
          context.fillStyle = "#98c695";
          context.fillText(options[i], width / 2, height / 2 + i * 35 + i * 10 + 30);
        } else context.fillStyle = "white";

        context.fillText(options[i], width / 2, height / 2 + i * 35 + i * 10 + 30);
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
          break;

        case "Enter":
          if (_this.currentOption === 0) {
            engine.setCurrentScene(_this.scene);
            break;
          }

          if (_this.currentOption === 1) {
            engine.setCurrentScene(new PrettyMainMenuScene_1.default(_this.engine));
            break;
          }

          if (_this.currentOption === 2) {
            engine.setCurrentScene(new PrettyMainMenuScene_1.default(_this.engine));
            break;
          }

      }
    };

    _this.scene = scene;
    return _this;
  }

  return PrettyPauseScene;
}(Scene_1.default);

exports.default = PrettyPauseScene;
},{"./Scene":"src/Scene.ts","./GameContext":"src/GameContext.ts","./PrettyMainMenuScene":"src/PrettyMainMenuScene.ts"}],"assets/bubble.wav":[function(require,module,exports) {
module.exports = "/bubble.49d872f2.wav";
},{}],"src/PrettyMainMenuScene.ts":[function(require,module,exports) {
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

var GoodbyeScene_1 = __importDefault(require("./GoodbyeScene"));

var bubble_wav_1 = __importDefault(require("/assets/bubble.wav"));

var MainMenuScene =
/** @class */
function (_super) {
  __extends(MainMenuScene, _super);

  function MainMenuScene() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.currentOption = 0;
    _this.options = ["Play", "Quit"];
    _this.choice = new Audio(bubble_wav_1.default);

    _this.render = function () {
      var options = _this.options;
      var context = GameContext_1.default.context;
      var _a = context.canvas,
          width = _a.width,
          height = _a.height;
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

      for (var i = 0; i < options.length; i++) {
        if (i == _this.currentOption) {
          context.fillStyle = "#98c695";
          context.fillText(options[i], width / 2, height / 2 + i * 35 + i * 10 + 30);
        } else context.fillStyle = "white";

        context.fillText(options[i], width / 2, height / 2 + i * 35 + i * 10 + 30);
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

          _this.choice.play();

          break;

        case "ArrowDown":
          _this.currentOption = (_this.currentOption + 1) % _this.options.length;

          _this.choice.play();

          break;

        case "Enter":
          if (_this.currentOption === 0) engine.setCurrentScene(new PlayingScene_1.default(_this.engine));
          if (_this.currentOption === 1) engine.setCurrentScene(new GoodbyeScene_1.default(_this.engine));
      }
    };

    return _this;
  }

  return MainMenuScene;
}(Scene_1.default);

exports.default = MainMenuScene;
},{"./Scene":"src/Scene.ts","./GameContext":"src/GameContext.ts","./PlayingScene":"src/PlayingScene.ts","./GoodbyeScene":"src/GoodbyeScene.ts","/assets/bubble.wav":"assets/bubble.wav"}],"src/Engine.ts":[function(require,module,exports) {
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

var PrettyMainMenuScene_1 = __importDefault(require("./PrettyMainMenuScene"));

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
      context.fillStyle = '#4d4d4d';
      context.fillRect(0, 0, width, height);
      context.closePath();
      context.restore();
    };

    this.setCurrentScene = function (scene) {
      _this.currentScene = scene;

      _this.currentScene.enter();
    };

    this.init = function () {
      _this.currentScene = new PrettyMainMenuScene_1.default(_this);

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
},{"./GameContext":"src/GameContext.ts","./Time":"src/Time.ts","./PrettyMainMenuScene":"src/PrettyMainMenuScene.ts"}],"src/index.ts":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60517" + '/');

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