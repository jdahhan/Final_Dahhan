class BloodList{
	constructor(x,y){
		this.data = [];
		this.position = createVector(x,y);
		this.i = 0;
	}
	populate(){
		let size = random(3);
		for (let i = 0 ; i < size ; i++ ){
			let temp = new Blood(this.position, random(-0.5, 0.5));
			temp.init();
			this.data.push(temp);
		}
		print(this.i);
	}
	
	display(){
		if (this.i <= 60){
			this.populate();
			this.i ++;
		
			for (let i = 0 ; i < this.data.length ; i++){
				if (this.data[i].run()){
					this.data.splice(i, 1);
				}
			}
		}
	}
	
}