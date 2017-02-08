/**
 * Created by ALAN on 07/02/2017.
 */


//Player object.
function Player() {
    this.x = 0;
    this.y = 0;
    this.rot = 0;
    this.speed = 0.05;
    this.movDir = true;
    this.projectiles = new SinglyLinkedList();

//Updates the rotation of the player.
    this.update = function () {
        if (this.movDir == true)
            this.rot -= this.speed;
        else
            this.rot += this.speed;

        if (this.rot > Math.PI*2)
            this.rot -= Math.PI*2;
        if (this.rot < -Math.PI*2)
            this.rot += Math.PI*2;

        //Display how many projectiles are in the linked list.
        console.log(this.projectiles.length());

        //Traverse projectiles in player
        this.projectiles.traverse(function (node) {
            if (node.data.alive == true){
                node.data.update();
            }
            else
            {
                //Todo: Remove projectile from the linked list when "alive == false".
              //  this.projectiles.remove(node); //Doesnt work, produces error.
            }
        })

    }

//Control for flipping rotation direction and firing (To be added).
    this.switchControl = function () {
        this.movDir = !this.movDir;
        this.projectiles.add(new Projectile(this.x, this.y, this.rot, 2.5))
    }


    this.draw = function (context) {

        //Calculate the position of the player in accordance to the "this.rot" value.
        this.x = (Game.width / 2) + 30 * Math.cos(this.rot);
        this.y = (Game.height / 2) + 30 * Math.sin(this.rot);

        //Create a 8x8 pixel filled rectangle at the position of [x,y]
        context.fillRect(this.x - 4, this.y - 4, 8, 8);

        //Create a 20r circle at the center of the screen.
        context.beginPath();
        context.arc(Game.width / 2, Game.height / 2, 20, 0, Math.PI * 2, false);
        //context.fillStyle = "green";
        context.fill();
        context.closePath();

        this.projectiles.traverse(function (node) {
            if (node.data.alive == true)
            {
                node.data.draw(context);
            }
        })
    }
}
