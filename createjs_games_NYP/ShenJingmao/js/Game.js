/**
 * @ constructor
 * */
function Game(stage, imgContainer){

    this.stage_ = stage;
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.jpg"]);
	this.floorTile = [];
	this.hiveCheck = [];
	
	for( var i = 0; i < 7; i ++){
		this.hiveCheck.push(new Hive(0,0));
	}
	
	this.tempY = 500;
	this.tempX = 10;
	for(var  i = 0; i < 9; i++ ){
		for(var  j = 0; j < 9; j++ ){
			this.floorTile.push(new Circle( j  * 65 + this.tempX,this.tempY, (i * 9) + j ));
		}
		if( i % 2 == 0 ){
			this.tempX  = 40;
		}
		else{
			this.tempX  = 10;
		}
		
		this.tempY  += 60;
	}
	this.numberOfColorTileAtStart =   Math.floor(Util.RandomRange(5,15));
	
	
	 for(var i = 0; i < this.numberOfColorTileAtStart; i++){
		 this.temp =  Math.floor(Util.RandomRange(0,80));
		 if( this.temp >= 36 &&  this.temp <= 44){
			this.temp +=10;
		 }
		if(!this.floorTile[this.temp].click){
		 this.floorTile[this.temp].changeColor();
		 }
	 }
	 
	 
	 var startTile = 40;
	this.ai = new AI(this.floorTile[startTile].x , this.floorTile[startTile].y - this.floorTile[startTile].getRadius()*2,  startTile);
	this.stage_.addEventListener('mousedown', Delegate.create(this,this.onMouseClick));

};
/**
 * @ tick
 * */
Game.prototype.tick = function(event) {
};
/**
 * @ checkGameOver
 * */
Game.prototype.checkGameOver = function(){
};
/**
 * @ loadImage
 * */
Game.prototype.loadImage = function() {
    	this.stage_.addChild(this.bg);
		for(var i =0; i < this.floorTile.length; i++)
		{
			this.stage_.addChild(this.floorTile[i]);
		}
		this.stage_.addChild(this.ai);
};
/**
 * @ reset
 * */
Game.prototype.reset = function() {
};
/**
 * @ restart
 * */
Game.prototype.restart = function(e) {
	
};

Game.prototype.hiveUpdate = function(){

	if(this.aiWhichRow % 2 == 0){
		this.hiveCheck[1].value_ = this.ai.whichTile_-10;	
		this.hiveCheck[2].value_ = this.ai.whichTile_-9;	
		this.hiveCheck[5].value_ = this.ai.whichTile_+8;		
		this.hiveCheck[6].value_ = this.ai.whichTile_+9;
	}
	else{
		this.hiveCheck[1].value_ = this.ai.whichTile_-9;		
		this.hiveCheck[2].value_ = this.ai.whichTile_-8;		
		this.hiveCheck[5].value_ = this.ai.whichTile_+9;		
		this.hiveCheck[6].value_ = this.ai.whichTile_+10;
	}
	this.hiveCheck[0].value_ = this.ai.whichTile_;
	this.hiveCheck[3].value_ = this.ai.whichTile_-1;
	this.hiveCheck[4].value_ = this.ai.whichTile_+1;
};

Game.prototype.topright = function(number, row, decrase){
	if(row <(0+decrase) ||  number < 0){
		return false;
	}
	if(this.floorTile[number].click && number != this.hiveCheck[0].value_){
		return true;
	}
	
	if(row % 2 == 0){
		return this.topright(number-9, row-1, decrase);
	}else{
		return this.topright(number-8, row-1, decrase);
	}
	
	return false;
};

Game.prototype.topleft = function(number, row, decrase){
	if(row < (0+decrase) ||  number < 0){
		return false;
	}
	if(this.floorTile[number].click && number != this.hiveCheck[0].value_){
		return true;
	}
	if(row % 2 == 0){
		return this.topleft(number-10, row-1, decrase);
	}else{
		return this.topleft(number-9, row-1, decrase);
	}
	
	return false;
};

Game.prototype.left = function(number, range, decrase){
	if(number < (range+decrase)){
		return false;
	}
	if(this.floorTile[number].click && number != this.hiveCheck[0].value_){		
		return true;
	}
	
	return this.left(number-1, range, decrase);

	return false;
};

