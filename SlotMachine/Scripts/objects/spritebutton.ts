module objects {
    // SPRITE BUTTON CLASS
    export class SpriteButton extends objects.GameObject {
        constructor(imageString: string, x:number, y:number) {
            super(imageString, x, y);
            this.x = x;
            this.y = y;

            this.on("mouseover", this.overButton, this);
            this.on("mouseout", this.outButton, this);
        }

        // PRIVATE METHODS
        // Event Handler for mouse over
        overButton(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 0.7;
        }

        // Event Handler for mouse out
        outButton(event: createjs.MouseEvent): void {
            event.currentTarget.alpha = 1.0;
        }
    }
} 