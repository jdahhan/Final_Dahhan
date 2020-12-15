
class Player{
	constructor(walk, stand, dead){
		this.sprite = createSprite(200, 350, 112, 150);
		this.sprite.scale = .9;
		this.sprite.shapeColor = color(0);
		this.sprite.addAnimation("walk", walk);
		this.sprite.addAnimation("stand", stand);
		this.sprite.addAnimation("dead", dead);
		this.isalive = true;
		this.position = true;
		this.deathtime = 0;
		this.ammo = 6;
	}

	move(){
		this.update_anim();
		if ((this.isalive) && (this.sprite.position.x >= 0) && (this.sprite.position.x <= 2100) &&
		 (this.sprite.position.y <= 400) && (this.sprite.position.y >= 0)){
			if (keyIsPressed == true){
				if (keyCode == RIGHT_ARROW) {
					this.sprite.velocity.x = 4;
					this.sprite.mirrorX(1);
				}
				else if (keyCode == DOWN_ARROW) {
					this.sprite.velocity.y = 2;
				}
				else if (keyCode == LEFT_ARROW) {
					this.sprite.velocity.x = -4;
					this.sprite.mirrorX(-1);
				}
				else if (keyCode == UP_ARROW) {
					this.sprite.velocity.y = -2;
			  	}
			}
			else{
				this.sprite.velocity.y = 0;
				this.sprite.velocity.x = 0;
			}
		}
		
		if (this.sprite.position.x < 0){
			this.sprite.position.x = 0;
			this.sprite.velocity.x = 0;
		}
		if (this.sprite.position.x > 2100){
			this.sprite.position.x = 2100;
			this.sprite.velocity.x = 0;
		}
		if (this.sprite.position.y < 260){
			this.sprite.position.y = 260;
			this.sprite.velocity.y = 0;
		}
		if (this.sprite.position.y > 400){
			this.sprite.position.y = 400;
			this.sprite.velocity.y = 0;
		}
	}
	update_anim(){
		if ((this.isalive) && (this.sprite.velocity.x == 0) && (this.sprite.velocity.y == 0)){
			this.sprite.changeAnimation("stand");
		}
		else if (this.isalive){
			this.sprite.changeAnimation("walk");
		}
		else if (!this.isalive){
			print(this.alive);
			this.sprite.changeAnimation("dead");
		}
	}
	isdead(){
		if (this.isalive == false){
			if (this.position){
				this.sprite.position.y += this.sprite.width/2;
				this.deathtime = millis();
				this.position = false;
			}
			this.sprite.velocity.set(0,0);
		}
	}
}