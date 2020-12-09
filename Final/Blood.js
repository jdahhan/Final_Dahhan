class Blood{
  constructor(position, xvel){
    this.counter = 1;
    this.size = 5;
    this.position = position;
    this.velocity = createVector(xvel,0)
  }
  
  init(){
		let x = this.velocity.x + random(-1,1);
		let y = -5 + this.velocity.x - random(2);
    this.velocity.set(x, y);
  }
  
  update(){
    this.counter ++;
    if (this.counter > 60){
      this.size -= 0.1
    }
		this.position.add(this.velocity);
		this.velocity.y += 2;
  }
  
  isdone(){return this.size < 2;}
  
  display(){
    push()
    translate(this.position.x, this.position.y);
    noStroke()
    fill(random(200, 205),0,10);
    circle(0,0,this.size);
    pop()
  }
	run(){
		this.update();
		this.display();
		return this.isdone();
	}
}