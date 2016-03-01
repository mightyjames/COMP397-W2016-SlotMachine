/// <reference path = "_reference.ts" />
// global variables
var assets;
var canvas;
var stage;
var stats;
var currentScene;
var scene;
// Game Scenes
var menu;
var slotMachine;
var gameOver;
var assetData = [
    { id: "BackButton", src: "../../Assets/images/BackButton.png" },
    { id: "Nextbutton", src: "../../Assets/images/Nextbutton.png" },
    { id: "StartButton", src: "../../Assets/images/StartButton.png" },
    { id: "Reset", src: "../../Assets/images/Reset.png" },
    { id: "SlotMachine", src: "../../Assets/images/slotMachine.png" },
    { id: "Bet1Button", src: "../../Assets/images/1.png" },
    { id: "Bet10Button", src: "../../Assets/images/10.png" },
    { id: "Bet20Button", src: "../../Assets/images/20.png" },
    { id: "Bet50Button", src: "../../Assets/images/50.png" },
    { id: "Bet100Button", src: "../../Assets/images/100.png" },
    { id: "SpinButton", src: "../../Assets/images/spin.png" },
    { id: "BlackBackground", src: "../../Assets/images/BlackBackground.png" },
    { id: "bg", src: "../../Assets/images/WhiteBackground.png" },
    { id: "pear", src: "../../Assets/images/pear.png" },
    { id: "banana", src: "../../Assets/images/banana.png" },
    { id: "cherry", src: "../../Assets/images/cherry.png" },
    { id: "watermelon", src: "../../Assets/images/watermelon.png" },
    { id: "bar", src: "../../Assets/images/bar.png" },
    { id: "bell", src: "../../Assets/images/bell.png" },
    { id: "lemon", src: "../../Assets/images/lemon.png" },
    { id: "Play", src: "../../Assets/images/Play.png" },
    { id: "bet", src: "../../Assets/images/audio/bet.wav" },
    { id: "begin", src: "../../Assets/images/audio/begin.mp3" },
    { id: "close", src: "../../Assets/images/close.png" }
];
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}
function init() {
    // create a reference the HTML canvas Element
    canvas = document.getElementById("canvas");
    // create our main display list container
    stage = new createjs.Stage(canvas);
    // Enable mouse events
    stage.enableMouseOver(20);
    // set the framerate to 60 frames per second
    createjs.Ticker.setFPS(config.Game.FPS);
    // create an event listener to count off frames
    createjs.Ticker.on("tick", gameLoop, this);
    // sets up our stats counting workflow
    setupStats();
    // set initial scene
    scene = config.Scene.MENU;
    changeScene();
}
// Main Game Loop function that handles what happens each "tick" or frame
function gameLoop(event) {
    // start collecting stats for this frame
    stats.begin();
    // calling State's update method
    currentScene.update();
    // redraw/refresh stage every frame
    stage.update();
    // stop collecting stats for this frame
    stats.end();
}
// Setup Game Stats
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}
// Finite State Machine used to change Scenes
function changeScene() {
    // Launch various scenes
    switch (scene) {
        case config.Scene.MENU:
            // show the MENU scene
            stage.removeAllChildren();
            menu = new scenes.Menu();
            currentScene = menu;
            console.log("Starting MENU Scene");
            break;
        case config.Scene.SLOT_MACHINE:
            // show the PLAY scene
            stage.removeAllChildren();
            slotMachine = new scenes.SlotMachine();
            currentScene = slotMachine;
            console.log("Starting SLOT_MACHINE Scene");
            break;
        case config.Scene.GAME_OVER:
            // show the game OVER scene
            stage.removeAllChildren();
            gameOver = new scenes.GameOver();
            currentScene = gameOver;
            console.log("Starting GAME_OVER Scene");
            break;
    }
    console.log(currentScene.numChildren);
}
window.onload = preload;
//# sourceMappingURL=game.js.map