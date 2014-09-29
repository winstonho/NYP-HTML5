//TODO: Class name should be begin with Upper case letter
BOK.inherits(TileView, createjs.Container);

function TileView (x,y,image,type){
	
	createjs.Container.call(this);
	
	this.image_ = image;
	this.type_ = type; 
	
	this.addChild(this.image_);
	
	this.orginalX = x;
	this.orginalY = y;
	
	this.x = x;
	this.y = y;
	
	this.MoveY = 2;
	this.isMove =  false;
	this.tempY = 0.5;
	this.isDestory = false;
}

TileView.prototype.reset = function(){
	this.MoveY = 2;
	this.isMove =  false;
	this.tempY = 0.5;
	this.orginalY = y;
	this.orginalX = x;
	this.visible = false;
	this.isDestory = false;
};

TileView.prototype.move = function(){
	if(this.isMove){
	
		if(this.MoveY < 0){
			this.tempY *=-2
		}
		this.y -= this.tempY;
		this.MoveY -= this.tempY;
		
		if(this.MoveY > 2){
			this.MoveY = 2;
			this.isMove = false;
			this.tempY = 0.5;
			this.y = this.orginalY;
		}
	}
};

TileView.prototype.destory = function(){
	this.visible = false;
	this.isDestory = true;
};
