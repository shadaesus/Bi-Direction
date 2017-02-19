//By Rory Bell and Alan Easdale

//Add listener for the keyboard when a key is released.
window.addEventListener("keyup", keyboardControls, false);

//Keyboard controller.
function keyboardControls(e) {
    if (e.keyCode == ("32"))
        Game.player.switchControl();
    if (e.keyCode == ("79"))
        Game.start();
    if (e.keyCode == ("80")) {
        Game.pause = !Game.pause;
        console.log("Pause status: " + Game.pause);
    }
        if (e.keyCode == ("67"))
        window.location.reload();
    if (e.keyCode == ("69"))        //Todo: Add enemy to enemyList.
        Game.enemyList.add(new Enemy(Game.width/2, Game.height/2));
}

//Game object.
var Game = {
    fps: 60,
    width: 640,
    height: 480,
    time: 0,
    player: new Player(),
    enemyList: new DoublyList(),
    pause: false,
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
            if (Game.pause == false)
                Game.update();
            nextGameTick += skipTicks;
            loops++;
        }

        if (loops) Game.draw();
    }
})();

//Sets up the Game object.
Game.start = function () {
    //Announce game start
    console.log("Game Start");

    //Retrieves the canvas from the html file.
    Game.canvas = document.getElementById("canvas");
    Game.canvas.width = Game.width;
    Game.canvas.height = Game.height;

    //Retrives a copy of the context.
    Game.context = Game.canvas.getContext("2d");

    //Dont know what this does yet.
    document.body.appendChild(Game.canvas);

    //Instantiates a new player.
    Game.player = new Player();

    Game.enemyList = new DoublyList();

    //Dont know what this does yet.
    Game._onEachFrame(Game.run);
};

Game.update = function () {

    Game.player.update();

    // Always have 3 enemies
    //if (Game.enemyList._length < 5)
    //    Game.enemyList.add(new Enemy(Game.width/2, Game.height/2));

    //If projectile list is not empty, loop through projectiles and update or destroy.
    if (this.enemyList._length > 0) {

        var node = this.enemyList.head;

        //Update loop
        while (node != null) {
            node.data.update(Game.context);
            node = node.next;
        }

        //Reset for remove loop
        node = this.enemyList.head;

        var count = 0;

        //Remove loop
        while (count < this.enemyList._length) {

            //Destroy the enemy
            if (node.data.alive == false)
            {
                this.enemyList.searchAndRemove(node.data);
                break;
            }
            else
                node = node.next;

            count++;
        }
    }
};

Game.draw = function () {
    Game.context.clearRect(0, 0, Game.width, Game.height);
    Game.player.draw(Game.context);

    //If projectile list is not empty, loop through projectiles and update or destroy.
    if (this.enemyList._length > 0) {
        //Get head node.
        var node = this.enemyList.head;

        //Loop until next node is null.
        while (node != null) {
            node.data.draw(Game.context);
            node = node.next;
        }
    }
};


