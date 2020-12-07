
class Player{
	constructor(walk, stand){
		this.sprite = createSprite(200, 350, 60, 80);
		this.sprite.shapeColor = color(0);
		this.sprite.depth = 10000000000000000000000;
		this.sprite.addAnimation("walk", walk);
		this.sprite.addAnimation("stand", stand);
		this.sprite.scale = 1.4;
		this.isalive = true;
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
					this.sprite.velocity.y = 4;
				}
				else if (keyCode == LEFT_ARROW) {
					this.sprite.velocity.x = -4;
					this.sprite.mirrorX(-1);
				}
				else if (keyCode == UP_ARROW) {
					this.sprite.velocity.y = -4;
			  	}
			}
			else{
				this.sprite.velocity.y = 0;
				this.sprite.velocity.x = 0;
			}
		}
		
		if (this.sprite.position.x < 0){
			print("out of range");
			this.sprite.position.x = 0;
			this.sprite.velocity.x = 0;
		}
		if (this.sprite.position.x > 2100){
			print("out of range");
			this.sprite.position.x = 2100;
			this.sprite.velocity.x = 0;
		}
		if (this.sprite.position.y < 260){
			print("out of range");
			this.sprite.position.y = 260;
			this.sprite.velocity.y = 0;
		}
		if (this.sprite.position.y > 400){
			print("out of range");
			this.sprite.position.y = 400;
			this.sprite.velocity.y = 0;
		}
	}
	update_anim(){
		if ((this.sprite.velocity.x == 0) && (this.sprite.velocity.y == 0)){
			this.sprite.changeAnimation("stand");
		}
		else{
			this.sprite.changeAnimation("walk");
		}
	}
	isdead(){
		if (this.isalive == false){
			this.sprite.velocity.set(0,0);
			print("dead");
			this.sprite.rotation = 90;
		}
	}
}