var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudImg;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

var play,end;
var score;
var gameState;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup() {

  createCanvas(600,200)
  
  //crear sprite de Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //crear sprite de suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  //crear sprite de suelo invisible
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  gameState = play;
  score = 0;
  play = 1;
  end = 0;
}

function draw() {
  //establecer color de fondo
  background(180);
  
  text("Puntuación: " + score  ,550,20);
  
  //hacer que el Trex salte al presionar la barra espaciadora
  if(gameState === play){
    score = score + Math.round(frameCount / 60);
    ground.velocityX = -4;
    trex.collide(invisibleGround)
    spawnClouds();
    spawnObstacle();
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
    }
    
    trex.velocityY = trex.velocityY + 0.8;
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(trex.isTouching(obstacle)){
      gameState = end;
    }
  }

  if(gameState === end){
    ground.velocityX = 0;
  }
  
  drawSprites();
}

//función para aparecer las nubes
function spawnClouds(){
 //escribir aquí tu código 
 if(frameCount % 60 === 0){
 cloud=createSprite(600,100,40,10);
 cloud.addImage("nube",cloudImg);
 cloud.scale = 0.8;
 cloud.velocityX=-3; 
 cloud.y = Math.round(random(10,60));
 cloud.lifetime = 200;
 cloud.depth = trex.depth;
 trex.depth = trex.depth +1;

 }
}
function spawnObstacle(){
  if(frameCount % 60 === 0){
    var obstacle = createSprite(600,170,200,200);
    obstacle.velocityX = -8;
    obstacle.scale = 0.5
    obstacle.lifetime = 65;
  
  var rand = Math.round(random(1,6));
  switch(rand){
    case 1: obstacle.addImage(obstacle1);
            break;
    case 2: obstacle.addImage(obstacle2);
            break;
    case 3: obstacle.addImage(obstacle3);
            break;
    case 4: obstacle.addImage(obstacle4);
            break;
    case 5: obstacle.addImage(obstacle5);
            break;
    case 6: obstacle.addImage(obstacle6);
            break;
    default: break;
  }
 }
}



