var trex, trex_running, edges;
var groundImage;
var ground,invisible_ground
var cloudImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
}


function setup(){
  createCanvas(600,200);
  
  ground = createSprite (300, 170, 600, 10)
  ground.addImage(groundImage)
  ground.x = ground.width/2

  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50

  ground.velocityX = -4


  invisible_ground = createSprite (300, 180, 600, 5);
  invisible_ground.visible = false;

}


function draw(){
    //set background color 
    background("white");
   
    //resetting the ground after it reaches the end. (resetting ground.x)
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    

    
    //jump when space key is pressed
    if(keyDown("space")&& trex.y > 150){
      trex.velocityY = -10;
    }
    //adding pull/gravity so trex does not go out of canvas. 
    trex.velocityY = trex.velocityY + 0.5;
    
    //stop trex from falling down
    trex.collide(invisible_ground)

    //calling function- spawnClouds
    spawnClouds();

    drawSprites();
}

function spawnClouds(){
  if (frameCount % 60 === 0){
    var cloud = createSprite (600, 100, 30, 10)
    cloud.y = Math.round(random(10, 75))
    cloud.addImage(cloudImage)
    cloud.scale = 0.5
    cloud.velocityX = -5;
    
    console.log(cloud.depth)

    cloud.depth = trex.depth
    trex.depth = trex.depth + 1
  }
}