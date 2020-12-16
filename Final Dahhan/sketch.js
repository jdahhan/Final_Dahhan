// Johnlouis Dahhan

//VARIABLE INITIALIZATION

//game flow variables
var phase = -1;
var initialize = true;
var endTimer = 0;
var deadyet = true;
var ammopicked = false;
var gameover = false;
var lifespan = 1000;
var scripton = true;

//sprites and game objects
var enemies = [];
var newenemy;
var camera;
var boss;
var tutorial;
var player;
var ammo;

//animations and images
var ammobox;
var bullet;
var bg;
var earlybg;
var alllocations = [[[255, 233],[379,133],[555,133]],[[1165,238]],[[1404,165],[1580,165],[1712,237],[1814,237]]];
var locations = []
var walk;
var stand;
var dead;
var tutorialalive;
var tutorialdead;
var enemyalive;
var enemydead;
var bossalive;
var bossdead;

//sounds
var gunshot;
var pickup;
var empty;

//text variables
var urdead = "YOU DIED";
var introscriptlist = ["\"They're all waiting for you.\"", "\"I'm sorry about what we did to you.\"", "\"Please, just end it.\"", "Click on him to end it..."];
var endscriptlist = ["\"So you finally made it.\"", "\"How many people did you have to kill to get to me?\"", "\"Well you should be proud. You made a lot of widows today.\"", "\"Do you feel better now? I'm sure you don't care.\"", "\"If we're evil, you're no better.\"", "\"Ah well, I guess you'll see me in hell someday right?\""];
var introscript;
var endscript;
var opacity = 0;
var scriptfont;
var endfont;


function picklocations(){
	// pseudo-randomly initialize phase 0 enemy positions
	locations.push((alllocations[0].splice(floor(random(alllocations[0].length)), 1))[0]);
	locations.push((alllocations[0].splice(floor(random(alllocations[0].length)), 1))[0]);
	locations.push((alllocations[1].splice(floor(random(alllocations[1].length)), 1))[0]);
	locations.push((alllocations[2].splice(floor(random(alllocations[2].length)), 1))[0]);
	locations.push((alllocations[2].splice(floor(random(alllocations[2].length)), 1))[0]);
	locations.push((alllocations[2].splice(floor(random(alllocations[2].length)), 1))[0]);	
}

function preload(){
	//LOADS VARIABLES
	//images and animations
	earlybg = loadImage("phasebackground.jpg");
	walk = loadAnimation("step1.png", "step4.png");
	dead = loadAnimation("dead.png");
	enemyalive = loadAnimation("enemyalive1.png");
	enemydead = loadAnimation("enemydead.png");
	tutorialalive = loadAnimation("tutorialalive.png");
	tutorialdead = loadAnimation("tutorialdead.png");
	bossalive = loadAnimation("bossalive.png");
	bossdead = loadAnimation("bossdead1.png", "bossdead3.png");
	bossdead.frameDelay = 5;
	walk.frameDelay = 15;
	stand = loadAnimation("step2.png");
	bg = loadImage("background.jpg");
	bullet = loadImage("bullet.png");
	ammoimg = loadImage("ammo.png");
	
	//sounds
	empty = loadSound("empty.mp3");
	gunshot = loadSound("gunshot.mp3");
	pickup = loadSound("pickup.mp3");
	
	//fonts
	scriptfont = loadFont("VCR_OSD_MONO.ttf");
	endfont = loadFont("Wanted M54.ttf");
}

function setup() {
	//INITIALIZE PLAYER AND CAMERA
	createCanvas(600, 400);
	player = new Player(walk, stand, dead);
	camera = new Camera(200,200,1);

	// PHASE -1 PROLOGUE
	tutorial = new Enemy(500,320,9999999999, tutorialalive, tutorialdead, 0);
	player.sprite.position.set(0,300);
	player.sprite.velocity.set(3,0);
	camera.position.set(300, 200);
	introscript = new Script(introscriptlist);
	endscript = new Script(endscriptlist);
}

function mousePressed(){
	//depletes ammo and makes appropriate noises when gun is fired
	if (!(scripton) && (player.isalive) && (!gameover)){
		if (player.ammo > 0){
			player.ammo--;
			gunshot.play();
		}
		else{
			empty.play();
		}
	}
}

function printAmmo(){
	//displays ammo
	let x = 10;
	let y = 10;
	if (phase == 0){
		x = camera.position.x - 290;
	}
	for (let i = 0 ; i < player.ammo ; i ++){
		image(bullet, x,y);
		x += 20;
	}
}

function getAmmo(){
	//collects ammo
	if (!ammopicked){
		player.ammo = 6;
		ammo.remove();
		pickup.play();
		ammopicked = true;
	}
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

function draw() {
	textFont(scriptfont);
	background(0);
	if (initialize){
		//can't call random() in setup, so we have to pick locations in draw
		picklocations();
		initialize = false;
	}
	//update the player's animation if they're moving and make sure they can't move if they're dead
	player.update_anim();
	player.isdead();

	if (phase == -1){
		// TUTORIAL PHASE
		image(earlybg,0,0);
		printAmmo();
		if ((player.sprite.position.x >= 150) && (tutorial.state == "alive")){
			player.sprite.velocity.set(0,0);
			if (!(introscript.display())){ //when script is done, player can kill tutorial character
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
			ammo = createSprite(1000, 370, 20, 20);
			ammo.addImage("ammo", ammoimg);
			ammo.changeImage("ammo");
		}
		drawSprites();
	}
	
	if (phase == 0){
		// PLAYER NOW HAS TO WALK THROUGH MAIN TOWN, KILLING ALL ENEMIES 
		move_camera(player.sprite.position.x);
		image(bg,0,0);
		printAmmo();
		player.move();
		player.sprite.overlap(ammo, getAmmo); //if player is overlapping w/ ammo, pick it up
		
		//SPAWN NEW ENEMIES WHEN THEY SEE THE PLAYER
		for (let i = 0; i < locations.length; i++){
			if (player.sprite.position.x + 400 >= locations[i][0]){
				newenemy = new Enemy(locations[i][0]-50, locations[i][1]-35,lifespan, enemyalive, enemydead, 42);
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
			boss = new Enemy(500, 270, 300, bossalive, bossdead, 80);
			player.sprite.position.set(0, 300);
			player.sprite.velocity.set(3, 0);
			camera.position.set(width/2, height/2);
			for (let i = 0; i < enemies.length; i++){
				//wipe previous enemies
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
				//player and boss duel when script is done
				boss.kill(mouseX, mouseY, player);
				scripton = false;
			}
		}
		if(boss.state == "dying"){
			endTimer++;
			gameover = true;
			if (endTimer >= 120){
				player.sprite.velocity.x = 2;
			}
		}
	}
	drawSprites(); //display all sprites
	if (deadyet && (player.deathtime != 0)){ //only play a gunshot when the player is killed (don't want overlapping gunshots)
		deadyet = false;
		gunshot.play();
	}
	if (!(player.isalive) && (millis() - player.deathtime > 1000)){
		//if player dies, give them a second and then display the end screen
		textFont(endfont);
		push();
		translate(camera.position.x - 290, 0);
		fill(0,opacity);
		rect(-100,-100,700,500);
		textSize(90);
		fill(255,0,0,opacity);
		let x = 80;
		for (let i = 0; i < urdead.length; i ++){
			text(urdead[i], x, 200 + random(-1, 1));
			x += textWidth(urdead[i])
		}
		opacity++;
		pop();
	}
}