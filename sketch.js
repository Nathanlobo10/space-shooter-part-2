var lazer,lazerImage
var npc,npcImage
var pc,pcImage
var spaceImage
var aliengroup
var lazergroup
var alienNumber = 0
var spaceBackgroud
var life = 3 
var score = 0
var gamestate 
var level = 0
var edges

function preload() {
  spaceImage = loadImage("images/space.jpeg")
  pcImage = loadImage("images/pc.png")
  npcImage = loadImage("images/Npc.png")
  lazerImage = loadImage("images/lazer.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
 // createSprite(400, 200, 50, 50);
 spaceBackgroud = createSprite(width/2,height/2)
 spaceBackgroud.addImage(spaceImage)
 spaceBackgroud.velocityY = -5 
  
 pc = createSprite(windowWidth/2 , windowHeight - 60)
 pc.addImage("player",pcImage)
 pc.scale = 0.3


 aliengroup = new Group()
 lazergroup = new Group()
 edges=createEdgeSprites()
 enemy(); 
}



function draw() {
  //background(spaceImage);  
  if(gamestate==undefined){
   background("lightblue")
   textSize(24)
   text("welcome to the space shooter game",width/2-180,height/2)
   text("press t to start  ",width/2, height/2+50)
   if(keyDown("t")&&gamestate==undefined){
   gamestate = "play"   
   }
  }
   if(gamestate=="play"){

   
  if(spaceBackgroud.y <=0){
  spaceBackgroud.y = width/2  
  }
 
  

  if(keyDown(LEFT_ARROW)) {
   pc.x = pc.x -10
  }

  if(keyDown(RIGHT_ARROW)){
    pc.x = pc.x +10
  }

  if(keyWentDown("space")){
  lazer = createSprite (pc.x, pc.y - 20)  
  lazer.addImage ("lazer",lazerImage ) 
  lazer.velocityY= -10
  lazer.scale = 0.2
  lazer.lifetime = height/lazer.velocityY
  lazergroup.add(lazer)
 }
console.log(aliengroup.length)
 if(frameCount%200== 0) {
  alienNumber = Math.round(random(0,aliengroup.length - 1))
 // console.log(alienNumber)
 }
 
 if(aliengroup[alienNumber]&&pc.y - aliengroup[alienNumber].y>150 ){
 aliengroup[alienNumber].pointTo(pc.x,pc.y)
 aliengroup[alienNumber].rotation +=90
 aliengroup[alienNumber].setSpeedAndDirection(6, aliengroup[alienNumber].rotation - 90)
 
 if(lazergroup.isTouching(aliengroup[alienNumber])){
  aliengroup[alienNumber].destroy()
  score=score+2
}  
console.log(life)
if(aliengroup[alienNumber].y>height){


  life = life-1

}
 }
 
  drawSprites();
  textSize(30) 
  stroke("white")
  text("score:"+score,width/2 -600,height/2+300)
  text("lifes:"+life,width/2 -600 ,height/2+340)
  
   }
  
}


function enemy() {
  for(var i = 50; i<windowWidth - 40;i = i+180) {
   var alien = createSprite( i, 55)
   alien.addImage("enemy",npcImage)
   alien.scale = 0.3
   aliengroup.add(alien) 
   
  }
}