Game.prototype.right = function(number, range, decrase){
	if(number > (range-decrase)){
		return false;
	}
	if(this.floorTile[number].click && number != this.hiveCheck[0].value_){	
		return true;
	}
	
	return this.right(number+1, range, decrase);
	
	return false;
};

Game.prototype.botleft = function(number, row, decrase){
	if(row > (8-decrase) ||  number > 81){
		return false;
	}
	if(this.floorTile[number].click && number != this.hiveCheck[0].value_){	
		return true;
	}
	if(row % 2 == 0){
		return this.botleft(number+8, row+1, decrase);
	}else{
		return this.botleft(number+9, row+1, decrase);
	}
	
	return false;
};

Game.prototype.botright = function(number, row, decrase){
	if(row > (8-decrase) ||  number > 81){
		return false;
	}
	if(this.floorTile[number].click && number != this.hiveCheck[0].value_){	
		return true;
	}
	if(row % 2 == 0){
		return this.botright(number+9, row+1, decrase);
	}else{
		return this.botright(number+10, row+1, decrase);
	}
	
	return false;
};


Game.prototype.checkWeiZhu = function(visualplace, visualRow, hiveNum){
	/*
	if(this.topleft(visualplace, visualRow)){
		if(this.topright(visualplace, visualRow)){
			if(this.left(visualplace, visualRow*9)){
				if(this.right(visualplace, visualRow*9+8)){
					if(this.botleft(visualplace, visualRow)){
						if(this.botright(visualplace, visualRow)){
							this.hiveCheck[hiveNum].alive = false;
							return true;
						}
					}
				}
			}
		}
	}else{
		return false;
	}
	return false;
	*/
};

/**
 * @ onMouseClick
 * */
Game.prototype.onMouseClick = function(e) {

	if( e.localY > 500 && e.localY < 1140){
		var tempYValue = Math.floor((e.localY - 500) / 60) ;
		for(var i = tempYValue *9; i <  tempYValue *9 + 9; i++ ){
			if( Util.collision(this.floorTile[i].x + this.floorTile[i].getRadius() ,this.floorTile[i].y + this.floorTile[i].getRadius(), this.floorTile[i].getRadius() , e.localX ,e.localY) &&  !this.floorTile[i].click ){
				
				this.floorTile[i].changeColor();
			}
		}
	}	
	
	this.aiWhichRow = Math.floor((this.ai.y + this.floorTile[40].getRadius()*2 - 500) / 60) ;
	
	this.hiveUpdate();
	
	for( var i = 1; i < this.hiveCheck.length; i ++){	
		if(this.floorTile[this.hiveCheck[i].value_].click){
			this.hiveCheck[i].alive = false;
		}else{
			this.hiveCheck[i].alive = true;
		}
	}
	
	this.catMove = true;
	this.lineCheckDecrease = 0;
	while(this.catMove){
		if(!this.topleft(this.ai.whichTile_,this.aiWhichRow, this.lineCheckDecrease) && this.hiveCheck[1].alive){
			this.moveTopLeft();
			this.catMove = false;
		}else if(!this.topright(this.ai.whichTile_,this.aiWhichRow, this.lineCheckDecrease) && this.hiveCheck[2].alive){
			this.moveTopRight();
			this.catMove = false;
		}else if(!this.left(this.ai.whichTile_, this.aiWhichRow*9, this.lineCheckDecrease) && this.hiveCheck[3].alive){
			this.moveLeft();
			this.catMove = false;
		}else if(!this.right(this.ai.whichTile_, this.aiWhichRow*9+8, this.lineCheckDecrease)&& this.hiveCheck[4].alive){
			this.moveRight();	
			this.catMove = false;
		}else if(!this.botleft(this.ai.whichTile_, this.aiWhichRow, this.lineCheckDecrease) && this.hiveCheck[5].alive){
			this.moveBottomLeft();
			this.catMove = false;
		}else if(!this.botright(this.ai.whichTile_, this.aiWhichRow, this.lineCheckDecrease) && this.hiveCheck[6].alive){
			this.moveBottomRight();
			this.catMove = false;
		}
		this.lineCheckDecrease += 1;
		if(!this.hiveCheck[1].alive && !this.hiveCheck[2].alive && !this.hiveCheck[3].alive &&
		!this.hiveCheck[4].alive && !this.hiveCheck[5].alive && !this.hiveCheck[6].alive){
			this.catMove = false;
			console.log("Dead Cat");
		}
	}
	
	
	/*
	for( var i = 0; i < this.hiveCheck.length; i ++){	
		if(this.floorTile[this.hiveCheck[i].value_].click){
			this.hiveCheck[i].alive = false;
		}
	
		if(this.hiveCheck[i].alive){
			this.checkWeiZhu(this.hiveCheck[i].value_, this.hiveCheck[i].row_, i);
		}
	}
	
	this.tempI = 0;
	this.tempII = 0;
	
	for( var i = 0; i < 7; i ++){
		if(!this.hiveCheck[i].alive){
			this.tempI += 1;
		}
		if(this.tempI >= 7){
			console.log('trap');
			this.ai.changeAnimation(true);
		}
	}
	for( var i = 0; i < this.hiveCheck.length; i ++){
	
		//if dead
		if(!this.hiveCheck[i].alive){
			this.tempII += 1;
		}
		
		if(this.tempII >= 12){
			console.log('trap');
			this.ai.changeAnimation(true);
		}
		
		console.log(this.tempI);
	}
	
	*/
};
Game.prototype.moveTopLeft = function(){
	//topLeft
	if(this.aiWhichRow % 2 == 0){
		if(  this.ai.whichTile_ -10 > 0 && this.ai.whichTile_  !=  this.aiWhichRow * 9 ){
			this.ai.x = this.floorTile[this.ai.whichTile_ -10].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ -10].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ - 10;
		}
	}
	else{
		if( this.ai.whichTile_ -9 > 0 ){
			this.ai.x = this.floorTile[this.ai.whichTile_ -9].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ - 9].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ -9;
		}
	}
};

