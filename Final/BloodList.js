class BloodList{
	constructor(x,y){
		this.data = [];
		this.position = createVector(x,y);
	}
	populate(){
		let size = random(25,40);
		for (let i = 0 ; i < size ; i++ ){
			let temp = new Blood(this.position, random(-5, 5));
			temp.init();
			this.data.push(temp);
		}
	}
	
	display(){
		for (let i = 0 ; i < this.data.length ; i++){
			if (this.data[i].run()){
				this.data.splice(i, 1);
			}
		}
	}
	
}