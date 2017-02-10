//By Rory Bell and Alan Easdale

//Add listener for the keyboard when a key is released.
window.addEventListener("keyup", keyboardControls, false);

//Keyboard controller.
function keyboardControls(e) {
    if (e.keyCode == ("32"))
        Game.player.switchControl();
    if (e.keyCode == ("69"))        //Todo: Add enemy to enemyList.
        enemyadd();
        //this.enemyList.add(new Enemy(Game.width/2, Game.height/2));
}

function enemyadd(){
    Game.enemyList.add(new Enemy(Game.width/2, Game.height/2));

    //Enemy e = new Enemy(x,y);
    //Game.enemyList.add(new Enemy(Game.width/2, Game.height/2));

}

//Game object.
var Game = {
    fps: 60,
    width: 640,
    height: 480,
    time: 0,
    player: new Player(),
    enemyList: new SinglyLinkedList(),
    enemy: new Enemy(),
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

    console.log("Line test")

    //Instantiates a new player.
    Game.player = new Player();

    Game.enemyList = new SinglyLinkedList();

    Game.enemy = new Enemy(Game.width/2, Game.height/2);

    //Dont know what this does yet.
    Game._onEachFrame(Game.run);
};

Game.update = function () {
    Game.player.update();
    Game.enemy.update();

    Game.enemyList.add(new Enemy(Game.width/2, Game.height/2));
    //If projectile list is not empty, loop through projectiles and update or destroy.
    if (this.enemyList._length > 0) {
        //Get head node.
        var node = this.enemyList.searchNodeAt(1);

        //context.fillStyle = "yellow";

        //Loop until next node is null.
        while (node != null) {
            node.data.update();
            node = node.next;
        }
    }

};

Game.draw = function () {
    Game.context.clearRect(0, 0, Game.width, Game.height);
    //context.fillStyle = "black";
    /*
    Player
        Platform
        Planet
        Projectiles
    Enemy

     */


    Game.player.draw(Game.context);
    Game.enemy.draw(Game.context);

    //If projectile list is not empty, loop through projectiles and update or destroy.
    if (this.enemyList._length > 0) {
        //Get head node.
        var node = this.enemyList.searchNodeAt(1);

        //context.fillStyle = "yellow";

        //Loop until next node is null.
        while (node != null) {
            node.data.draw(Game.context);
            node = node.next;
        }
    }

};