Game.prototype.moveTopRight = function(){
	// top right
	if(this.aiWhichRow % 2 == 0){
		if(  this.ai.whichTile_ - 9 > 0 ){
			this.ai.x = this.floorTile[this.ai.whichTile_ - 9].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ - 9].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ - 9;
		}
	}
	else{
		if( this.ai.whichTile_ -8 > 0 &&  this.ai.whichTile_  !=  this.aiWhichRow * 9 + 8){
			this.ai.x = this.floorTile[this.ai.whichTile_ -8].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ - 8].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ -8;
		}
	}
};

Game.prototype.moveLeft = function(){
	//left movement
	if( this.ai.whichTile_ -1 >= this.aiWhichRow*9 ){
		this.ai.x = this.floorTile[this.ai.whichTile_ -1].x;
		this.ai.whichTile_ = this.ai.whichTile_ -1;
	}
};

Game.prototype.moveRight = function(){
	//right movement
	if( this.ai.whichTile_ + 1 <= this.aiWhichRow*9 + 8 ){
		this.ai.x = this.floorTile[this.ai.whichTile_ +1].x;
		this.ai.whichTile_ = this.ai.whichTile_ +1;
	}
};

Game.prototype.moveBottomLeft = function(){
	//left bottom
	if(this.aiWhichRow % 2 == 0){
		if(  this.ai.whichTile_ + 8 < 80 && this.ai.whichTile_  !=  this.aiWhichRow * 9 ){
			this.ai.x = this.floorTile[this.ai.whichTile_ + 8].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ + 8].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ +8;
		}
	}
	else{
		if( this.ai.whichTile_ + 9 < 80 ){
			this.ai.x = this.floorTile[this.ai.whichTile_  + 9].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ + 9].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ +9;
		}
	}
};

Game.prototype.moveBottomRight = function(){
	//right bottom
	if(this.aiWhichRow % 2 == 0){
		if(  this.ai.whichTile_ + 9 < 80  ){
			this.ai.x = this.floorTile[this.ai.whichTile_ + 9].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ + 9].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ + 9;
		}
	}
	else{
		if( this.ai.whichTile_ + 10 < 80 &&  this.ai.whichTile_  !=  this.aiWhichRow * 9 + 8 ){
			this.ai.x = this.floorTile[this.ai.whichTile_ + 10].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ + 10].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ + 10;
		}
	}
};

/**
 * @ start
 * */
Game.prototype.start = function() {

  
	this.loadImage();
    //this is the proper way of monitoring system tick in createjs
	createjs.Ticker.addEventListener('tick', Delegate.create(this,this.tick));
};