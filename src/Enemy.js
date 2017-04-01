/**
 * Created by Bell on 10/02/2017.
 */

/**
 * increment Function returns +1
 * returns {integer}
 */
var incr = (function () {
    var i = 1;

    return function () {
        return i++;
    }
})();

//Todo: Track position of target using observer pattern.

/**
 * Takes to integer parameters that act like a homing becon
 * @param {integer} targetx
 * @param {integer} targety
 * @param {integer} type
 * @constructor
 */
function Enemy(targetx , targety, type) {
    //Generates random start position outside the canvas
    // Round(Math.Random()) = 0 || 1
    this.x = Math.round(Math.random()) * (Game.width + 50) - 50;
    this.y = Math.floor((Math.random() * Game.height) + 1);

    var maxW = 30, minW = 20;

    this.width = Math.random() * (maxW - minW) + minW;
    this.id = incr();

    this.rot = Math.atan2(this.x - targetx, this.y - targety);
    this.speed = 0.5;

    this.shootTimer = Math.random() * 200 + 200 ;

    this.projectiles = new DoublyList();
    this.targetx = targetx;
    this.targety = targety;

    this.image = new Image();
    this.alive = true;
    this.type = type;
    this.update = function(){

    }
    this.move = function(){}

    var staticUpdate = function update () {
        if (this.alive) {
            //Move in direction of rot by speed.
            this.x -= this.speed * Math.sin(this.rot);
            this.y -= this.speed * Math.cos(this.rot);

            if (this.rot > Math.PI )
                this.rot -= Math.PI * 2;
            if (this.rot < -Math.PI )
                this.rot += Math.PI * 2;        //console.log(this.rot);

            //if (this.x > 310 && this.x < 330 && this.y > 230 && this.y < 250)
            //    this.destroy();
        }
    };
    var dynamicUpdate = function update () {
        if (this.alive) {

            var d = distance(this.x, Game.width/2, this.y, Game.height/2);

            if (d > 100){
                //Move towards the planet
                this.x -= this.speed * Math.sin(this.rot);
                this.y -= this.speed * Math.cos(this.rot);
            }
            else //Rotate around planet
            {
                this.rot += 0.005;

                if (this.rot > Math.PI * 2)
                    this.rot -= Math.PI * 2;
                if (this.rot < -Math.PI * 2)
                    this.rot += Math.PI * 2;

                //Orbit distance must be less than "d".
                this.x = (Game.width / 2) + 80 * Math.sin(this.rot) ;
                this.y = (Game.height / 2) + 80 * Math.cos(this.rot);

                this.shootTimer --;

                if (this.shootTimer < 0)
                {
                    this.shootTimer = Math.random() * 200 + 200;
                    this.projectiles.add(new Projectile(this.x, this.y, Math.atan2(this.y - targety, this.x - targetx) + Math.PI, 0.5));
                }

                if (this.projectiles._length > 0) {

                    var node = this.projectiles.head;

                    //Update loop
                    while (node != null) {
                        node.data.update();
                        node = node.next;
                    }

                    //Reset for remove loop
                    node = this.projectiles.head;

                    var count = 0;

                    //Remove loop
                    while (count < this.projectiles._length) {
                        //Destroy the node
                        if (node.data.alive == false){
                            this.projectiles.searchAndRemove(node.data);
                            break;
                        }
                        else
                            node = node.next;
                        count++;
                    }
                }
            }
        }
    };

    function distance(x1,x2,y1,y2) {
        var a = x1-x2;
        var b = y1-y2;

        return c = Math.sqrt(a*a + b*b);
    }

    //Updates enemy functions based on the type of enemy.
    this.changeType = function (type){
        //Changes the enemy update type.
        this.update = type;
    }

    switch (type){
        case 0:
            this.image.src = "images/asteroid1.png";
            this.changeType(staticUpdate);
            break;
        case 1:
            this.image.src = "images/saucer1.png";
            this.speed += 2;
            this.changeType(dynamicUpdate);
            break;
    }

    this.draw = function (context) {

        if (this.alive === true) {
            if(Game.image_bool == true){
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

            //If projectile list is not empty, loop through projectiles draw.
            if (this.projectiles._length > 0) {
                //Get head node.
                var node = this.projectiles.searchNodeAt(1);

                context.fillStyle = "yellow";

                //Loop until next node is null.
                while (node != null) {
                    node.data.draw(context);
                    node = node.next;
                }
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