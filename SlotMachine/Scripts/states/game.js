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
            // PRIVATE INSTANCE VARIABLES
            this.playerMoney = 1000;
            this.winnings = 0;
            this.jackpot = 5000;
            this.turn = 0;
            this.playerBet = 0;
            this.winNumber = 0;
            this.lossNumber = 0;
            this.fruits = "";
            this.winRatio = 0;
            this.grapes = 0;
            this.bananas = 0;
            this.oranges = 0;
            this.cherries = 0;
            this.bars = 0;
            this.bells = 0;
            this.sevens = 0;
            this.blanks = 0;
        }
        // PUBLIC METHODS
        Game.prototype.start = function () {
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
        };
        Game.prototype.update = function () {
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Back Button Click
        Game.prototype._clickBet1Button = function (event) {
            this._lblBet.text = "1";
        };
        Game.prototype._clickBet10Button = function (event) {
            this._lblBet.text = "10";
        };
        Game.prototype._clickBet100Button = function (event) {
            this._lblBet.text = "100";
        };
        Game.prototype._clickBetMaxButton = function (event) {
            this._lblBet.text = "MAX";
        };
        /* Utility function to check if a value falls within a range of bounds */
        Game.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        Game.prototype._reels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            for (var reel = 0; reel < 3; reel++) {
                outCome[reel] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[reel]) {
                    case this._checkRange(outCome[reel], 1, 27):
                        betLine[reel] = "blank";
                        //blanks++;
                        break;
                    case this._checkRange(outCome[reel], 28, 37):
                        betLine[reel] = "grapes";
                        //grapes++;
                        break;
                    case this._checkRange(outCome[reel], 38, 46):
                        betLine[reel] = "banana";
                        // bananas++;
                        break;
                    case this._checkRange(outCome[reel], 47, 54):
                        betLine[reel] = "orange";
                        //oranges++;
                        break;
                    case this._checkRange(outCome[reel], 55, 59):
                        betLine[reel] = "cherry";
                        //cherries++;
                        break;
                    case this._checkRange(outCome[reel], 60, 62):
                        betLine[reel] = "bar";
                        //bars++;
                        break;
                    case this._checkRange(outCome[reel], 63, 64):
                        betLine[reel] = "bell";
                        //bells++;
                        break;
                    case this._checkRange(outCome[reel], 65, 65):
                        betLine[reel] = "seven";
                        //sevens++;
                        break;
                }
            }
            return betLine;
        };
        //WORKHORSE OF THE GAME
        Game.prototype._spinButtonClick = function (event) {
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
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map