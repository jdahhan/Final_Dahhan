class Enemy{
	constructor(x, y, killtime, alive, dead, buf){
		this.buf = buf; // if i need to remove part of their hurtbox for the gun
		this.sprite = createSprite(x, y, 60, 60); 
		this.sprite.addAnimation("alive", alive);
		this.sprite.addAnimation("dead", dead);
		this.killtime = killtime; // when does it start killing
		this.starttime = 0; //what time is it activated
		this.location = [[buf + x - alive.getWidth() / 2, x + alive.getWidth() / 2], [y - alive.getHeight() / 2, y + alive.getHeight() / 2]]; //hitbox detection
		this.state = "alive";
	}
	
	kill(x,y,player){
		if (this.starttime == 0){
			this.starttime = millis();
		}
		if (this.state == "alive"){
			this.sprite.changeAnimation("alive");
			if ((player.ammo > 0) && (this.location[0][0] < x ) && ( x < this.location[0][1]) && 
					(this.location[1][0] < y ) && ( y < this.location[1][1]) && (mouseIsPressed)){
				// if click in bounds and player has ammo
				this.state = "dying";
				if (this.buf == 80){ // had to rotate and move the boss sprite
					this.sprite.rotation = 90;
					this.sprite.position.y += 35;
				}
				if (this.buf == 0){
					this.sprite.position.y += 10; // had to move tutorial sprite
				}
				this.sprite.changeAnimation("dead");
				
			}
			if (millis() - this.starttime >= this.killtime){
				//kill the player if we have passed the kill time
				this.state = "firing";
				player.isalive = false;
			}
		}
	}
}