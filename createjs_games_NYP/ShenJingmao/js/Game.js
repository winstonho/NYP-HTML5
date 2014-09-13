/**
 * @ constructor
 * */
function Game(stage, imgContainer){

    this.stage_ = stage;
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.jpg"]);
	this.floorTile = [];
	this.hiveCheck = [];
	
	//check cat path
	this.catPathArray = [];
	this.catPathAmount = 1;
	this.catPathArray.push( new Path() );
	
	//console.log("hi");
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

Game.prototype.hiveUpdate = function(pos){

	if(this.aiWhichRow % 2 == 0){
		this.hiveCheck[1].value_ = pos-10;	
		this.hiveCheck[2].value_ = pos-9;	
		this.hiveCheck[5].value_ = pos+8;		
		this.hiveCheck[6].value_ = pos+9;
	}
	else{
		this.hiveCheck[1].value_ = pos-9;		
		this.hiveCheck[2].value_ = pos-8;		
		this.hiveCheck[5].value_ = pos+9;		
		this.hiveCheck[6].value_ = pos+10;
	}
	this.hiveCheck[0].value_ = pos;
	this.hiveCheck[3].value_ = pos-1;
	this.hiveCheck[4].value_ = pos+1;
};

Game.prototype.outOfBound = function(number) {
	if( number >= 0 && number <= 8){
		return true;
	}
	if( number >= 72 && number <= 80){
		return true;
	}
	for(var i = 0; i < 9; i++){
		if( number == i*9){
			return true;
		}
	}
	for(var i = 0; i < 9; i++){
		if( number == i*9+8){
			return true;
		}
	}
		
	return false;
};

Game.prototype.topLeftCheck = function(number, row){
	if(this.outOfBound(number)){
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number;
	}
	if(row % 2 == 0){	
		if(this.floorTile[number-10].click || this.floorTile[number-10].hasMoved || this.floorTile[number-10].hasMovedClosed){
			return this.pathFinding(number, row, 'topright');
		}	
		this.floorTile[number].hasMoved = true;
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number + this.topLeftCheck(number-10, row-1);
	}else{
		if(this.floorTile[number-9].click || this.floorTile[number-9].hasMoved || this.floorTile[number-9].hasMovedClosed){
			return this.pathFinding(number, row, 'topright');
		}
		this.floorTile[number].hasMoved = true;
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number + this.topLeftCheck(number-9, row-1);
	}
	
};

Game.prototype.topRightCheck = function(number, row){
	if(this.outOfBound(number)){
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number;
	}
	
	if(row % 2 == 0){	
		if(this.floorTile[number-9].click || this.floorTile[number-9].hasMoved || this.floorTile[number-9].hasMovedClosed){
			return this.pathFinding(number, row, 'left');
		}
		this.floorTile[number].hasMoved = true;
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number + this.pathFinding(number-9, row-1, 'topleft');
	}else{
		if(this.floorTile[number-8].click || this.floorTile[number-8 ].hasMoved || this.floorTile[number-8].hasMovedClosed){
			return this.pathFinding(number, row, 'left');
		}
		this.floorTile[number].hasMoved = true;
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number + this.pathFinding(number-8, row-1, 'topleft');
	}
};

Game.prototype.leftCheck = function(number, row){
	if(this.outOfBound(number)){
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number;
	}
	if(this.floorTile[number-1].click || this.floorTile[number-1].hasMoved || this.floorTile[number-1].hasMovedClosed){
		return this.pathFinding(number, row, 'right');
	}
	this.floorTile[number].hasMoved = true;
	this.catPathArray[this.catPathAmount].value_.push(number);
	return number + this.pathFinding(number-1, row, 'topleft');
	
};

Game.prototype.rightCheck = function(number, row){
	if(this.outOfBound(number)){
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number;
	}
	if(this.floorTile[number+1].click || this.floorTile[number+1].hasMoved || this.floorTile[number+1].hasMovedClosed){
		return this.pathFinding(number, row, 'botleft');
	}
	this.floorTile[number].hasMoved = true;
	this.catPathArray[this.catPathAmount].value_.push(number);
	return number + this.pathFinding(number+1, row, 'topleft');

};

Game.prototype.botLeftCheck = function(number, row){
	if(this.outOfBound(number)){
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number;
	}
	
	if(row % 2 == 0){	
		if(this.floorTile[number+8].click || this.floorTile[number+8].hasMoved || this.floorTile[number+8].hasMovedClosed){
			return this.pathFinding(number, row, 'botright');
		}
		this.floorTile[number].hasMoved = true;
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number + this.pathFinding(number+8, row+1, 'topleft');
	}else{
		if(this.floorTile[number+9].click || this.floorTile[number+9].hasMoved || this.floorTile[number+9].hasMovedClosed){
			return this.pathFinding(number, row, 'botright');
		}
		this.floorTile[number].hasMoved = true;
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number + this.pathFinding(number+9, row+1, 'topleft');
	}
};

Game.prototype.botRightCheck = function(number, row){
	if(this.outOfBound(number)){
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number;
	}
	
	if(row % 2 == 0){	
		if(this.floorTile[number+9].click || this.floorTile[number+9].hasMoved || this.floorTile[number+9].hasMovedClosed){
			this.floorTile[number].hasMoved = true;
			this.floorTile[number].hasMovedClosed = true;
			for(var i = 0; i < this.floorTile.length; i ++){
				if( this.floorTile[i].hasMoved ){
					this.floorTile[i].hasMoved = false;
				}
			}		
			this.catPathArray.push( new Path() );
			this.catPathAmount += 1;
			return this.pathFinding(this.ai.whichTile_,this.aiWhichRow, 'topleft');
		}
		this.floorTile[number].hasMoved = true;
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number + this.pathFinding(number+9, row+1, 'topleft');
	}else{
		if(this.floorTile[number+10].click || this.floorTile[number+10].hasMoved || this.floorTile[number+10].hasMovedClosed){
			this.floorTile[number].hasMoved = true;
			this.floorTile[number].hasMovedClosed = true;
			for(var i = 0; i < this.floorTile.length; i ++){
				if( this.floorTile[i].hasMoved ){
					this.floorTile[i].hasMoved = false;
				}
			}
			this.catPathArray.push( new Path() );
			this.catPathAmount += 1;
			return this.pathFinding(this.ai.whichTile_,this.aiWhichRow, 'topleft');
		}
		this.floorTile[number].hasMoved = true;
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number + this.pathFinding(number+10, row+1, 'topleft');
	}
};

Game.prototype.pathFinding = function(number, row, dir){
	
	this.catAbleToMove = 0;
	
	//cat trapped
	for( var i = 1; i < 7 ; i++){
		if(this.floorTile[this.hiveCheck[i].value_].hasMovedClosed || this.floorTile[this.hiveCheck[i].value_].click){
			this.catAbleToMove += 1;
		}		
	}
	
	if(this.catAbleToMove < 6){
		if(dir == 'topleft'){
			this.pathCalculation += this.topLeftCheck(number, row);
		}else if(dir == 'topright'){
			this.pathCalculation += this.topRightCheck(number, row);
		}else if(dir == 'left'){
			this.pathCalculation += this.leftCheck(number, row);
		}else if(dir == 'right'){
			this.pathCalculation += this.rightCheck(number, row);
		}else if(dir == 'botleft'){
			this.pathCalculation += this.botLeftCheck(number, row);
		}else if(dir == 'botright'){
			this.pathCalculation += this.botRightCheck(number, row);
		}		
		return this.pathCalculation;
	}else{
		if(!this.ai.isWeiZhu){
			this.ai.isWeiZhu = true;
			this.ai.changeAnimation();
		}
		return this.pathCalculation;
	}
	
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
	
	this.hiveUpdate(this.ai.whichTile_);
	
	if(!this.ai.isWeiZhu){
	
	this.pathCalculation = 0;
	this.catPathArray.push( new Path(0) );
	
	this.pathFinding(this.ai.whichTile_,this.aiWhichRow, 'topleft');
	
	//console.log(this.pathCalculation);
	
	// reset move back
	for(var i = 0; i < this.floorTile.length; i ++){
		if( this.floorTile[i].hasMoved ){
			 this.floorTile[i].hasMoved = false;
		}
		if( this.floorTile[i].hasMovedClosed ){
			this.floorTile[i].hasMovedClosed = false;
		}
	}
	
	//console.log("path");
	this.checkPath = 0;
	// find the correct path
	for( var i = 0 ; i < this.catPathArray.length ; i ++){
		for( var j = 0 ; j < this.catPathArray[i].value_.length ; j ++){
			this.checkPath += this.catPathArray[i].value_[j]; 
			//console.log(this.catPathArray[i].value_[j]);
			if(this.checkPath == this.pathCalculation && (j == this.catPathArray[i].value_.length-1) ){	
				this.moveDecision(this.catPathArray[i].value_[1]);
				//console.log("moved");
			}
		}
	}
	
	// reset path
	for( var i = 0 ; i < this.catPathArray.length ; i ++){
		for( var j = 0 ; j < this.catPathArray[i].value_.length ; j ++){
			this.catPathArray[i].value_.pop();
		}
		this.catPathArray.pop();
	}
	this.catPathAmount = 1;
	
	}else{
		if(this.floorTile[this.hiveCheck[1].value_].click && this.floorTile[this.hiveCheck[2].value_].click && 
		this.floorTile[this.hiveCheck[3].value_].click && this.floorTile[this.hiveCheck[4].value_].click &&
		this.floorTile[this.hiveCheck[5].value_].click && this.floorTile[this.hiveCheck[6].value_].click){
			console.log("Dead Cat");
		}else{
			if(!this.floorTile[this.hiveCheck[1].value_].click){
				this.moveTopLeft();
			}else if(!this.floorTile[this.hiveCheck[2].value_].click){
				this.moveTopRight();
			}else if(!this.floorTile[this.hiveCheck[3].value_].click){
				this.moveLeft();
			}else if(!this.floorTile[this.hiveCheck[4].value_].click){
				this.moveRight();
			}else if(!this.floorTile[this.hiveCheck[5].value_].click){
				this.moveBottomLeft();
			}else
				this.moveBottomRight();
			}
	}
	
	if(this.outOfBound(this.ai.whichTile_)){
		console.log("escape");
	}
};

Game.prototype.moveDecision = function(desination){
	if(this.hiveCheck[1].value_ == desination){
		this.moveTopLeft();
	}else if(this.hiveCheck[2].value_ == desination){
		this.moveTopRight();
	}else if(this.hiveCheck[3].value_ == desination){
		this.moveLeft();
	}else if(this.hiveCheck[4].value_ == desination){
		this.moveRight();
	}else if(this.hiveCheck[5].value_ == desination){
		this.moveBottomLeft();
	}else if(this.hiveCheck[6].value_ == desination){
		this.moveBottomRight();
	}
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