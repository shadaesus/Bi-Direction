/**
 * Created by Bell on 10/02/2017.
 */


var incr = (function () {
    var i = 1;

    return function () {
        return i++;
    }
})();

//Todo: Track position of target using observer pattern.

//Enemy object.
function Enemy(targetx , targety) {
    //Generates random start position within window boundaries.
    this.x = Math.floor((Math.random() * 640) + 1);
    this.y = Math.floor((Math.random() * 480) + 1);

    this.id = incr();

    this.rot = Math.atan2(this.x - targetx, this.y - targety);
    this.speed = 0.5;

    //Todo: Create list for enemy projectiles.
    //this.projectiles = new SinglyLinkedList();

    this.image = new Image();
    this.alive = true;

//Updates the rotation of the player.
    this.update = function () {
        if (this.alive) {
            //Move in direction of rot by speed.
            this.x -= this.speed * Math.sin(this.rot);
            this.y -= this.speed * Math.cos(this.rot);

            if (this.rot > Math.PI * 2)
                this.rot -= Math.PI * 2;
            if (this.rot < -Math.PI * 2)
                this.rot += Math.PI * 2;        //console.log(this.rot);

            if (this.x > 310 && this.x < 330 && this.y > 230 && this.y < 250)
                this.destroy();
        }
    }

    this.draw = function (context) {

        if (this.alive === true) {
            context.beginPath();
            context.arc(Game.width / 2, Game.height / 2, 3, 0, Math.PI * 2, false);
            context.fillStyle = "blue";
            context.fill();
            this.image.src = "images/ast1.png";
            context.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2);

        }
    }

    //Destroys the Enemy object.
    this.destroy = function () {
        this.x = null;
        this.y = null;
        this.id = null;
        this.rot = null;
        this.speed = null;
        this.image = null;
        this.alive = false;
    }

    //Prints the Enemy object.
    this.print = function () {
        console.log("Enemy #", this.id);
        console.log("x ", this.x, " y ", this.y);
        console.log("r ", this.rot, "s ", this.speed);
        console.log("a ", this.alive, "i ", this.image);
    }
}