/**
 * Created by ALAN on 07/02/2017.
 */

/**
 * Player
 * @constructor
 */

function Player() {
    this.x = 0;
    this.y = 0;
    this.width = 16;
    this.height = 4;
    this.radius = 20;;
    this.orbit = 5;
    this.rot = 0;
    this.health = 5;
    this.speed = 0.025;
    this.movDir = true;
    this.planetImage = new Image();
    this.playerImage = new Image();
    this.projectiles = new DoublyList();
    this.playerImage.src = "images/ship.png";
    this.planetImage.src = "images/planet1.png";


//Updates the rotation of the player.
    this.update = function () {
        if (this.movDir == true)
            this.rot -= this.speed;
        else
            this.rot += this.speed;

        if (this.rot > Math.PI )
            this.rot -= Math.PI * 2;
        if (this.rot < -Math.PI )
            this.rot += Math.PI * 2;

        //Calculate the position of the player in accordance to the "this.rot" value.
        this.x = (Game.width / 2) + (this.radius + this.orbit) * Math.cos(this.rot);
        this.y = (Game.height / 2) + (this.radius + this.orbit) * Math.sin(this.rot);

        //console.log(this.projectiles._length);

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

    //Control for flipping rotation direction and firing (To be added).
    this.switchControl = function () {
        this.movDir = !this.movDir;
        console.log(this.rot);
        this.projectiles.add(new Projectile(this.x, this.y, this.rot, 2.5))
    }


    this.draw = function (context) {


        if (Game.image_bool == true) {

            context.save();
            context.translate(Game.width / 2, Game.height / 2)
            context.scale(this.radius * 4 / this.planetImage.width, this.radius * 4 / this.planetImage.height);
            context.drawImage(this.planetImage, -this.radius / 2, -this.radius / 2, this.radius, this.radius);
            context.restore();

            context.save();
            context.translate(this.x, this.y);
            context.rotate(Math.PI / 2);
            context.rotate(this.rot);
            context.scale(this.width / this.playerImage.width, this.height / this.playerImage.height);
            context.drawImage(this.playerImage, -this.width * 2, this.height * 2);
            context.restore();

        } else {
            //Create a 20r circle at the center of the screen.
            context.beginPath();
            context.arc(Game.width / 2, Game.height / 2, this.radius, 0, Math.PI * 2, false);
            context.fillStyle = "blue";
            context.fill();

            //Player ship
            context.beginPath();
            context.fillStyle = "green";
            context.fill();

            context.save();
            context.translate(Game.width/2, Game.height/2);
            context.rotate(-Math.PI / 2);
            context.rotate(this.rot);
            context.fillRect(-this.width / 2, this.radius + this.orbit - this.height / 2, this.width, this.height);
            context.restore();
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

