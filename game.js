//By Rory Bell and Alan Easdale

//Add listener for the keyboard when a key is released.
window.addEventListener("keyup", keyboardControls, false);

//Keyboard controller.
function keyboardControls(e) {
    if (e.keyCode == ("32")) //SPACE
    {
        Game.player.switchControl();
        var snd = new Audio("Sounds/laser.mp3"); // buffers automatically when created
        snd.play();
    }
    if (e.keyCode == ("90")) //Z
        window.location.reload();
    if (e.keyCode == ("88")) //X
        Game.start();
    if (e.keyCode == ("67")) //C
        Game.image_bool = !Game.image_bool;
    if (e.keyCode == ("80")) {//P
        Game.pause = !Game.pause;
        console.log("Pause status: " + Game.pause);
    }
    if (e.keyCode == ("69")) //E
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
    bgimage: new Image(),
    image_bool: false,
    score: 0,

    //Matter.js

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

    this.bgimage.src = "images/background.png";

    //Instantiates a new player.
    Game.player = new Player();

    //Instantiates the enemy list.
    Game.enemyList = new DoublyList();
    var snd = new Audio("Sounds/iron-man.wav"); // buffers automatically when created
    snd.play();
    snd.loop = true;

    //Dont know what this does yet.
    Game._onEachFrame(Game.run);
};

Game.update = function () {

    Game.player.update();


    //Always have 3 enemies
    if (Game.enemyList._length < 5)
        Game.enemyList.add(new Enemy(Game.width/2, Game.height/2));

    //If projectile list is not empty, loop through projectiles and update or destroy.
    if (this.enemyList._length > 0) {

        var enemynode = this.enemyList.head;
        var snd;

        var plx = 320, ply = 240, plr = 20;

        //Update loop
        while (enemynode != null) {
            enemynode.data.update(Game.context);

            var enx = enemynode.data.x, eny = enemynode.data.y, enr = enemynode.data.width/2;

            //Check collisions to the planet.
            if (SimpleCollision(enx,eny,enr,plx,ply,plr) === true) {
                enemynode.data.destroy();
                console.log("OUCH!");
                snd = new Audio("Sounds/ballhit.wav"); // buffers automatically when created
                snd.play();
                this.player.health --;
            }

            //Check collisions to the players projectiles.
            if (this.player.projectiles._length > 0) {
                var projectilenode = this.player.projectiles.head;

                while (projectilenode != null){

                    var prx = projectilenode.data.x, pry = projectilenode.data.y, prr = projectilenode.data.width/2;

                    if (SimpleCollision(enx,eny,enr,prx,pry,prr) === true){
                        enemynode.data.destroy();
                        projectilenode.data.destroy();
                        this.score ++;
                        var snd = new Audio("Sounds/rocks.wav"); // buffers automatically when created
                        snd.play();
                        console.log("BOOM!");
                    }

                    projectilenode = projectilenode.next;
                }
            }




            //Move to next node
            enemynode = enemynode.next;
        }

        //Reset for remove loop
        enemynode = this.enemyList.head;

        var count = 0;

        //Remove loop
        while (count < this.enemyList._length) {

            //Destroy the enemy
            if (enemynode.data.alive == false)
            {
                this.enemyList.searchAndRemove(enemynode.data);
                break;
            }
            else
                enemynode = enemynode.next;

            count++;
        }
    }
};

Game.draw = function () {
    Game.context.fillStyle="#000000";
    Game.context.fillRect(0, 0, Game.width, Game.height);

    //Draw background
    if(Game.image_bool == true)
        Game.context.drawImage(this.bgimage, 0, 0);

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

    Game.context.font = "30px Arial";
    Game.context.fillText("Score: " + this.score, 10, 30);
    Game.context.fillText("Health: " + this.player.health, 400, 30)
};

function SimpleCollision(xA, yA, radiusA, xB, yB, radiusB) {
    var collide;

    var collidedistance = radiusA + radiusB;

    var a = xA - xB;
    var b = yA - yB;
    var c = Math.sqrt(a * a + b * b);
    if (c < collidedistance)
        collide = true;
    else
        collide = false;

    return collide;
}