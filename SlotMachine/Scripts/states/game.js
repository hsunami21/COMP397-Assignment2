/*
    Source name: Slot Machine
    Author: Wendall Hsu 300739743
    Last Modified By: Wendall Hsu
    Date Last Modified: October 30, 2015
    Program Description: Slot machine web application created using TypeScript
    Revision History:
        Commit #1: Initial commit and added bet button functionality
        Commit #2: Added additional spin functionality (decrease credit, increase jackpot)
        Commit #3: Added fruit tally reset and winnings functionality
        Commit #4: Added check jackpot win functionality
        Commit #5: Added reset and exit buttons, and updated visual appearance
        Commit #6: Added sound effects and enable/disable button click functionality
        Commit #7: Adjusted bet max function and bet button functionality
        Commit #8: Modified spin function to prevent player from resetting or exiting while slot machine is spinning
        Commit #9: Minor changes to alert messages
        Commit #10: Modified reset button (reset reels) and spin button (stop sound) functionalities
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    // GAME CLASS
    var Game = (function (_super) {
        __extends(Game, _super);
        // CONSTRUCTOR
        function Game() {
            _super.call(this);
            // GAME VARIABLES
            this._playerMoney = 1000;
            this._winnings = 0;
            this._jackpot = 5000;
            this._playerBet = 0;
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        }
        // PUBLIC METHODS
        Game.prototype.start = function () {
            this._slotMachine = new createjs.Container();
            this._slotMachine.y = 75;
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
            this._tile1 = new objects.GameObject("seven", 74, 192);
            this._slotMachine.addChild(this._tile1);
            this._tile2 = new objects.GameObject("seven", 152, 192);
            this._slotMachine.addChild(this._tile2);
            this._tile3 = new objects.GameObject("seven", 230, 192);
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
            this._btnReset = new objects.SpriteButton("resetButton", 30, 15);
            stage.addChild(this._btnReset);
            this._btnExit = new objects.SpriteButton("exitButton", 220, 15);
            stage.addChild(this._btnExit);
            // add event listeners
            this._btnBet1.on("click", this._clickBet1Button, this);
            this._btnBet10.on("click", this._clickBet10Button, this);
            this._btnBet100.on("click", this._clickBet100Button, this);
            this._btnBetMax.on("click", this._clickBetMaxButton, this);
            this._btnSpin.on("click", this._clickSpinButton, this);
            this._btnReset.on("click", this._clickResetButton, this);
            this._btnExit.on("click", this._clickExitButton, this);
        };
        Game.prototype.update = function () {
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Enable/disable button clicks during spin
        Game.prototype._enableButtonClick = function () {
            this._btnBet1.alpha = 1;
            this._btnBet10.alpha = 1;
            this._btnBet100.alpha = 1;
            this._btnBetMax.alpha = 1;
            this._btnSpin.alpha = 1;
            this._btnReset.alpha = 1;
            this._btnExit.alpha = 1;
            this._btnBet1.mouseEnabled = true;
            this._btnBet10.mouseEnabled = true;
            this._btnBet100.mouseEnabled = true;
            this._btnBetMax.mouseEnabled = true;
            this._btnSpin.mouseEnabled = true;
            this._btnReset.mouseEnabled = true;
            this._btnExit.mouseEnabled = true;
        };
        Game.prototype._disableButtonClick = function () {
            this._btnBet1.alpha = 0.3;
            this._btnBet10.alpha = 0.3;
            this._btnBet100.alpha = 0.3;
            this._btnBetMax.alpha = 0.3;
            this._btnSpin.alpha = 0.3;
            this._btnBet1.mouseEnabled = false;
            this._btnBet10.mouseEnabled = false;
            this._btnBet100.mouseEnabled = false;
            this._btnBetMax.mouseEnabled = false;
            this._btnSpin.mouseEnabled = false;
        };
        // Event handlers for bet buttons
        Game.prototype._clickBet1Button = function (event) {
            if (this._playerMoney == 0) {
                alert("You have no credits left! Click RESET to play again!");
                this._disableButtonClick();
            }
            else if (this._playerBet + 1 > 999) {
                alert("You cannot bet more than the maximum of 999 credits!");
            }
            else {
                createjs.Sound.play("bet");
                this._playerBet += 1;
                this._lblBet.text = this._playerBet.toString();
            }
        };
        Game.prototype._clickBet10Button = function (event) {
            if (this._playerMoney == 0) {
                alert("You have no credits left! Click RESET to play again!");
                this._disableButtonClick();
            }
            else if (this._playerBet + 10 > 999) {
                alert("You cannot bet more than the maximum of 999 credits!");
            }
            else {
                createjs.Sound.play("bet");
                this._playerBet += 10;
                this._lblBet.text = this._playerBet.toString();
            }
        };
        Game.prototype._clickBet100Button = function (event) {
            if (this._playerMoney == 0) {
                alert("You have no credits left! Click RESET to play again!");
                this._disableButtonClick();
            }
            else if (this._playerBet + 100 > 999) {
                alert("You cannot bet more than the maximum of 999 credits!");
            }
            else {
                createjs.Sound.play("bet");
                this._playerBet += 100;
                this._lblBet.text = this._playerBet.toString();
            }
        };
        Game.prototype._clickBetMaxButton = function (event) {
            if (this._playerMoney == 0) {
                alert("You have no credits left! Click RESET to play again!");
                this._disableButtonClick();
            }
            else {
                createjs.Sound.play("bet");
                this._playerBet = 999;
                this._lblBet.text = this._playerBet.toString();
            }
        };
        // Event handlers for reset and exit buttons
        Game.prototype._clickResetButton = function (event) {
            createjs.Sound.stop();
            this._playerMoney = 1000;
            this._jackpot = 5000;
            this._winnings = 0;
            this._playerBet = 0;
            this._lblCredit.text = this._playerMoney.toString();
            this._lblJackpot.text = this._jackpot.toString();
            this._lblWinnings.text = this._winnings.toString();
            this._lblBet.text = this._playerBet.toString();
            this._tile1.gotoAndStop("seven");
            this._tile2.gotoAndStop("seven");
            this._tile3.gotoAndStop("seven");
            this._enableButtonClick();
        };
        Game.prototype._clickExitButton = function (event) {
            createjs.Sound.stop();
            changeState(config.MENU_STATE);
        };
        /* Utility function to reset all fruit tallies */
        Game.prototype._resetFruitTally = function () {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        };
        /* Check to see if the player won the jackpot */
        Game.prototype._checkJackPot = function () {
            /* compare two random values */
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);
            if (jackPotTry == jackPotWin) {
                return true;
            }
            else {
                return false;
            }
        };
        /* Utility function to check if a value falls within a range of bounds */
        Game.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            if (value >= lowerBounds && value <= upperBounds) {
                return value;
            }
            else {
                return -1;
            }
        };
        /* When this function is called it determines the betLine results.   e.g. Bar - Orange - Banana */
        Game.prototype._reels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            for (var reel = 0; reel < 3; reel++) {
                outCome[reel] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[reel]) {
                    case this._checkRange(outCome[reel], 1, 27):
                        betLine[reel] = "blank";
                        this._blanks++;
                        break;
                    case this._checkRange(outCome[reel], 28, 37):
                        betLine[reel] = "grapes";
                        this._grapes++;
                        break;
                    case this._checkRange(outCome[reel], 38, 46):
                        betLine[reel] = "banana";
                        this._bananas++;
                        break;
                    case this._checkRange(outCome[reel], 47, 54):
                        betLine[reel] = "orange";
                        this._oranges++;
                        break;
                    case this._checkRange(outCome[reel], 55, 59):
                        betLine[reel] = "cherry";
                        this._cherries++;
                        break;
                    case this._checkRange(outCome[reel], 60, 62):
                        betLine[reel] = "bar";
                        this._bars++;
                        break;
                    case this._checkRange(outCome[reel], 63, 64):
                        betLine[reel] = "bell";
                        this._bells++;
                        break;
                    case this._checkRange(outCome[reel], 65, 65):
                        betLine[reel] = "seven";
                        this._sevens++;
                        break;
                }
            }
            return betLine;
        };
        /* This function calculates the player's winnings, if any */
        Game.prototype._determineWinnings = function () {
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
                this._playerMoney += this._winnings;
                this._lblCredit.text = this._playerMoney.toString();
                createjs.Sound.play("yay");
                console.log("Win");
            }
            else {
                // decrease credits by bet amount
                this._playerMoney -= this._playerBet;
                this._lblCredit.text = this._playerMoney.toString();
                // increase jackpot by 2x bet amount
                this._jackpot += (this._playerBet * 2);
                this._lblJackpot.text = this._jackpot.toString();
                console.log("Lose");
            }
        };
        // WORKHORSE OF THE GAME
        Game.prototype._clickSpinButton = function (event) {
            console.log("Bet: " + this._playerBet);
            createjs.Sound.stop();
            var currentContext = this;
            // check to see if player is betting anything and is betting less than his/her current credits
            if (this._playerMoney == 0) {
                alert("You have no credits left! Click RESET to play again!");
                this._disableButtonClick();
            }
            else if (this._playerBet == 0) {
                alert("You did not bet anything!");
            }
            else if (this._playerBet > this._playerMoney) {
                alert("You do not have enough credits!");
                this._playerBet = 0;
                this._lblBet.text = this._playerBet.toString();
            }
            else {
                this._disableButtonClick();
                // stop user from resetting and exiting while slot machine is spinning
                this._btnReset.alpha = 0.3;
                this._btnExit.alpha = 0.3;
                this._btnReset.mouseEnabled = false;
                this._btnExit.mouseEnabled = false;
                createjs.Sound.play("spin");
                this._spinResult = this._reels();
                console.log(this._spinResult[0] + " - " + this._spinResult[1] + " - " + this._spinResult[2]);
                console.log("Blanks: " + this._blanks + "\nGrapes: " + this._grapes + "\nBananas: " + this._bananas + "\nOranges: " + this._oranges + "\nCherries: " + this._cherries +
                    "\nBars: " + this._bars + "\nBells: " + this._bells + "\nSevens: " + this._sevens);
                // change reel pictures 1 second at a time
                setTimeout(function () { currentContext._tile1.gotoAndStop(currentContext._spinResult[0]); }, 1000);
                setTimeout(function () { currentContext._tile2.gotoAndStop(currentContext._spinResult[1]); }, 2000);
                setTimeout(function () { currentContext._tile3.gotoAndStop(currentContext._spinResult[2]); }, 3000);
                // show winnings/losings after 5 seconds
                setTimeout(function () {
                    currentContext._lblWinnings.text = "0";
                    if (currentContext._checkJackPot()) {
                        createjs.Sound.play("jackpot");
                        alert("You Won the $" + currentContext._jackpot + " Jackpot!!!");
                        currentContext._playerMoney += currentContext._jackpot;
                        currentContext._jackpot = 1000;
                        currentContext._lblCredit.text = currentContext._playerMoney.toString();
                        currentContext._lblJackpot.text = currentContext._jackpot.toString();
                    }
                    else {
                        currentContext._determineWinnings();
                    }
                    currentContext._playerBet = 0;
                    currentContext._lblBet.text = currentContext._playerBet.toString();
                    currentContext._resetFruitTally();
                    currentContext._enableButtonClick();
                    console.log("Player money: " + currentContext._playerMoney);
                    console.log("Jackpot: " + currentContext._jackpot);
                }, 5000);
            }
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map