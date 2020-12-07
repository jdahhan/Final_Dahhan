var WIDTH = 40;
var HEIGHT = 40;
class Enemy{
	constructor(x, y, lifespan){
		this.sprite = createSprite(x, y, 40, 40);
		this.sprite.shapeColor = color(190);
		this.killtime = lifespan - 1000;
		this.starttime = millis();
		this.location = [[x - WIDTH / 2, x + WIDTH / 2], [y - HEIGHT / 2, y + HEIGHT / 2]];
		this.state = "alive";
	}

	
	kill(x,y,player){
		if (this.state == "alive"){
			if ((this.location[0][0] < x ) && ( x < this.location[0][1]) && (this.location[1][0] < y ) && ( y < this.location[1][1]) && (mouseIsPressed)){
				this.state = "dying";
				this.sprite.shapeColor = color(0,250,0);
			}
			if (millis() - this.starttime >= this.killtime){
				this.state = "firing";
				this.sprite.shapeColor = color(200, 0, 0);
				player.isalive = false;
				//kill the player
			}
		}
	}
}