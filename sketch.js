var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var fish, fish1, fish2, fish3, fish4;

var track, fish1_img, fish2_img, fish3_img, fish4_img;

function preload(){
  track = loadImage("images/sea3.png");
  fish1_img = loadImage("images/fish1.png");
  fish2_img = loadImage("images/fish2.png");
  fish3_img = loadImage("images/fish3.png");
  fish4_img = loadImage("images/fish4.png");
  ground = loadImage("images/sea.jpg");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
