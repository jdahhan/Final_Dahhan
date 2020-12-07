var player;
var phase = -1;
var img;
var locations = [[1000, 100]];
var enemies = [];
var newenemy;
var camera;
var boss;
var tutorial;

function preload(){
	img = loadImage("protobg.jpg");
}
function setup() {
	createCanvas(600, 400);
	player = new Player();
	camera = new Camera(200,height/2,1);
	tutorial = new Enemy(500,300,9999999999);
	player.sprite.position.set(0,300);
	player.sprite.velocity.set(5,0);
	camera.position.set(width/2, height/2);
}
function move_camera(x){
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
	background(100);
	if (phase == -1){
		background(160);
		if ((player.sprite.position.x >= 150) && (tutorial.state == "alive")){
			player.sprite.velocity.set(0,0);
			tutorial.kill(mouseX, mouseY, player);
		}
		if (tutorial.state == "dying"){
			player.move()
		}
		if (player.sprite.position.x >= width){
			player.sprite.position.set(0,0);
			tutorial.sprite.remove();
			phase = 0;
		}
		drawSprites();
	}
	if (phase == 0){
		move_camera(player.sprite.position.x);
		image(img,0,0);
		player.move();
		player.isdead();
		for (let i = 0; i < locations.length; i++){
			if (player.sprite.position.x + 300 >= locations[i][0]){
				newenemy = new Enemy(locations[i][0], locations[i][1],4000);
				enemies.push(newenemy);
				locations.splice(i,1);
			}
		}
		for (let i = 0; i < enemies.length; i++){
			enemies[i].kill(camera.mouseX, camera.mouseY, player);
		}
		drawSprites();
		if (player.sprite.position.x >= 2100){
			phase = 1;
			boss = new Enemy(500,300,3000);
			player.sprite.position.set(0,300);
			player.sprite.velocity.set(5,0);
			camera.position.set(width/2, height/2);
		}
	}
	if (phase == 1){
		background(160);
		if (player.sprite.position.x >= 150){
			player.sprite.velocity.set(0,0);
			boss.kill(mouseX, mouseY, player);
			player.isdead();
		}
		drawSprites();
	}
}