var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var database;

var form, player, game;

var blueDuck;
var redDuck;
var ducks;

var blueDuckImg;
var redDuckImg;

var grass;

var burrowImg;

var timer;
var counter = 0;
var timeLeft = 60;
var interval;

var redWorm;
var blueWorm;

var rGrp;
var bGrp;

var rWorm;
var bWorm;

var p1;
var p2;

var p1rank;
var p2rank;

function preload(){
  blueDuckImg = loadImage("images/blueDuck.png");
  redDuckImg = loadImage("images/redDuck.png");

  grass = loadImage("images/grass_Background.jpg");

  burrowImg = loadImage("images/Burrow.png");

  redWorm = loadImage("images/red_new.png");
  blueWorm = loadImage("images/blue.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();

  interval = setInterval(timeIt, 1000);

  rGrp = new Group();
  bGrp = new Group();

  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }

  if(gameState === 1){
    clear();
    game.play();

    game.showWorms();
    
    textSize(30);
    fill("black");
    stroke("black");
    text(timer, 100, 100);
  }

  if(gameState === 2){
    game.end();
    player.getRanks();
    clear();
    game.displayRanks();
  }
}

function convertSeconds(s){
  var min = floor(s/60);
  var sec = s%60;
  return nf(min, 2) + " : " + nf(sec, 2);
}

function timeIt(){
  if(gameState === 1){
    counter++;
    countdown();
  }
}

function countdown(){
  timer = convertSeconds(timeLeft - counter);
  if(counter === timeLeft){
    clearInterval(interval);
    game.update(2);
  }
}