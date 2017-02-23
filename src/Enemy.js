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
    //Generates random start position outside the canvas
    // Round(Math.Random()) = 0 || 1
    this.x = Math.round(Math.random()) * (640 + 50) - 50;
    this.y = Math.floor((Math.random() * 480) + 1);

    var maxW = 30, minW = 20;

    this.width = Math.random() * (maxW - minW) + minW;
    this.id = incr();

    this.rot = Math.atan2(this.x - targetx, this.y - targety);
    this.speed = 0.5;

    //Todo: Create list for enemy projectiles.
    this.projectiles = new DoublyList();

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

            //if (this.x > 310 && this.x < 330 && this.y > 230 && this.y < 250)
            //    this.destroy();
        }
    }

    this.draw = function (context) {

        if (this.alive === true) {
            if(Game.image_bool == true){
                this.image.src = "images/asteroid1.png";
                context.save();
                context.translate(this.x - this.width /2,this.y - this.width /2);
                context.scale(this.width / this.image.width, this.width / this.image.width);
                context.drawImage(this.image, 0, 0);
                context.restore();
            } else {
                context.beginPath();
                context.fill();
                context.fillStyle = "red";
                context.fillRect(this.x - this.width / 2, this.y - this.width / 2, this.width, this.width);
            }
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