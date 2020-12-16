class Script{
	constructor(textlist){
		this.textlist = textlist;
		this.i = 0; // index pointer
		this.char = 0; // character pointer
		textSize(15); 
		this.bounds = [0, 380, 600, 400]; // textbox size
	}
	
	display_box(){
		if (this.i >= this.textlist.length){ // return false if we are out of range 
			return false;
		}
		stroke(250);
		fill(0);
		rect(this.bounds[0],this.bounds[1],this.bounds[2],this.bounds[3]);
		fill(250);
		noStroke();
		text(this.textlist[this.i].substring(0,this.char), this.bounds[0]+10, this.bounds[1]+5, this.bounds[2]-10, this.bounds[3]);
		if (this.char < this.textlist[this.i].length){ // increment character if any left
			this.char++;
		}
		if (millis() % 1000 > 500){ // make triangle blink
			fill(0);
		}
		else{
			fill(250);
		}
		triangle(595,390,590,385,590,395);
		return true; // return true while there's more to read
	}
	
	display(){
		// print entire script
		let bool = this.display_box() // print current line
		if (bool){
			if ((mouseIsPressed) && (mouseY > this.bounds[1]) && (this.char == this.textlist[this.i].length)){
				// if the entire message is printed and the user clicks, reset character pointer and increment line pointer
				this.char = 0;
				this.i++;
			}
		}
		return bool; // return whether or not we are out of lines
	}
	
}
