var gameState;

var climberImg; 
var ghostJumpImg, ghostStandImg;
var towerImg;
var doorImg;

var ghost;
var tower;
var door;
var climber;

var block;

function preload(){
  climberImg = loadImage("climber.png");
  ghostJumpImg = loadImage("ghost-jumping.png");
  ghostStandImg = loadImage("ghost-standing.png");
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
}

function setup(){
  createCanvas(600, 700);
  
  doorGroup = new Group();
  climberGroup = new Group();
  blockGroup = new Group();
  
  tower = createSprite(200, 280, 50, 50);
  tower.addImage(towerImg);
  tower.scale = 0.7;
  
  ghost = createSprite(210, 500, 100, 100);
  ghost.addImage(ghostStandImg);
  ghost.scale = 0.3;
  
  tower.velocityY = 2;
  
  gameState = "PLAY";
}

function draw(){

  background("white");    
  drawSprites();
  
  if(gameState === "PLAY"){
  
     
  
  if(tower.y > 435){
    tower.y = 350;
  }
  
  if(keyWentDown("space")){
    ghost.velocityY = - 10;
  }
  ghost.velocityY = ghost.velocityY + 0.8
  
  if(keyWentDown("right")){
    ghost.x = ghost.x + 10;
  }
  if(keyWentDown("left")){
    ghost.x = ghost.x - 10;
  }
  
  doors();
  
  if(ghost.isTouching(climberGroup)){
    ghost.velocityY = 0;
  }
  
  if(ghost.isTouching(blockGroup)){
    gameState = "END";
  }
}
  
  if(gameState === "END"){
    ghost.destroy();
    tower.destroy();
    doorGroup.destroyEach();
    climberGroup.destroyEach();
    background("black");
    textSize(30);
    fill("yellow");
    text("Game Over", 300, 420);
  }
  
  
  
}

function doors(){
  if(frameCount % 200 === 0){
    door = createSprite(Math.round(random(80, 200)), -50, 100, 100);
    door.addImage(doorImg);
    door.scale = 0.5;
    door.velocityY = 2;
    
    climber = createSprite(door.x, door.y + 30, 100, 70);
    climber.addImage(climberImg);
    climber.scale = 0.5;
    climber.velocityY = 2;
    
    block = createSprite(climber.x, climber.y + 10, 100, 3);
    block.velocityY = 2;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    blockGroup.add(block);
    
    door.lifetime = 370;
    climber.lifetime = 370;
    
    ghost.depth = door.depth + 1;
    ghost.depth = climber.depth + 1;
    
   // climber.debug = true
    block.debug = true
  }
}

