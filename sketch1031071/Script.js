class Script{
	constructor(textlist){
		this.textlist = textlist;
		this.i = 0;
		this.buffer = 0;
		this.char = 0;
		textSize(15); 
		this.bounds = [0,380,width,400];
	}
	
	display_box(){
		if (this.i >= this.textlist.length){
			return false;
		}
		fill(0);
		rect(this.bounds[0],this.bounds[1],this.bounds[2],this.bounds[3]);
		fill(250);
		text(this.textlist[this.i].substring(0,this.char), this.bounds[0]+10, this.bounds[1]+5, this.bounds[2]-10, this.bounds[3]);
		if (this.char < this.textlist[this.i].length){
			this.char++;
		}
		if (millis() % 1000 > 500){
			fill(0);
		}
		else{
			fill(250);
		}
		triangle(595,390,590,385,590,395);
		return true;
	}
	
	display(){
		if (this.buffer == 0){
			this.buffer = millis();
		}
		let bool = this.display_box()
		if (bool){
			if ((mouseIsPressed) && (mouseY > this.bounds[1]) && (this.char == this.textlist[this.i].length)){
				this.char = 0;
				this.buffer = millis();
				this.i++;
			}
		}
		return bool;
	}
	
}
