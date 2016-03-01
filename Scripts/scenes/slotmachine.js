var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// MENU SCENE
var scenes;
(function (scenes) {
    var SlotMachine = (function (_super) {
        __extends(SlotMachine, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function SlotMachine() {
            _super.call(this);
            this._pears = 0;
            this._bananas = 0;
            this._watermelons = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._lemons = 0;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        SlotMachine.prototype.start = function () {
            //play sound
            createjs.Sound.play('begin');
            // Reset the Game to initial values 
            this._resetAll();
            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);
            // add Bet1Button to the scene
            this._bet1Button = new objects.Button("Bet1Button", 158, 297, false);
            this.addChild(this._bet1Button);
            this._bet1Button.on("click", this._bet1ButtonClick, this);
            // add Bet10Button to the scene
            this._bet10Button = new objects.Button("Bet10Button", 208, 297, false);
            this.addChild(this._bet10Button);
            this._bet10Button.on("click", this._bet10ButtonClick, this);
            // add Bet20Button to the scene
            this._bet20Button = new objects.Button("Bet20Button", 258, 297, false);
            this.addChild(this._bet20Button);
            this._bet20Button.on("click", this._bet20ButtonClick, this);
            // add Bet50Button to the scene
            this._bet50Button = new objects.Button("Bet50Button", 308, 297, false);
            this.addChild(this._bet50Button);
            this._bet50Button.on("click", this._bet50ButtonClick, this);
            // add Bet100Button to the scene
            this._bet100Button = new objects.Button("Bet100Button", 358, 297, false);
            this.addChild(this._bet100Button);
            this._bet100Button.on("click", this._bet100ButtonClick, this);
            // add SpinButton to the scene
            this._spinButton = new objects.Button("SpinButton", 430, 297, false);
            this.addChild(this._spinButton);
            this._spinButton.on("click", this._spinButtonClick, this);
            //add reset button            
            this._reset = new objects.Button("Reset", 270, 353, false);
            this.addChild(this._reset);
            this._reset.on("click", this._resetButtonClick, this);
            //add close button
            this._close = new objects.Button("close", 590, 20, false);
            this.addChild(this._close);
            this._close.on("click", this._closeButtonClick, this);
            // add JackPot Text to the scene
            this._jackpotText = new objects.Label(this.jackpot.toString(), "14px Consolas", "#ff0000", 335, 143, false);
            this._jackpotText.textAlign = "right";
            this.addChild(this._jackpotText);
            // add Credits Text to the scene
            this._creditsText = new objects.Label(this.playerMoney.toString(), "14px Consolas", "#ff0000", 225, 78, false);
            this._creditsText.textAlign = "right";
            this.addChild(this._creditsText);
            // add Bet Text to the scene
            this._betText = new objects.Label(this.playerBet.toString(), "14px Consolas", "#ff0000", 210, 143, false);
            this._betText.textAlign = "right";
            this.addChild(this._betText);
            // add Result Text to the scene
            this._resultText = new objects.Label(this.winnings.toString(), "14px Consolas", "#ff0000", 420, 78, false);
            this._resultText.textAlign = "right";
            this.addChild(this._resultText);
            // Initialize Array of Bitmaps 
            this._initializeBitmapArray();
            // Setup Background
            this._setupBackground("bg");
            // FadeIn
            this._fadeIn(500);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // SLOT_MACHINE Scene updates here
        SlotMachine.prototype.update = function () {
        };
        //PRIVATE METHODS
        /* Utility function to check if a value falls within a range of bounds */
        SlotMachine.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        SlotMachine.prototype._resetAll = function () {
            this.playerMoney = 1000;
            this.winnings = 0;
            this.jackpot = 5000;
            this.playerBet = 0;
            this._resultText;
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        SlotMachine.prototype._spinReels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):
                        betLine[spin] = "bar";
                        this._bars++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37):
                        betLine[spin] = "pear";
                        this._pears++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46):
                        betLine[spin] = "banana";
                        this._bananas++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54):
                        betLine[spin] = "watermelon";
                        this._watermelons++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59):
                        betLine[spin] = "cherry";
                        this._cherries++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64):
                        betLine[spin] = "bell";
                        this._bells++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65):
                        betLine[spin] = "lemon";
                        this._lemons++;
                        break;
                }
            }
            return betLine;
        };
        /* This function calculates the player's winnings, if any */
        SlotMachine.prototype._determineWinnings = function () {
            if (this._bars == 0) {
                if (this._pears == 3) {
                    this.winnings = this.playerBet * 10;
                }
                else if (this._bananas == 3) {
                    this.winnings = this.playerBet * 20;
                }
                else if (this._watermelons == 3) {
                    this.winnings = this.playerBet * 30;
                }
                else if (this._cherries == 3) {
                    this.winnings = this.playerBet * 40;
                }
                else if (this._bars == 3) {
                    this.winnings = this.playerBet * 50;
                }
                else if (this._bells == 3) {
                    this.winnings = this.playerBet * 75;
                }
                else if (this._lemons == 3) {
                    this.winnings = this.playerBet * 100;
                }
                else if (this._pears == 2) {
                    this.winnings = this.playerBet * 2;
                }
                else if (this._bananas == 2) {
                    this.winnings = this.playerBet * 2;
                }
                else if (this._watermelons == 2) {
                    this.winnings = this.playerBet * 3;
                }
                else if (this._cherries == 2) {
                    this.winnings = this.playerBet * 4;
                }
                else if (this._bars == 2) {
                    this.winnings = this.playerBet * 5;
                }
                else if (this._bells == 2) {
                    this.winnings = this.playerBet * 10;
                }
                else if (this._lemons == 2) {
                    this.winnings = this.playerBet * 20;
                }
                else if (this._lemons == 1) {
                    this.winnings = this.playerBet * 5;
                }
                else {
                    this.winnings = this.playerBet * 1;
                }
                console.log("Win!");
            }
            else {
                console.log("Loss!");
            }
            this._resultText.text = this.winnings.toString();
            this.playerMoney += this.winnings;
            this._creditsText.text = this.playerMoney.toString();
            this._resetFruitTally();
        };
        SlotMachine.prototype._resetFruitTally = function () {
            this._pears = 0;
            this._bananas = 0;
            this._watermelons = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._lemons = 0;
        };
        SlotMachine.prototype._initializeBitmapArray = function () {
            this._reels = new Array();
            for (var reel = 0; reel < 3; reel++) {
                this._reels[reel] = new createjs.Bitmap(assets.getResult("bar"));
                this._reels[reel].x = 165 + (reel * 117);
                this._reels[reel].y = 180;
                this.addChild(this._reels[reel]);
                console.log("reel" + reel + " " + this._reels[reel]);
            }
        };
        SlotMachine.prototype._placeBet = function (playerBet) {
            // ensure player's bet is less than or equal to players money
            createjs.Sound.play('bet');
            if (playerBet <= this.playerMoney) {
                this.playerBet += playerBet;
                this.playerMoney -= playerBet;
                this._creditsText.text = this.playerMoney.toString();
                this._betText.text = this.playerBet.toString();
            }
        };
        //EVENT HANDLERS ++++++++++++++++++++
        SlotMachine.prototype._bet1ButtonClick = function (event) {
            console.log("Bet 1 Credit");
            if (this.playerMoney < 1) {
                alert("you don't have enough money!!");
            }
            else {
                this._placeBet(1);
            }
        };
        SlotMachine.prototype._bet10ButtonClick = function (event) {
            console.log("Bet 10 Credit");
            if (this.playerMoney < 10) {
                alert("you don't have enough money!!");
            }
            else {
                this._placeBet(10);
            }
        };
        SlotMachine.prototype._bet20ButtonClick = function (event) {
            console.log("Bet 20 Credit");
            if (this.playerMoney < 20) {
                alert("you don't have enough money!!");
            }
            else {
                this._placeBet(20);
            }
        };
        SlotMachine.prototype._bet50ButtonClick = function (event) {
            console.log("Bet 50 Credit");
            if (this.playerMoney < 50) {
                alert("you don't have enough money!!");
            }
            else {
                this._placeBet(50);
            }
        };
        SlotMachine.prototype._bet100ButtonClick = function (event) {
            console.log("Bet 100 Credit");
            if (this.playerMoney < 100) {
                alert("you don't have enough money!!");
            }
            else {
                this._placeBet(100);
            }
        };
        SlotMachine.prototype._resetButtonClick = function (event) {
            if (this.playerMoney < 1000) {
                createjs.Sound.play("reset");
                this._resetAll();
            }
            else {
                alert("you already have enough money!!");
                return;
            }
        };
        SlotMachine.prototype._closeButtonClick = function (event) {
            window.open('', '_self', '');
            window.close();
        };
        SlotMachine.prototype._spinButtonClick = function (event) {
            // ensure player has enough money to play
            if (this.playerBet > 0) {
                var bitmap = this._spinReels();
                for (var reel = 0; reel < 3; reel++) {
                    this._reels[reel].image = assets.getResult(bitmap[reel]);
                }
                this._determineWinnings();
                // reset player's bet to zero
                this.playerBet = 0;
                this._betText.text = this.playerBet.toString();
            }
        };
        return SlotMachine;
    })(objects.Scene);
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
//# sourceMappingURL=slotmachine.js.map