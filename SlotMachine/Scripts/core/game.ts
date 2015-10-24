/// <reference path="../config/config.ts" />

/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/stats/stats.d.ts" />
/// <reference path="../typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../typings/easeljs/easeljs.d.ts" />
/// <reference path="../typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../typings/soundjs/soundjs.d.ts" />
/// <reference path="../typings/preloadjs/preloadjs.d.ts" />

/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/spritebutton.ts" />

/// <reference path="../objects/label.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/scene.ts" />

/// <reference path="../states/over.ts" />
/// <reference path="../states/game.ts" />
/// <reference path="../states/menu.ts" />


// GLOBAL GAME FRAMEWORK VARIABLES
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;
var stats: Stats;
var state: number;
var currentState: objects.Scene; // alias for our current state
var atlas: createjs.SpriteSheet;

// GAME OBJECTS
var menu: states.Menu;
var game: states.Game;
var over: states.Over;

// manifest of all our assets
var manifest = [
    { id: "BackButton", src: "../../Assets/images/BackButton.png" },
    { id: "NextButton", src: "../../Assets/images/NextButton.png" },
    { id: "StartButton", src: "../../Assets/images/StartButton.png" },
    { id: "background", src: "../../Assets/images/background.png" },
    { id: "yay", src: "../../Assets/audio/yay.ogg" }
];

var data = {

    "images": [
        "../../Assets/images/atlas.png"
    ],

    "frames": [
        [2, 2, 253, 4, 0, 0, 0],
        [2, 8, 69, 69, 0, 0, 0],
        [2, 79, 69, 69, 0, 0, 0],
        [2, 150, 69, 69, 0, 0, 0],
        [73, 8, 69, 69, 0, 0, 0],
        [144, 8, 69, 69, 0, 0, 0],
        [215, 8, 60, 60, 0, 0, 0],
        [215, 70, 60, 60, 0, 0, 0],
        [73, 79, 69, 69, 0, 0, 0],
        [144, 79, 69, 69, 0, 0, 0],
        [215, 132, 60, 60, 0, 0, 0],
        [73, 194, 69, 69, 0, 0, 0],
        [144, 150, 60, 60, 0, 0, 0],
        [144, 212, 60, 60, 0, 0, 0],
        [206, 194, 60, 60, 0, 0, 0]
    ],

    "animations": {
        "bet_line": [0],
        "banana": [1],
        "bar": [2],
        "bell": [3],
        "blank": [4],
        "cherry": [5],
        "bet100Button": [6],
        "bet10Button": [7],
        "grapes": [8],
        "orange": [9],
        "bet1Button": [10],
        "seven": [11],
        "betMaxButton": [12],
        "genericButton": [13],
        "spinButton": [14]
    },


};


function preload(): void {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
    atlas = new createjs.SpriteSheet(data);
}

function init():void {
    canvas = document.getElementById("canvas"); // reference to canvas element
    stage = new createjs.Stage(canvas); // passing canvas to stage
    stage.enableMouseOver(20); // enable mouse events
    createjs.Ticker.setFPS(60); // set frame rate to 60 fps
    createjs.Ticker.on("tick", gameLoop); // update gameLoop every frame
    setupStats(); // sets up our stats counting

    state = config.MENU_STATE;
    changeState(state);

}

// Main Game Loop
function gameLoop(event: createjs.Event): void {
    stats.begin(); // start counting


    currentState.update(); // calling State's update method
    stage.update(); // redraw/refresh stage every frame

    stats.end(); // stop counting
}

// Setup Game Stats
function setupStats():void {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}





// state machine prep
function changeState(state): void {
    // Launch various scenes

    switch (state) {
        case config.MENU_STATE:
            // show the menu scene
            stage.removeAllChildren();
            menu = new states.Menu();
            currentState = menu;
            break;
        case config.PLAY_STATE:
            // show the play scene
            stage.removeAllChildren();
            game = new states.Game();
            currentState = game;
            break;
        case config.OVER_STATE:
            // show the game over scene
            stage.removeAllChildren();
            over = new states.Over();
            currentState = over;
            break;
    }

    currentState.start();
    console.log(currentState.numChildren);
}
 