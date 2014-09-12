/**
 * @ constructor
 * */
function Game(stage, imgContainer){

    this.stage_ = stage;
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.jpg"]);
	this.floorTile = [];
	this.hiveCheck = [];
	
	for( var i = 0; i < 13; i ++){
		this.hiveCheck.push(new Hive(0,0));
	}
	console.log("hi");
	
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

	this.hiveCheck[0].value_ = this.ai.whichTile_;
	this.hiveCheck[1].value_ = this.ai.whichTile_-10;
	this.hiveCheck[2].value_ = this.ai.whichTile_-9;
	this.hiveCheck[3].value_ = this.ai.whichTile_-1;
	this.hiveCheck[4].value_ = this.ai.whichTile_+1;
	this.hiveCheck[5].value_ = this.ai.whichTile_+8;
	this.hiveCheck[6].value_ = this.ai.whichTile_+9;
	
	this.hiveCheck[7].value_ = this.ai.whichTile_-19;
	this.hiveCheck[8].value_ = this.ai.whichTile_-17;
	this.hiveCheck[9].value_ = this.ai.whichTile_-2;
	this.hiveCheck[10].value_ = this.ai.whichTile_+2;
	this.hiveCheck[11].value_ = this.ai.whichTile_+17;
	this.hiveCheck[12].value_ = this.ai.whichTile_+19;
	
	this.hiveCheck[0].row_ = this.aiWhichRow;
	this.hiveCheck[1].row_ = this.aiWhichRow-1;
	this.hiveCheck[2].row_ = this.aiWhichRow-1;
	this.hiveCheck[3].row_ = this.aiWhichRow;
	this.hiveCheck[4].row_ = this.aiWhichRow;
	this.hiveCheck[5].row_ = this.aiWhichRow+1;
	this.hiveCheck[6].row_ = this.aiWhichRow+1;
	
	this.hiveCheck[7].row_ = this.aiWhichRow-2;
	this.hiveCheck[8].row_ = this.aiWhichRow-2;
	this.hiveCheck[9].row_ = this.aiWhichRow;
	this.hiveCheck[10].row_ = this.aiWhichRow;
	this.hiveCheck[11].row_ = this.aiWhichRow+2;
	this.hiveCheck[12].row_ = this.aiWhichRow+2;
};

Game.prototype.topright = function(number, row){
	if(row < 0 ||  number < 0){
		return false;
	}
	if(this.floorTile[number].click){
		return true;
	}
	
	if(row % 2 == 0){
		return this.topright(number-9, row-1);
	}else{
		return this.topright(number-8, row-1);
	}
	
	return false;
};

Game.prototype.topleft = function(number, row){
	if(row < 0 ||  number < 0){
		return false;
	}
	if(this.floorTile[number].click){
		return true;
	}
	if(row % 2 == 0){
		return this.topleft(number-10, row-1);
	}else{
		return this.topleft(number-9, row-1);
	}
	
	return false;
};

Game.prototype.left = function(number, range){
	if(number < range){
		return false;
	}
	if(this.floorTile[number].click){		
		return true;
	}
	
	return this.left(number-1, range);

	return false;
};

Game.prototype.right = function(number, range){
	if(number > range){
		return false;
	}
	if(this.floorTile[number].click){	
		return true;
	}
	
	return this.right(number+1, range);
	
	return false;
};

Game.prototype.botleft = function(number, row){
	if(row > 8 ||  number > 81){
		return false;
	}
	if(this.floorTile[number].click){	
		return true;
	}
	if(row % 2 == 0){
		return this.botleft(number+8, row+1);
	}else{
		return this.botleft(number+9, row+1);
	}
	
	return false;
};

Game.prototype.botright = function(number, row){
	if(row > 8 ||  number > 81){
		return false;
	}
	if(this.floorTile[number].click){	
		return true;
	}
	if(row % 2 == 0){
		return this.botright(number+9, row+1);
	}else{
		return this.botright(number+10, row+1);
	}
	
	return false;
};


Game.prototype.checkWeiZhu = function(visualplace, visualRow, hiveNum){
	
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
	
	
	

	/*
	//left movement
	if( this.ai.whichTile_ -1 >= this.aiWhichRow*9 &&  !this.floorTile[this.ai.whichTile_ -1].click ){
		this.ai.x = this.floorTile[this.ai.whichTile_ -1].x;
		this.ai.whichTile_ = this.ai.whichTile_ -1;
	}
	
	//right movement
	
	if( this.ai.whichTile_ + 1 <= this.aiWhichRow*9 + 8 && !this.floorTile[this.ai.whichTile_  + 1].click ){
		this.ai.x = this.floorTile[this.ai.whichTile_ +1].x;
		this.ai.whichTile_ = this.ai.whichTile_ +1;
	}
	
	//topLeft

	if(this.aiWhichRow % 2 == 0){
		if(  this.ai.whichTile_ -10 > 0 && this.ai.whichTile_  !=  this.aiWhichRow * 9 &&  !this.floorTile[this.ai.whichTile_  - 10 ].click ){
			this.ai.x = this.floorTile[this.ai.whichTile_ -10].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ -10].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ - 10;
		}
	}
	else{
		if( this.ai.whichTile_ -9 > 0 && !this.floorTile[this.ai.whichTile_ - 9].click ){
			this.ai.x = this.floorTile[this.ai.whichTile_ -9].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ - 9].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ -9;
		}
	}
	
	// top right
	
	
	if(this.aiWhichRow % 2 == 0){
		if(  this.ai.whichTile_ - 9 > 0 &&  !this.floorTile[this.ai.whichTile_  - 9 ].click ){
			this.ai.x = this.floorTile[this.ai.whichTile_ - 9].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ - 9].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ - 9;
		}
	}
	else{
		if( this.ai.whichTile_ -8 > 0 &&  this.ai.whichTile_  !=  this.aiWhichRow * 9 + 8 && !this.floorTile[this.ai.whichTile_ - 8].click ){
			this.ai.x = this.floorTile[this.ai.whichTile_ -8].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ - 8].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ -8;
		}
	}
	
	//left bottom
	
	if(this.aiWhichRow % 2 == 0){
		if(  this.ai.whichTile_ + 8 < 80 && this.ai.whichTile_  !=  this.aiWhichRow * 9 &&  !this.floorTile[this.ai.whichTile_  + 8 ].click ){
			this.ai.x = this.floorTile[this.ai.whichTile_ + 8].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ + 8].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ +8;
		}
	}
	else{
		if( this.ai.whichTile_ + 9 < 80 && !this.floorTile[this.ai.whichTile_ + 9].click ){
			this.ai.x = this.floorTile[this.ai.whichTile_  + 9].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ + 9].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ +9;
		}
	}
		
	
	//right bottom
	if(this.aiWhichRow % 2 == 0){
		if(  this.ai.whichTile_ + 9 < 80 &&  !this.floorTile[this.ai.whichTile_  + 9 ].click ){
			this.ai.x = this.floorTile[this.ai.whichTile_ + 9].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ + 9].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ + 9;
		}
	}
	else{
		if( this.ai.whichTile_ + 10 < 80 &&  this.ai.whichTile_  !=  this.aiWhichRow * 9 + 8 && !this.floorTile[this.ai.whichTile_ + 10].click ){
			this.ai.x = this.floorTile[this.ai.whichTile_ + 10].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ + 10].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ + 10;
		}
	}
	*/
};
/**
 * @ start
 * */
Game.prototype.start = function() {

  
	this.loadImage();
    //this is the proper way of monitoring system tick in createjs
	createjs.Ticker.addEventListener('tick', Delegate.create(this,this.tick));
};