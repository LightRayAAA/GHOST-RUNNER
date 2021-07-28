var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg, ghostJump;
var invisibleBlockGroup, invisibleBlock, invisWall1, invisWall2;
var gameOverBG
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  ghostJump = loadImage("ghost-jumping.png")
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3; 

  ghost = createSprite(300,300);
  ghost.addAnimation("ghost", ghostImg);
  ghost.scale = 0.3;

  invisWall = createSprite(530,300,5,600);
  invisWall.visible = false;

  invisWall2 = createSprite(70,300,5,600);
  invisWall2.visible = false;
  
  gameOverBG = createSprite(300,300,600,600);
  
  doorsGroup = new Group();
  climbersGroup = new Group();
}

function draw() {
  background(200);
  drawSprites();
  if(gameState == "play"){
    if(tower.y > 400){
      tower.y = 300;
    }

    gameOverBG.visible = false;

    if(keyDown("space")){
      ghost.velocityY = -15;
    }
    ghost.velocityY =  ghost.velocityY + 1.3;
    
    
    if(keyDown(RIGHT_ARROW)){
    ghost.velocityX = 4;
    }

    if(keyDown(LEFT_ARROW)){
    ghost.velocityX = -4;
    }

    if(ghost.isTouching(doorsGroup)){
    gameState = "end"
    }
    
    ghost.bounceOff(invisWall);
    ghost.bounceOff(invisWall2);
    
    spawnDoors();
  }

  if(gameState == "end"){
  tower.velocityY = 0
  doorsGroup.destroyEach();
  climbersGroup.destroyEach();
  ghost.destroy();
  tower.destroy();
  ghost.velocityX = 0
  ghost.velocityY = 0
  gameOverBG.visible = "true"
  fill("black")
  text("Game Over", 0, 0)
  

  }
  

    
    
}

function spawnDoors(){
if(frameCount % 120 === 0){
  door = createSprite(random(100,500),0);
  door.addImage("door", doorImg);
  door.scale = 0.8;
  door.velocityY = door.velocityY + 3;

  doorsGroup.add(door);

  climber = createSprite(50, 230);
  climber.addImage("climber", climberImg);
  climber.velocityY = climber.velocityY + 3;
  climber.y = door.y + 5;
  climber.x = door.x;

  climbersGroup.add(climber);
}


}
