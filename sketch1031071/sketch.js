// Johnlouis Dahhan
var opacity = 0;
var ammo;
var bullet;
var player;
var phase = -1;
var bg;
var earlybg;
var alllocations = [[[255, 233],[379,133],[555,133]],[[1165,238]],[[1404,165],[1580,165],[1712,237],[1814,237]]];
var locations = []
var enemies = [];
var newenemy;
var camera;
var boss;
var tutorial;
var initialize = true;
var walk;
var stand;
var dead;
var lifespan = 5000
var introscriptlist = ["\"They're all waiting for you.\"", "\"I'm sorry about what we did to you.\"", "\"Please, just end it.\"", "Click on him to end it..."];
var endscriptlist = ["\"So you finally made it.\"", "\"How many people did you have to kill to get to me?\"", "\"Well you should be very proud. You made a lot of widows here today.\"", "\"Do you feel better now? I'm sure you don't care.\"", "\"If we're evil, you're no better.\"", "\"Ah well, I guess you'll see me in hell someday right?\""];
var introscript;
var endscript;
var scripton = true;

function mousePressed(){
	if (!(scripton)){
		player.ammo--;
	}
}

function printAmmo(){
	let x = 10;
	let y = 10;
	if (phase == 0){
		x = camera.position.x - 290;
		print(camera.position.x);
	}
	for (let i = 0 ; i < player.ammo ; i ++){
		image(bullet, x,y);
		x += 20;
	}
}

function getAmmo(){
	player.ammo = 6;
	ammo.remove();
}

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

function picklocations(){
	// i = 0
	locations.push((alllocations[0].splice(floor(random(alllocations[0].length)), 1))[0]);
	locations.push((alllocations[0].splice(floor(random(alllocations[0].length)), 1))[0]);
	locations.push((alllocations[1].splice(floor(random(alllocations[1].length)), 1))[0]);
	locations.push((alllocations[2].splice(floor(random(alllocations[2].length)), 1))[0]);
	locations.push((alllocations[2].splice(floor(random(alllocations[2].length)), 1))[0]);
	locations.push((alllocations[2].splice(floor(random(alllocations[2].length)), 1))[0]);	
}

function preload(){
	//LOADS ALL ANIMATIONS AND IMAGES
	earlybg = loadImage("phasebackground.jpg");
	walk = loadAnimation("step1.png", "step4.png");
	dead = loadAnimation("dead.png");
	walk.frameDelay = 12;
	stand = loadAnimation("step2.png");
	bg = loadImage("background.jpg");
	bullet = loadImage("bullet.png");
}

function setup() {
	//INITIALIZE PLAYER AND CAMERA
	createCanvas(600, 400);
	player = new Player(walk, stand, dead);
	camera = new Camera(200,height/2,1);

	// PHASE -1 PROLOGUE
	tutorial = new Enemy(500,300,9999999999);
	player.sprite.position.set(0,300);
	player.sprite.velocity.set(3,0);
	camera.position.set(width/2, height/2);
	introscript = new Script(introscriptlist);
	endscript = new Script(endscriptlist);
}


function draw() {
	background(0);
	if (initialize){
		picklocations();
		initialize = false;
	}
	player.update_anim();
	player.isdead();

	if (phase == -1){
		// TUTORIAL PHASE
		image(earlybg,0,0);
		printAmmo();
		if ((player.sprite.position.x >= 150) && (tutorial.state == "alive")){
			player.sprite.velocity.set(0,0);
			if (!(introscript.display())){
				tutorial.kill(mouseX, mouseY, player);
				scripton = false;
			}
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
			ammo = createSprite(1000, 370, 20, 20)
		}
		drawSprites();
	}
	
	if (phase == 0){
		// PLAYER NOW HAS TO WALK THROUGH MAIN TOWN, KILLING ALL ENEMIES 
		move_camera(player.sprite.position.x);
		image(bg,0,0);
		printAmmo();
		player.move();
		player.sprite.overlap(ammo, getAmmo);
		
		//SPAWN NEW ENEMIES WHEN THE PLAYER SEES THEM
		for (let i = 0; i < locations.length; i++){
			if (player.sprite.position.x + 400 >= locations[i][0]){
				newenemy = new Enemy(locations[i][0], locations[i][1],lifespan);
				enemies.push(newenemy);
				locations.splice(i,1);
				lifespan -= 100;
			}
		}
		//CHECK IF ANY ENEMIES HAVE KILLED THE PLAYER YET
		for (let i = 0; i < enemies.length; i++){
			enemies[i].kill(camera.mouseX, camera.mouseY, player);
		}
		if ((player.sprite.position.x >= 2100) && (allDead())){
			//PHASE 1 PROLOGUE
			scripton = true;
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
		printAmmo();
		if (player.sprite.position.x >= 150){
			player.sprite.velocity.set(0,0);
			if (!(endscript.display())){
				boss.kill(mouseX, mouseY, player);
				scripton = false;
			}
		}
		if(boss.state == "dying"){
			player.sprite.velocity.x = 3;
		}
	}
	drawSprites();
	if (!(player.isalive) && (millis() - player.deathtime > 1000)){
		fill(0,opacity);
		rect(0,0,600,400);
		textSize(90);
		fill(255,0,0,opacity);
		textAlign(CENTER,CENTER);
		text("YOU DIED",300,200);
		opacity++;
	}
}