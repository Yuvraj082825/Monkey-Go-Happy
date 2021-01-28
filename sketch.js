/*var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }

  drawSprites();
}*/

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage, obstacleGroup;
var bananaGroup,bananaImage;
var score,ground;
var survivaltime=0;
var score=0;
var bananaGroup,obstaclesGroup;
var gamestate="play";
var jungleImg,jungle;
var a,gameOver;

function preload()
{
  monkey_running =loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("stone.png");
  
  jungleImg=loadImage("jungle.jpg");

  gameOverImg=loadImage("gameOver.png");
 
}
function setup() 
{
  createCanvas(600,500);
  
  jungle=createSprite(300,250,600,500);
  jungle.addImage(jungleImg);
  jungle.velocityX=-3;
  //jungle.scale=0.2;
  
  //creating ground
  ground = createSprite(500,500,1300,20);
  //ground.x = ground.width /2;
  ground.velocityX=-9;
  
  //creating monkey
  monkey=createSprite(66,435,20,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  monkey.setCollider("rectangle",0,0,450,500);
  monkey.debug=false;
  
  jungle.setCollider("rectangle",0,0,90,50);
  //jungle.debug=true;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.9;
  
  //creating groups for bananas and obstacles
  bananaGroup= new Group();
  obstaclesGroup= new Group();
}


function draw() 
{
  background("pink");
  console.log(frameCount);
  console.log(frameRate());
  
  ground.visible=false;
  
  obstacles();
  bananas();
  
  
  
  
  if(gamestate=="play")
    {
      gameOver.visible=false;
      if (jungle.x < 110)
      {    
        jungle.x =jungle.width/2;
    
      }
      if(ground.x<50)
        {
          ground.x=ground.width/2;
        }
      if(keyDown("space")&&monkey.y>=240)
      {
         monkey.velocityY = -17.5;
      
      }
      if(score%10==0&& score>0)
        {
          monkey.scale=monkey.scale+0.0005;
        }
      if(frameCount%10==0)
        {
          survivaltime+=1;
        }
  if(monkey.isTouching(bananaGroup))
    {
      bananaGroup.destroyEach();
      score=score+2;
    }
  if(monkey.isTouching(obstaclesGroup))
    {
      gamestate="end";
      /*reset();
      obstaclesGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
      monkey.scale=0.1;*/
    }
    }
    else if(gamestate === "end"){
      //text("Game Over",300,250);
      monkey.visible=false;
      gameOver.visible=true;
      bananaGroup.destroyEach();
      obstaclesGroup.destroyEach();
      bananaGroup.setLifetimeEach(-1);
      obstaclesGroup.setLifetimeEach(-1);
      jungle.velocityX=0;
      monkey.velocityY=0;  
      obstacle.velocityX=0;
      banana.velocityX=0;
      score=0;
      survivaltime=0;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 1;
      
    
    monkey.collide(ground);
    drawSprites();
  stroke("white");
  fill("white");
  textSize(20);
  text("Score " + score,500,50);
  stroke("black");
  fill("black");
  textSize(20);
  text("Survival Time " + survivaltime,100,50);
}
function reset()
{
  gamestate="end";   
  bananaGroup.destroyEach();
  obstaclesGroup.destroyEach();
  jungle.velocityX=0;
  monkey.velocityY=0;  
  obstacle.velocityX=0;
  banana.velocityX=0;
  score=0;
  survivaltime=0;
  /**gameOver.addImage(gameOverImg)
  gameOver.scale=2;*/
  text("Game Over",300,220);
}
function obstacles()
{
  if(frameCount%100==0)
    {
      obstacle=createSprite(600,430,10,10);
      obstacle.scale=0.4 ;
      obstacle.addImage(obstacleImage);
      obstacle.velocityX=-8;
      obstacle.lifetime=83;
      obstaclesGroup.add(obstacle);
    }
  
}  
function bananas()
{
  if(frameCount%80==0)
    {
      banana=createSprite(600,105,10,10);
      banana.scale=0.2;
      banana.addImage(bananaImage);
      banana.velocityX=-8;
      banana.y=Math.round(random(105,380));
      banana.lifetime=81;
      bananaGroup.add(banana);
    }
}
