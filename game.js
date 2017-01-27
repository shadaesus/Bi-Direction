//Add listener for the keyboard when a key is released.
//By Rory Bell and Alan Easdale
window.addEventListener("keyup", keyboardControls, false);

//Keyboard controller.
function keyboardControls(e) {
    if (e.keyCode == ("32"))
        Game.player.switchControl();
}

//Game object.
var Game = {
    fps: 60,
    width: 640,
    height: 480,
    time: 0
};

//Does animation stuff, need to look into how this actually works.
Game._onEachFrame = (function () {
    var requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

    if (requestAnimationFrame) {
        return function (cb) {
            var _cb = function () {
                cb();
                requestAnimationFrame(_cb);
            }
            _cb();
        };
    } else {
        return function (cb) {
            setInterval(cb, 1000 / Game.fps);
        }
    }
})();

Game.run = (function () {
    var loops = 0, skipTicks = 1000 / Game.fps,
        maxFrameSkip = 10,
        nextGameTick = (new Date).getTime(),
        lastGameTick;

    return function () {

        while ((new Date).getTime() > nextGameTick) {
            Game.update();
            nextGameTick += skipTicks;
            loops++;
        }

        if (loops) Game.draw();
    }
})();

//Sets up the Game object.
Game.start = function () {
    //Retrieves the canvas from the html file.
    Game.canvas = document.getElementById("canvas");
    Game.canvas.width = Game.width;
    Game.canvas.height = Game.height;
    console.log("start");
    //Retrives a copy of the context.
    Game.context = Game.canvas.getContext("2d");

    //Dont know what this does yet.
    document.body.appendChild(Game.canvas);

    //Instantiates a new player.
    Game.player = new Player();

    //Dont know what this does yet.
    Game._onEachFrame(Game.run);
};

Game.update = function () {
    Game.player.update();
};

Game.draw = function () {
    Game.context.clearRect(0, 0, Game.width, Game.height);
    Game.player.draw(Game.context);
};

//Player object.
function Player() {
    this.x = 0;
    this.y = 0;
    this.rot = 0;
    this.speed = 0.05;
    this.movDir = true;
    this.projectile = new Projectile();

//Updates the rotation of the player.
    this.update = function () {
        if (this.movDir == true)
            this.rot -= this.speed;
        else
            this.rot += this.speed;

        if (this.rot > Math.PI*2)
            this.rot -= Math.PI*2;
        if (this.rot < -Math.PI*2)
            this.rot += Math.PI*2;

        if (this.projectile.alive == true)
            this.projectile.update();
    }

//Control for flipping rotation direction and firing (To be added).
    this.switchControl = function () {
        this.movDir = !this.movDir;
        this.projectile.spawn(this.x, this.y, this.rot, 2.5);
    }


    this.draw = function (context) {

        //Calculate the position of the player in accordance to the "this.rot" value.
        this.x = (Game.width / 2) + 30 * Math.cos(this.rot);
        this.y = (Game.height / 2) + 30 * Math.sin(this.rot);

        //Create a 8x8 pixel filled rectangle at the position of [x,y]
        context.fillRect(this.x - 4, this.y - 4, 8, 8);

        //Create a 20r circle at the center of the screen.
        context.beginPath();
        context.arc(Game.width / 2, Game.height / 2, 20, 0, Math.PI * 2, false);
        //context.fillStyle = "green";
        context.fill();
        context.closePath();

        if (this.projectile.alive == true)
            this.projectile.draw(context);
    }

}

//Projectile object.
function Projectile() {
    this.alive = false;

    this.spawn = function (x, y, angle, speed) {
        this.x = x;
        this.y = y;
        this.rot = angle;
        this.speed = speed;
        this.alive = true;
        console.log("Pos: " + this.x + " " + this.y);
        console.log("Rot: " + this.rot);
        console.log("Spe: " + this.speed);

    }

    this.update = function () {
        //Move by 'speed' in the direction of 'rot'.
        this.x += this.speed * Math.cos(this.rot);
        this.y += this.speed * Math.sin(this.rot);

        if (this.x > Game.width || this.x < 0 || this.y < 0 || this.y > Game.height)
        {
            this.destroy();
            console.log("Bullet reset.");
        }
    }

    this.draw = function (context) {
        //Create a 4x4 pixel filled rectangle at the position of [x,y]
        context.fillRect(this.x - 2, this.y - 2, 4, 4);
    }
    this.destroy = function () {
        this.x = 0;
        this.y = 0;
        this.rot = 0;
        this.speed = 0;
        this.alive = false;
    }
}