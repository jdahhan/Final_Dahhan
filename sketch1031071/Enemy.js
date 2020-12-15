var WIDTH = 40;
var HEIGHT = 40;
class Enemy{
	constructor(x, y, lifespan){
		this.sprite = createSprite(x, y, 60, 60);
		this.sprite.shapeColor = color(190);
		this.killtime = lifespan - 1000;
		this.starttime = 0;
		this.location = [[x - WIDTH / 2, x + WIDTH / 2], [y - HEIGHT / 2, y + HEIGHT / 2]];
		this.state = "alive";
		//this.blood = new BloodList(x, y);
	}
	
	kill(x,y,player){
		print("killing");
		if (this.starttime == 0){
			this.starttime = millis();
		}
		if (this.state == "alive"){
			if ((player.ammo > 0) && (this.location[0][0] < x ) && ( x < this.location[0][1]) && (this.location[1][0] < y ) && ( y < this.location[1][1]) && (mouseIsPressed)){
				print("dying");
				this.state = "dying";
				this.sprite.shapeColor = color(0,250,0);
				//this.blood.display();
			}
			if (millis() - this.starttime >= this.killtime){
				this.state = "firing";
				this.sprite.shapeColor = color(200, 0, 0);
				player.isalive = false;
				//kill the player
			}
		}
		else if (this.state == "dying"){
			//this.blood.display();
		}
	}
}