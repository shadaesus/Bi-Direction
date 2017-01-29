/**
 * Created by ALAN on 29/01/2017.
 */
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