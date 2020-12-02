class Player{
	constructor(){
		this.sprite = createSprite(200, 350, 40, 40);
		this.sprite.shapeColor = color(0);
	}

	move(){
		if ((this.sprite.position.x >= 0) && (this.sprite.position.x <= 2100) &&
		 (this.sprite.position.y <= 400) && (this.sprite.position.y >= 0)){
			if (keyIsPressed == true){
				print(keyCode);
				if (keyCode == RIGHT_ARROW) {
					this.sprite.velocity.x = 10.5;
				}
				else if (keyCode == DOWN_ARROW) {
					this.sprite.velocity.y = 10.5;
				}
				else if (keyCode == LEFT_ARROW) {
					this.sprite.velocity.x = -10.5;
				}
				else if (keyCode == UP_ARROW) {
					this.sprite.velocity.y = -10.5;
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
		if (this.sprite.position.y < 300){
			print("out of range");
			this.sprite.position.y = 300;
			this.sprite.velocity.y = 0;
		}
		if (this.sprite.position.y > 400){
			print("out of range");
			this.sprite.position.y = 400;
			this.sprite.velocity.y = 0;
		}
		
	}
}