var groundimage, ground2, ground; 
var trex, trex_running;         
var edges;
var rx,ry;
var cloud, cloud_image
var obstacle;
var P1,P2,P3,P4,P5,P6
var cloudgroup, obstaclegroup
var score = 0
var gamestate = "play"
var gameover1,gameover2
var reastart1,reastart2

function preload()
{
  // adding animations and images
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png")

  P1 = loadImage ("obstacle1.png")
  P2 = loadImage ("obstacle2.png")
  P3 = loadImage ("obstacle3.png")
  P4 = loadImage ("obstacle4.png")
  P5 = loadImage ("obstacle5.png")
  P6 = loadImage ("obstacle6.png")
  gameover1 = loadImage ("gameOver.png")

  reastart1 = loadImage ("restart.png")
  groundimage = loadImage ("ground2.png")
  cloud_image = loadImage ("cloud.png")
}

function setup()
{
  createCanvas(600,200);
  obstaclegroup = new Group() 
  
  cloudgroup = new Group() 
  gameover2 = createSprite(300,60,20,10)
  gameover2.addImage (gameover1)
  reastart2 = createSprite(300,100,20,10)
  reastart2.addImage(reastart1)
  gameover2.scale = 0.5
  reastart2.scale = 0.7
  // trex sprite
  trex = createSprite(50,160,10,30);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("dead", trex_collided)
  trex.scale = 0.5;
 // trex.debug = true
  trex.setCollider("circle",0,0,45)
  edges = createEdgeSprites();
  
  //ground sprite
  ground = createSprite (300,170,600,10);
  ground.addImage(groundimage)
  
  //invisible ground
  ground2 = createSprite (300,180,600,10)
  ground2.visible = false 
   
}

function draw()
{
  background("white");
  text("Score: "+ score,500,50)

  

   
    
 
  if(gamestate==="play") {
    score = score+ Math.round(getFrameRate()/60)
     spawnobstacles()
     //making trex jump
  if(keyDown("space")&& trex.y > 140) {
    trex.velocityY = -10;
  }
  
  // add gravity
  trex.velocityY = trex.velocityY + 0.5;
    if (obstaclegroup.isTouching(trex)){
      gamestate = "end"
    }
  //making ground move
  ground.velocityX = -3- Math.round(score/100) 
  
  //infinite ground
  if ( ground.x <= 0) {
    ground.x = ground.width / 2
    
  }
 gameover2.visible = false   
     reastart2.visible = false 
  spawnClouds();
  }
  else if(gamestate==="end"){
   obstaclegroup.setVelocityXEach(0) 
   
  cloudgroup.setVelocityXEach(0) 
    ground.velocityX = 0 
    trex.changeAnimation("dead",trex_collided)
    obstaclegroup.setLifetimeEach(-1)
      cloudgroup.setLifetimeEach(-1)
     gameover2.visible = true  
     reastart2.visible = true
    trex.velocityY = 0
      if (mousePressedOver( reastart2)){
     reaset()
     gamestate = "play"
   }
  }
  
  
  
 
  
  //trex to stay on ground
  trex.collide(ground2);

  
  drawSprites();
}

function spawnClouds()
{
  if(frameCount%35===0){
   
  
 cloud = createSprite (650,50,20,10)
    cloud.scale = 0.7
    cloud.lifetime = 130
  cloud.x = Math.round(random(600,650)); 
    cloud.y = Math.round(random(30,60));
  cloud.velocityX = -5
     cloud.addImage(cloud_image)
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1
  cloudgroup.add(cloud) 
}}

function spawnobstacles()
{
  if (frameCount%70===0){
    obstacle = createSprite (650,155,10,30)
    obstacle.velocityX = -5-  Math.round(score*2/100) 
    x = Math.round(random(1,6));
    switch(x){
      case 1:obstacle.addImage(P1)
        break 
        case 2 : obstacle.addImage(P2)
        break 
        case 3 : obstacle.addImage(P3)
        break
        case 4 : obstacle.addImage(P4)
        break
        case 5 : obstacle.addImage(P5)
        break
        case 6 : obstacle.addImage(P6)
        break
        default : break
                               
                                
    }
   obstacle.scale = 0.4
        obstacle.lifetime = 130
  obstaclegroup.add(obstacle) 
}}
  
  function reaset() {
    obstaclegroup.destroyEach()
    cloudgroup.destroyEach()
    score = 0
    trex.changeAnimation("running",trex_running)
  }
  

  
  