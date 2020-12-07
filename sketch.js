var player;
var phase = -1;
var bg;
var earlybg;
var locations = [[1000, 100]];
var enemies = [];
var newenemy;
var camera;
var boss;
var tutorial;
let walk;
let stand;

function allDead(){
	//CHECKS IF ALL ENEMIES IN PHASE 0 ARE DEAD
	for (let i = 0 ; i < enemies.length ; i++){
		if (enemies[i].state != "dying"){
			return false;
		}
	}
	return true;
}


function move_camera(x){
	// MOVES CAMERA WITH PLAYER IN PHASE 0
	if (200 > x){
		camera.position.set(300,height/2);
	}
	else if (1700 < x){
		camera.position.set(1800,height/2);
	}
	else{
		camera.position.set(x + 100, height/2);
	}
}


function preload(){
	//LOADS ALL ANIMATIONS AND IMAGES
	earlybg = loadImage("phasebackground.jpg");
	walk = loadAnimation("WALK1.png", "WALK3.png");
	walk.frameDelay = 12;
	stand = loadAnimation("WALK2.png");
	bg = loadImage("background.jpg");
}

function setup() {
	//INITIALIZE PLAYER AND CAMERA
	createCanvas(600, 400);
	player = new Player(walk, stand);
	camera = new Camera(200,height/2,1);
	// PHASE -1 PROLOGUE
	tutorial = new Enemy(500,300,9999999999);
	player.sprite.position.set(0,300);
	player.sprite.velocity.set(3,0);
	camera.position.set(width/2, height/2);
}


function draw() {
	player.update_anim();
	player.isdead();
	if (phase == -1){
		// TUTORIAL PHASE
		image(earlybg,0,0);
		if ((player.sprite.position.x >= 150) && (tutorial.state == "alive")){
			player.sprite.velocity.set(0,0);
			tutorial.kill(mouseX, mouseY, player);
		}
		if (tutorial.state == "dying"){
			player.move()
			// PLAYER CAN ONLY LEAVE AFTER KILLING FIRST ENEMY
		}
		if (player.sprite.position.x >= width){
			// PHASE 0 PROLOGUE
			player.sprite.position.set(0,0);
			tutorial.sprite.remove();
			phase = 0;
		}
		drawSprites();
	}
	
	if (phase == 0){
		// PLAYER NOW HAS TO WALK THROUGH MAIN TOWN, KILLING ALL ENEMIES 
		move_camera(player.sprite.position.x);
		image(bg,0,0);
		player.move();
		
		//SPAWN NEW ENEMIES WHEN THE PLAYER SEES THEM
		for (let i = 0; i < locations.length; i++){
			if (player.sprite.position.x + 300 >= locations[i][0]){
				newenemy = new Enemy(locations[i][0], locations[i][1],4000);
				enemies.push(newenemy);
				locations.splice(i,1);
			}
		}
		//CHECK IF ANY ENEMIES HAVE KILLED THE PLAYER YET
		for (let i = 0; i < enemies.length; i++){
			enemies[i].kill(camera.mouseX, camera.mouseY, player);
		}
		if ((player.sprite.position.x >= 2100) && (allDead())){
			//PHASE 1 PROLOGUE
			phase = 1;
			boss = new Enemy(500,300,3000);
			player.sprite.position.set(0,300);
			player.sprite.velocity.set(3,0);
			camera.position.set(width/2, height/2);
			for (let i = 0; i < enemies.length; i++){
				enemies[i].sprite.remove();
			}
		}
	}
	if (phase == 1){
		// FINAL PHASE
		image(earlybg,0,0);
		if (player.sprite.position.x >= 150){
			player.sprite.velocity.set(0,0);
			boss.kill(mouseX, mouseY, player);
		}
		if(boss.state == "dying"){
			player.sprite.velocity.x = 3;
		}
	}
	drawSprites();
}