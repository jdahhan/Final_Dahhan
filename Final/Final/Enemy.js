class Enemy{
	constructor(x, y, lifespan){
		this.sprite = createSprite(x, y, 40, 40);
		this.sprite.shapeColor = color(190);
		this.sprite.life = lifespan;
		this.killtime = lifespan - 1000;
		this.starttime = millis(); 
		this.sprite.onMouseReleased = function(){
			print("IM DEAD");
			//play die animation
			//stop appearing
			this.sprite.life = 0;
		}
		
	}
	kill(){
		if (millis() - this.starttime >= this.killtime){
			print("UR DEAD");
			this.sprite.shapeColor = color(200, 0, 0);
			//kill the player
		}
	}
}