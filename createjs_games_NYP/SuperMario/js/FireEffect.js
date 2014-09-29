//this function does the inheritance
BOK.inherits(FireEffect, createjs.Container);


/**
 * @ constructor
 * */
function FireEffect(x, y, type) {
	 //this line is a must-have in prototype-chain style inheritance
    //Compare to JAVA this works as super();
	
    createjs.Container.call(this);
	
	this.fireBallEffectData = {
		// image to use
		framerate : 5,
		images    : [imgContainer["imgs/fireballeffect.png"]], 
		// width, height & registration point of each sprite
		frames    : {width: 16, height: 16, regX: 8, regY: 8 },
		animations: {  
			fireball: {
				frames: [0, 1, 2],
				speed : 0.5,
			},
			
			firework: {
				frames: [0, 1, 2],
				speed : 0.06,
			}
		}
	};
	this.fireBallEffectSpriteSheet = new createjs.SpriteSheet(this.fireBallEffectData);
	
	this.fireBallEffectAnimation = new createjs.Sprite(this.fireBallEffectSpriteSheet);
	
	this.currentAnimation = type;
	
	this.visible = false;
	
	this.addChild(this.fireBallEffectAnimation);
	
	this.x = x;
	this.y = y;
}

FireEffect.prototype.setVisibleTrue = function(){
	this.visible = true;
};

FireEffect.prototype.getVisible = function(){
	return this.visible;
};

FireEffect.prototype.setViewPos = function(x,y){
	this.x = x;
	this.y = y;
};

FireEffect.prototype.play = function(){
	this.fireBallEffectAnimation.gotoAndPlay(this.currentAnimation);
};

FireEffect.prototype.update = function(){
	if(this.fireBallEffectAnimation.currentFrame == 2){
		this.visible = false;
		this.fireBallEffectAnimation.gotoAndStop(this.currentAnimation);
	}	
};