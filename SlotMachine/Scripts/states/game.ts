/*
    Source name: Slot Machine
    Author: Wendall Hsu 300739743
    Last Modified By: Wendall Hsu
    Date Last Modified: October 24, 2015
    Program Description: Slot machine web application created using TypeScript
    Revision History:
        Commit #1: Initial commit and added bet button functionality
        Commit #2: Added additionaly spin functionality (decrease credit, increase jackpot)
        Commit #3: Added fruit tally reset and winnings functionality
        Commit #4: Added check jackpot win functionality
*/

module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
       
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
        private _playerMoney: number = 1000;
        private _winnings: number = 0;
        private _jackpot: number = 5000;
        private _playerBet: number = 0;
        private _grapes: number = 0;
        private _bananas: number = 0;
        private _oranges: number = 0;
        private _cherries: number = 0;
        private _bars: number = 0;
        private _bells: number = 0;
        private _sevens: number = 0;
        private _blanks: number = 0;
        private _spinResult: string[];

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
            this._slotMachine = new createjs.Container();
            //this._slotMachine.x = 132.5;

            this._background = new createjs.Bitmap(assets.getResult("background"));
            this._slotMachine.addChild(this._background); // add background image

            this._lblCredit = new objects.Label(this._playerMoney.toString(), "24px Consolas", "#ff0000", 135, 335, false);
            this._slotMachine.addChild(this._lblCredit);

            this._lblBet = new objects.Label(this._playerBet.toString(), "24px Consolas", "#ff0000", 210, 335, false);
            this._slotMachine.addChild(this._lblBet);

            this._lblWinnings = new objects.Label(this._winnings.toString(), "24px Consolas", "#ff0000", 325, 335, false);
            this._slotMachine.addChild(this._lblWinnings);

            this._lblJackpot = new objects.Label(this._jackpot.toString(), "24px Consolas", "#ff0000", 230, 52, false);
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
            this._playerBet += 1;
            this._lblBet.text = this._playerBet.toString();
        }

        private _clickBet10Button(event: createjs.MouseEvent): void {
            this._playerBet += 10;
            this._lblBet.text = this._playerBet.toString();
        }

        private _clickBet100Button(event: createjs.MouseEvent): void {
            this._playerBet += 100;
            this._lblBet.text = this._playerBet.toString();
        }

        private _clickBetMaxButton(event: createjs.MouseEvent): void {
            this._lblBet.text = "MAX";
            this._playerBet = this._playerMoney;
        }

        /* Utility function to reset all fruit tallies */
        private _resetFruitTally(): void {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        }

        /* Check to see if the player won the jackpot */
        private _checkJackPot(): boolean {
            /* compare two random values */
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);
            if (jackPotTry == jackPotWin) {
                return true;
            }
            else {
                return false;
            }
        }

        /* Utility function to check if a value falls within a range of bounds */
        private _checkRange(value:number, lowerBounds:number, upperBounds:number): number {
            if (value >= lowerBounds && value <= upperBounds) {
                return value;
            }
            else {
                return -1;
            }
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
                    this._blanks++;
                    break;
                case this._checkRange(outCome[reel], 28, 37): // 15.4% probability
                    betLine[reel] = "grapes";
                    this._grapes++;
                    break;
                case this._checkRange(outCome[reel], 38, 46): // 13.8% probability
                    betLine[reel] = "banana";
                    this._bananas++;
                    break;
                case this._checkRange(outCome[reel], 47, 54): // 12.3% probability
                    betLine[reel] = "orange";
                    this._oranges++;
                    break;
                case this._checkRange(outCome[reel], 55, 59): //  7.7% probability
                    betLine[reel] = "cherry";
                    this._cherries++;
                    break;
                case this._checkRange(outCome[reel], 60, 62): //  4.6% probability
                    betLine[reel] = "bar";
                    this._bars++;
                    break;
                case this._checkRange(outCome[reel], 63, 64): //  3.1% probability
                    betLine[reel] = "bell";
                    this._bells++;
                    break;
                case this._checkRange(outCome[reel], 65, 65): //  1.5% probability
                    betLine[reel] = "seven";
                    this._sevens++;
                    break;
                }
            }
            return betLine;
        }

        /* This function calculates the player's winnings, if any */
        private _determineWinnings(): void {
            if (this._blanks == 0) {
                if (this._grapes == 3) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._bananas == 3) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._oranges == 3) {
                    this._winnings = this._playerBet * 30;
                }
                else if (this._cherries == 3) {
                    this._winnings = this._playerBet * 40;
                }
                else if (this._bars == 3) {
                    this._winnings = this._playerBet * 50;
                }
                else if (this._bells == 3) {
                    this._winnings = this._playerBet * 75;
                }
                else if (this._sevens == 3) {
                    this._winnings = this._playerBet * 100;
                }
                else if (this._grapes == 2) {
                    this._winnings = this._playerBet * 2;
                }
                else if (this._bananas == 2) {
                    this._winnings = this._playerBet * 2;
                }
                else if (this._oranges == 2) {
                    this._winnings = this._playerBet * 3;
                }
                else if (this._cherries == 2) {
                    this._winnings = this._playerBet * 4;
                }
                else if (this._bars == 2) {
                    this._winnings = this._playerBet * 5;
                }
                else if (this._bells == 2) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._sevens == 2) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._sevens == 1) {
                    this._winnings = this._playerBet * 5;
                }
                else {
                    this._winnings = this._playerBet * 1;
                }
                this._lblWinnings.text = this._winnings.toString();
                this._txtCredit = this._txtCredit + this._winnings;
                this._lblCredit.text = this._txtCredit.toString();

                console.log("Win");
            }
            else {
                // decrease credits by bet amount
                this._txtCredit = this._txtCredit - this._txtBet;
                this._lblCredit.text = this._txtCredit.toString();

                // increase jackpot by 2x bet amount
                this._txtJackpot = this._txtJackpot + (this._txtBet * 2);
                this._lblJackpot.text = this._txtJackpot.toString();

                console.log("Lose");
            }

            // set playerMoney and jackpot to new values
            this._playerMoney = this._txtCredit;
            this._jackpot = this._txtJackpot;
            
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
                
                this._spinResult = this._reels();

                // change reel pictures
                this._tile1.gotoAndStop(this._spinResult[0]);
                this._tile2.gotoAndStop(this._spinResult[1]);
                this._tile3.gotoAndStop(this._spinResult[2]);

                console.log(this._spinResult[0] + " - " + this._spinResult[1] + " - " + this._spinResult[2]);
                console.log("Blanks: " + this._blanks + "\nGrapes: " + this._grapes + "\nBananas: " + this._bananas + "\nOranges: " + this._oranges + "\nCherries: " + this._cherries +
                    "\nBars: " + this._bars + "\nBells: " + this._bells + "\nSevens: " + this._sevens);


                this._lblBet.text = "0";
                this._lblWinnings.text = "0";

                if (this._checkJackPot()) {
                    alert("You Won the $" + this._jackpot + " Jackpot!!");
                    this._playerMoney += this._jackpot;
                    this._jackpot = 1000;
                    this._lblCredit.text = this._playerMoney.toString();
                    this._lblJackpot.text = this._jackpot.toString();
                }
                else {
                    this._determineWinnings();
                }

                this._playerBet = 0;
                this._resetFruitTally();

                console.log("Player money: " + this._playerMoney);
                console.log("Jackpot: "+ this._jackpot);

            }

            
        }


    }


} 