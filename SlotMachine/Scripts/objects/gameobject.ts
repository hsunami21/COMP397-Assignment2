module objects {
    // GAMEOBJECT CLASS
    export class GameObject extends createjs.Sprite {
        // CONSTRUCTOR 
        constructor(imageString:string, x: number, y: number) {
            super(atlas, imageString);
            this.x = x;
            this.y = y;

        }
    }
}