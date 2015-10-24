module states {
    // OVER CLASS
    export class Over extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        _levelLabel: objects.Label;
        _backButton: objects.Button;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {

            // level label
            this._levelLabel = new objects.Label("Game Over", "60px Consolas", "#000000", 320, 240, true);
            this.addChild(this._levelLabel); // add label to the stage

            // back button
            this._backButton = new objects.Button("BackButton", 320, 340);
            this._backButton.on("click", this._clickBackButton, this); // event listener
            this.addChild(this._backButton);

            stage.addChild(this);

        }


        public update(): void {
            this._levelLabel.rotation += 5;
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Back Button Click
        private _clickBackButton(event: createjs.MouseEvent): void {
            changeState(config.PLAY_STATE);
        }


    }


}  