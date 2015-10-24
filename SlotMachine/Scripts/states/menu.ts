module states {
    // MENU CLASS
    export class Menu extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _helloLabel: objects.Label;
        private _startButton: objects.Button;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {

            // hello label
            this._helloLabel = new objects.Label("Game Start", "60px Consolas", "#000000", 320, 240, true);
            this.addChild(this._helloLabel); // add label to the stage

            // start button
            this._startButton = new objects.Button("StartButton", 320, 340);
            this._startButton.on("click", this._clickStartButton, this); // event listener
            this.addChild(this._startButton);

            stage.addChild(this);
        }


        public update(): void {
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Start Button Click
        private _clickStartButton(event: createjs.MouseEvent): void {
            createjs.Sound.play("yay"); // activate static class play 
            changeState(config.PLAY_STATE);
        }

    }


}