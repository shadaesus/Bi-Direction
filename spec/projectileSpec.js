/**
 * Created by ALAN on 29/01/2017.
 */

describe("Tests projectile type", function(){
    var p;

    it("creates a new projectile", function(){
        p = new Projectile(10, 20, 0.5, 2);
        expect(p).toBeDefined();
        expect(p.x).toEqual(10.0);
        expect(p.y).toEqual(20.0);
        expect(p.rot).toEqual(0.5);
        expect(p.speed).toEqual(2);

    });

    if("Destroys the projectile", function(){
            p = new Projectile(10, 20, 0.5, 2);
            p.destroy();
            expect(p.x).toBe(null);
            expect(p.y).toBe(null);
            expect(p.rot).toBe(null);
            expect(p.speed).toBe(null);
            expect(p.projectiles).toEqual(new SinglyLinkedList());
        });

    it("creates a new player", function(){
        p = new Player();
        expect(p).toBeDefined();
        expect(p.x).toEqual(0);
        expect(p.y).toEqual(0);
        expect(p.rot).toEqual(0);
        expect(p.speed).toEqual(0.05);
        expect(p.movDir).toBe(true);

    });

/*    it("Checks player switchControl", function(){
        p = new Player();
        expect(p).toBeDefined();
        expect(p.x).toEqual(0);
        expect(p.y).toEqual(0);
        expect(p.rot).toEqual(0);
        expect(p.speed).toEqual(0.05);
        expect(p.movDir).toBe(true);

    });*/

/*
    it("Tells wheather a poisition is within the rectangle",function (){
        expect(r.width).toBeLessThan(41);
        expect(r.width).toBeGreaterThan(39);
        expect(r.height).toBeLessThan(31);
        expect(r.height).toBeGreaterThan(29);

    });

    it("Tests the rectangle can be moved to another position", function(){
        r = new Rect(10, 20, 40, 30);
        r.move(50,30);
        expect(r.x).toEqual(50);
        expect(r.y).toEqual(30);
        r.moveBy(15,15);
        expect(r.x).toEqual(65);
        expect(r.y).toEqual(45);

    });

    it("Test wheather a 2 rectanlges overlap", function(){
        r = new Rect(20, 10, 10, 15);
        r2 = new Rect(20, 10, 2, 3);
        r.overlaps(r,r2);
        expect(r.hit).toBe(true);
        expect(r2.hit).toBe(true);
        r = new Rect(10, 10, 10, 15);
        r2 = new Rect(21, 10, 2, 3);
        r.overlaps(r,r2);
        expect(r.hit).toBe(false);
        expect(r2.hit).toBe(false);

    });

    it("Test wheater2 rectanlges are the same object", function(){
        r = new Rect(20, 10, 10, 15);
        r2 = new Rect(20, 10, 10, 15);
        r.is(r,r2);
        expect(r.same).toBe(false);
        expect(r2.same).toBe(false);

    });*/
});
