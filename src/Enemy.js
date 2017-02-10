/**
 * Created by Bell on 10/02/2017.
 */

//Enemy object.
function Enemy(targetx , targety) {
    this.x = Math.floor((Math.random() * 640) + 1);
    this.y = Math.floor((Math.random() * 480) + 1);
    //Todo: Track position of target using observer pattern.
    //Todo: Calculate rotation on initialisation.
    this.dx = this.x - targetx;
    this.dy = this.y - targety;

    this.rot = Math.atan2(this.dx, this.dy);
    this.speed = 0.5;
    //Todo: Create list for enemy projectiles.
    //this.projectiles = new SinglyLinkedList();

    this.alive = true;
    console.log("x ", this.x, " y ", this.y, " tx ", targetx, "ty ", targety);
    console.log("r ", this.rot, "dx ", this.dx, "dy ", this.dy);

//Updates the rotation of the player.
    this.update = function () {
        //Move in direction of rot by speed.
        this.x -= this.speed * Math.sin(this.rot);
        this.y -= this.speed * Math.cos(this.rot);

        if (this.rot > Math.PI * 2)
            this.rot -= Math.PI * 2;
        if (this.rot < -Math.PI * 2)
            this.rot += Math.PI * 2;        //console.log(this.rot);
        /*
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
         */
    }

    this.draw = function (context) {

        //Create a 8x8 pixel filled rectangle at the position of [x,y]
        context.beginPath();
        context.fillStyle = "red";
        context.fill();
        context.fillRect(this.x - 4, this.y - 4, 8, 8);
        context.closePath();

        /*

         //If projectile list is not empty, loop through projectiles and update or destroy.
         if (this.projectiles._length > 0) {
         //Get head node.
         var node = this.projectiles.searchNodeAt(1);

         //Loop until next node is null.
         while (node != null) {
         node.data.draw(context);
         node = node.next;
         }
         }
         }*/
    }
}