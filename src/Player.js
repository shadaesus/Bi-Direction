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

        if (this.rot > Math.PI * 2)
            this.rot -= Math.PI * 2;
        if (this.rot < -Math.PI * 2)
            this.rot += Math.PI * 2;

        //If projectile list is not empty, loop through projectiles and update or destroy.
        if (this.projectiles._length > 0) {
            //Get head node.
            var node = this.projectiles.searchNodeAt(1);

            var count = 1;
           // console.log("l " + this.projectiles._length);

            //Loop until next node is null.
            while (node != null) {
                if (node.data.alive === true) {
                    //node.data.print();
                    node.data.update();
                    //console.log("c " + count);
                    count++;
                    node = node.next;
                }
                else {
                    node = node.next;
                    this.projectiles.remove(count);
                }

            }
        }

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
        context.beginPath();
        context.fillStyle = "green";
        context.fill();
        context.fillRect(this.x - 4, this.y - 4, 8, 8);
        //context.closePath();


        //Create a 20r circle at the center of the screen.
        context.beginPath();
        context.arc(Game.width / 2, Game.height / 2, 20, 0, Math.PI * 2, false);
        context.fillStyle = "blue";
        context.fill();
       //context.closePath();


        console.log(this.projectiles._length);

        //If projectile list is not empty, loop through projectiles and update or destroy.
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
