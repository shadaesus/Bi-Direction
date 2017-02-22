/**
 * Created by ALAN on 29/01/2017.
 */


/**
 * Takess x and y positions as well rottaional direction and speed.
 * @param {integer} x
 * @param {integer} y
 * @param {integer} angle
 * @param {integer} speed
 * @constructor
 */
function Projectile(x, y, angle, speed) {

    this.x = x;
    this.y = y;
    this.rot = angle;
    this.speed = speed;
    this.alive = true;

    this.update = function () {
        //Move by 'speed' in the direction of 'rot'.
        this.x += this.speed * Math.cos(this.rot);
        this.y += this.speed * Math.sin(this.rot);

        if (this.x > Game.width || this.x < 0 || this.y < 0 || this.y > Game.height)
        {
            this.destroy();
        }
    }

    this.draw = function (context) {
        //Create a 4x4 pixel filled rectangle at the position of [x,y]
        context.beginPath();
        //context.fillStyle = "yellow";
        context.fill();
        context.fillRect(this.x - 2, this.y - 2, 4, 4);
        //        context.closePath();

    }
    this.destroy = function () {
        this.x = null;
        this.y = null;
        this.rot = null;
        this.speed = null;
        this.alive = false;
    }
    this.print = function (){
        console.log("P: (" + this.x + ", " + this.y + ")");

    }
}