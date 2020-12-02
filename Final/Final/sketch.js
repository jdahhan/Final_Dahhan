var player;
var img;
var locations = [[1000, 100]];
var enemies = [];
function preload(){
	img = loadImage("protobg.jpg");
}
function setup() {
	createCanvas(600, 400);
	player = new Player();
}
function move_camera(x){
	print(x);
	if (200 > x){
		x = 200;
	}
	if (1700 < x){
		x = 1700;
	}
	print(x);
	translate(- x + 200, 0);
}
function draw() {
	background(100);
	move_camera(player.sprite.position.x);
	image(img,0,0);
	player.move();
	for (let i = 0; i < locations.length; i++){
		if (player.sprite.position.x + 300 >= locations[i][0]){
			enemies.push(new Enemy(locations[i][0], locations[i][1],4000));
			locations.splice(i,1);
		}
	}
	for (let i = 0; i < enemies.length; i++){
		enemies[i].kill();
	}
	drawSprites();
}