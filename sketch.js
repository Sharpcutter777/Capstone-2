var rocket, rocketImg;
var space, spaceImg;
var obstacle, obstacleImg, obstacle_group;
var gamestate = "play";
var score = 0;


function preload() {
    rocketImg = loadImage("rocket.png")
    spaceImg = loadImage("space.png")
    obstacleImg = loadImage("asteroid.png")
  

}

function setup() {
    createCanvas(600, 600);
    space = createSprite(300, 300);
    space.addImage(spaceImg);
    space.scale = 1
  
    rocket = createSprite(300, 400, 50, 50)
    rocket.addImage(rocketImg);
    rocket.scale = 0.04
    space.velocityY = 1;
    obstacle_group = new Group();
   
}

function draw() {
    background(0);
    if (gamestate === "play") {
        if (space.y > 400) {
            space.y = 300
          
        }
        
        if (keyDown("right_arrow")) {
            rocket.x += 3
        }
        if (keyDown("left_arrow")) {
            rocket.x -= 3
        }
        if(keyDown("down_arrow")){
            rocket.y+=3
        }
        if(keyDown("up_arrow")){
            rocket.y-=3
        }
        if (obstacle_group.isTouching(rocket)) {
            gamestate="end";
            rocket.destroy();
        }
        if(gamestate==="end"){
            fill("red")
            textSize(30)
            text("ROCKET DESTROYED",150,300);
            space.velocityY=0;
            spawnAsteroids=false
        }
    }
    rocket.setCollider("circle",0,0,500)
    rocket.debug=true
    spawnAsteroids();
    drawSprites();

    }
    
    

function spawnAsteroids() {

    if (frameCount % 200 === 0) {
        obstacle = createSprite(200, 10)
        obstacle.velocityY = 1;
        obstacle.addImage(obstacleImg);
        obstacle.scale=0.05
        obstacle.x=Math.round(random(120,400))

        
        obstacle.setCollider("circle",0,0,700)
        obstacle.debug=true
        rocket.depth = obstacle.depth
        rocket.depth+=1;
        obstacle.lifetime=700;
        obstacle_group.add(obstacle);
        
    }

}
