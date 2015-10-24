module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private playerMoney = 1000;
        private winnings = 0;
        private jackpot = 5000;
        private turn = 0;
        private playerBet = 0;
        private winNumber = 0;
        private lossNumber = 0;
        private spinResult;
        private fruits = "";
        private winRatio = 0;
        private grapes = 0;
        private bananas = 0;
        private oranges = 0;
        private cherries = 0;
        private bars = 0;
        private bells = 0;
        private sevens = 0;
        private blanks = 0;

        // UI OBJECTS ++++++++++++++++++++++++++++++++++++++
        private _slotMachine: createjs.Container;
        private _background: createjs.Bitmap;
        
        private _tile1: objects.GameObject;
        private _tile2: objects.GameObject;
        private _tile3: objects.GameObject;

        private _betLine: objects.GameObject;

        private _lblCredit: objects.Label;
        private _lblBet: objects.Label;
        private _lblWinnings: objects.Label;
        private _lblJackpot: objects.Label;

        private _btnBet1: objects.SpriteButton;
        private _btnBet10: objects.SpriteButton;
        private _btnBet100: objects.SpriteButton;
        private _btnBetMax: objects.SpriteButton;
        private _btnSpin: objects.SpriteButton;

        private _txtBet: number;
        private _txtCredit: number;
        private _txtJackpot: number;

        // GAME VARIABLES

        private _spinResult: string[];

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
            this._slotMachine = new createjs.Container();
            this._slotMachine.x = 132.5;

            this._background = new createjs.Bitmap(assets.getResult("background"));
            this._slotMachine.addChild(this._background); // add background image

            this._lblCredit = new objects.Label("1000", "24px Consolas", "#ff0000", 135, 335, false);
            this._slotMachine.addChild(this._lblCredit);

            this._lblBet = new objects.Label("0", "24px Consolas", "#ff0000", 210, 335, false);
            this._slotMachine.addChild(this._lblBet);

            this._lblWinnings = new objects.Label("0", "24px Consolas", "#ff0000", 325, 335, false);
            this._slotMachine.addChild(this._lblWinnings);

            this._lblJackpot = new objects.Label("1000", "24px Consolas", "#ff0000", 230, 52, false);
            this._slotMachine.addChild(this._lblJackpot);

            this._tile1 = new objects.GameObject("blank", 74, 192);
            this._slotMachine.addChild(this._tile1);

            this._tile2 = new objects.GameObject("blank", 152, 192);
            this._slotMachine.addChild(this._tile2);

            this._tile3 = new objects.GameObject("blank", 230, 192);
            this._slotMachine.addChild(this._tile3);

            this._betLine = new objects.GameObject("bet_line", 61, 225);
            this._slotMachine.addChild(this._betLine);

            this._btnBet1 = new objects.SpriteButton("bet1Button", 23, 386);
            this._slotMachine.addChild(this._btnBet1);

            this._btnBet10 = new objects.SpriteButton("bet10Button", 88, 386);
            this._slotMachine.addChild(this._btnBet10);

            this._btnBet100 = new objects.SpriteButton("bet100Button", 153, 386);
            this._slotMachine.addChild(this._btnBet100);

            this._btnBetMax = new objects.SpriteButton("betMaxButton", 218, 386);
            this._slotMachine.addChild(this._btnBetMax);

            this._btnSpin = new objects.SpriteButton("spinButton", 289, 386);
            this._slotMachine.addChild(this._btnSpin);

            this.addChild(this._slotMachine);
            stage.addChild(this);

            // add event listeners
            this._btnBet1.on("click", this._clickBet1Button, this);
            this._btnBet10.on("click", this._clickBet10Button, this);
            this._btnBet100.on("click", this._clickBet100Button, this);
            this._btnBetMax.on("click", this._clickBetMaxButton, this);

            this._btnSpin.on("click", this._spinButtonClick, this);
        }


        public update(): void {
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Back Button Click
        private _clickBet1Button(event: createjs.MouseEvent): void {
            this._lblBet.text = "1";
        }

        private _clickBet10Button(event: createjs.MouseEvent): void {
            this._lblBet.text = "10";
        }

        private _clickBet100Button(event: createjs.MouseEvent): void {
            this._lblBet.text = "100";
        }

        private _clickBetMaxButton(event: createjs.MouseEvent): void {
            this._lblBet.text = "MAX";
        }

        /* Utility function to check if a value falls within a range of bounds */
        private _checkRange(value:number, lowerBounds:number, upperBounds:number):number {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        }

        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        private _reels(): string[] {
        var betLine: string[] = [" ", " ", " "];
        var outCome: number[] = [0, 0, 0];

        for (var reel = 0; reel < 3; reel++) {
            outCome[reel] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[reel]) {
                case this._checkRange(outCome[reel], 1, 27):  // 41.5% probability
                    betLine[reel] = "blank";
                    //blanks++;
                    break;
                case this._checkRange(outCome[reel], 28, 37): // 15.4% probability
                    betLine[reel] = "grapes";
                    //grapes++;
                    break;
                case this._checkRange(outCome[reel], 38, 46): // 13.8% probability
                    betLine[reel] = "banana";
                   // bananas++;
                    break;
                case this._checkRange(outCome[reel], 47, 54): // 12.3% probability
                    betLine[reel] = "orange";
                    //oranges++;
                    break;
                case this._checkRange(outCome[reel], 55, 59): //  7.7% probability
                    betLine[reel] = "cherry";
                    //cherries++;
                    break;
                case this._checkRange(outCome[reel], 60, 62): //  4.6% probability
                    betLine[reel] = "bar";
                    //bars++;
                    break;
                case this._checkRange(outCome[reel], 63, 64): //  3.1% probability
                    betLine[reel] = "bell";
                    //bells++;
                    break;
                case this._checkRange(outCome[reel], 65, 65): //  1.5% probability
                    betLine[reel] = "seven";
                    //sevens++;
                    break;
            }
        }
        return betLine;
    }



        //WORKHORSE OF THE GAME
        private _spinButtonClick(event: createjs.MouseEvent): void {

            // convert strings to numbers
            this._txtBet = parseInt(this._lblBet.text);
            this._txtCredit = parseInt(this._lblCredit.text);
            this._txtJackpot = parseInt(this._lblJackpot.text);

            if (this._lblBet.text == "MAX") {
                // bet all credits
                this._txtBet = this._txtCredit;
            }

            console.log(this._txtBet);
            console.log(this._txtCredit);

            if (this._txtCredit == 0) {
                alert("You have no credits left!");
            }
            else if (this._txtBet == 0) {
                alert("You did not bet anything!");
            }
            else if (this._txtBet > this._txtCredit) {
                alert("You do not have enough credits!");
            }
            else {
                // decrease credits by bet amount
                this._txtCredit = this._txtCredit - this._txtBet;
                this._lblCredit.text = "" + this._txtCredit;

                // increase jackpot by bet amount
                this._txtJackpot = this._txtJackpot + this._txtBet;
                this._lblJackpot.text = "" + this._txtJackpot;

                this._spinResult = this._reels();

                this._tile1.gotoAndStop(this._spinResult[0]);
                this._tile2.gotoAndStop(this._spinResult[1]);
                this._tile3.gotoAndStop(this._spinResult[2]);


                console.log(this._spinResult[0] + " - " + this._spinResult[1] + " - " + this._spinResult[2]);
            }

            this._lblBet.text = "0";
            
        }


    }


} 