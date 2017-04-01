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
    this.image = new Image();
    this.width = 4;
    this.rot = angle;
    this.speed = speed;
    this.alive = true;

    this.update = function () {
        //Move by 'speed' in the direction of 'rot'.
        this.x += this.speed * Math.cos(this.rot);
        this.y += this.speed * Math.sin(this.rot);

        //Destroy if outside of canvas
        if (this.x > Game.width || this.x < 0 || this.y < 0 || this.y > Game.height)
        {
            this.destroy();
        }
        if (this.x > Game.width/2 - 5 && this.x < Game.width/2 + 5 && this.y > Game.height/2 - 5 && this.y < Game.height/2 + 5)
            this.destroy();

    }

    this.draw = function (context) {


        if (this.alive === true) {
            if (Game.image_bool == true) {
                this.image.src = "images/projectile1.png";
                context.save();
                context.translate(this.x - this.width / 2, this.y - this.width / 2);
                context.rotate(Math.PI /2);
                context.rotate(this.rot);
                context.scale(this.width / this.image.width, this.width / this.image.width);
                context.drawImage(this.image, 0, 0);
                context.restore();
            } else {
                //Create a 4x4 pixel filled rectangle at the position of [x,y]
                context.beginPath();
                context.fill();
                context.fillRect(this.x - this.width / 2, this.y - this.width / 2, this.width, this.width);
            }
        }
    }
    this.destroy = function () {
        this.x = null;
        this.y = null;
        this.rot = null;
        this.speed = null;
        this.alive = false;
    }

    this.print = function () {
        console.log("P: (" + this.x + ", " + this.y + ")");
    }
}